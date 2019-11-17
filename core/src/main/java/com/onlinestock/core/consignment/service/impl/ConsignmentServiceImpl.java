package com.onlinestock.core.consignment.service.impl;

import com.onlinestock.core.carriage.service.impl.CarrierServiceImpl;
import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.consignment.ConsignmentStatus;
import com.onlinestock.core.consignment.ConsignmentType;
import com.onlinestock.core.consignment.QConsignmentNote;
import com.onlinestock.core.consignment.dto.*;
import com.onlinestock.core.consignment.repository.ConsignmentNoteRepository;
import com.onlinestock.core.consignment.service.ConsignmentService;
import com.onlinestock.core.driver.repository.DriverRepository;
import com.onlinestock.core.driver.service.impl.DriverServiceImpl;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.good.GoodsStatus;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import com.onlinestock.core.good.service.impl.GoodServiceImpl;
import com.onlinestock.core.user.Role;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.onlinestock.core.user.service.impl.UserServiceImpl;
import com.querydsl.core.BooleanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ConsignmentServiceImpl implements ConsignmentService {

    @Autowired
    private ConsignmentMapping consignmentMapping;

    @Autowired
    private GoodServiceImpl goodService;

    @Autowired
    private CarrierServiceImpl carrierService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private DriverServiceImpl driverService;

    @Autowired
    private ConsignmentNoteRepository consignmentNoteRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Transactional(readOnly = true)
    public Page<FindConsignmentDTO> find(Pageable pageable, String type) {
        Page<ConsignmentNote> consignmentNotes = consignmentNoteRepository.findAll(buildWhere(type), pageable);
        log.info("Consignment notes page found, number of elements: " + consignmentNotes.getNumberOfElements());
        return consignmentNotes.map(consignmentNote -> consignmentMapping.getMapper().map(consignmentNote, FindConsignmentDTO.class));
    }

    @Transactional(readOnly = true)
    @Override
    public FindConsignmentDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        ConsignmentNote note = findById(id);
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!note.getCompany().getId().equals(userPrincipal.getCompanyId())) {
            throw new AccessDeniedException("access denied");
        }
        Role role = userPrincipal.getRole();
        ConsignmentStatus status = note.getStatus();
        ConsignmentType type = note.getType();
        switch (role) {
            case CONTROLLER:
                if (!status.equals(ConsignmentStatus.REGISTERED))
                    throw new AccessDeniedException("Yuo cannot get that stock info");
                break;
            case STOCK_MANAGER:
                if (!(status.equals(ConsignmentStatus.VERIFICATION_COMPLETED)
                        && type.equals(ConsignmentType.INPUT)))
                    throw new AccessDeniedException("Yuo cannot get that stock info");
                break;
            case STOCK_DISPATCHER:
                if (!(status.equals(ConsignmentStatus.VERIFICATION_COMPLETED)
                        && type.equals(ConsignmentType.OUTPUT)))
                    throw new AccessDeniedException("Yuo cannot get that stock info");
                break;
            default:
                break;
        }
        log.info("Found consignment note with id " + id);
        FindConsignmentDTO dto = consignmentMapping.getMapper().map(note, FindConsignmentDTO.class);
        dto.setCarrier(carrierService.findOne(note.getCarrier().getId()));
        if (note.getManager() != null) {
            dto.setManager(userService.findOne(note.getManager().getId()));
        }
        if (note.getDispatcher() != null) {
            dto.setDispatcher(userService.findOne(note.getDispatcher().getId()));
        }
        if (note.getController() != null) {
            dto.setController(userService.findOne(note.getController().getId()));
        }
        if (note.getDriver() != null) {
            dto.setDriver(driverService.findOne(note.getDriver().getId()));
        }
        List<Good> goodsList = note.getType().equals(ConsignmentType.INPUT) ? note.getInputGoods() : note.getOutputGoods();
        List<FindGoodDTO> goods = goodsList.stream()
                .map(good -> {
                    try {
                        FindGoodDTO foundGood = goodService.findOne(good.getId());
                        if (foundGood.getState().equals(GoodsStatus.LOST_IN_STOCK)
                                || foundGood.getState().equals(GoodsStatus.LOST_BY_CARRIER)
                                || foundGood.getState().equals(GoodsStatus.FORFEIT)) {
                            return null;
                        }
                        return foundGood;
                    } catch (ChangeSetPersister.NotFoundException e) {
                        log.error("can't find  good " + e);
                        return null;
                    }
                })
                .filter(good -> good != null)
                .collect(Collectors.toList());
        dto.setGoods(goods);
        return dto;
    }

    @Override
    @Transactional
    public ApiResponse createInput(SaveConsignmentDTO saveConsignmentDTO) {
        ConsignmentNote consignmentNote = consignmentMapping.getMapper().map(saveConsignmentDTO, ConsignmentNote.class);
        consignmentNoteRepository.save(consignmentNote);
        log.info("Consignment note with id " + consignmentNote.getId() + " was created");

        List<SaveGoodDTO> goods = saveConsignmentDTO.getGoods();
        goods.forEach(good -> good.setInputConsignmentId(consignmentNote.getId()));
        goodService.createAll(goods);
        return new ApiResponse(true, "The consignment is created.",
                consignmentMapping.getMapper().map(consignmentNote, FindConsignmentDTO.class));
    }

    public ApiResponse createOutput(SaveConsignmentDTO consignmentDTO) {
        ConsignmentNote consignmentNote = consignmentMapping.getMapper().map(consignmentDTO, ConsignmentNote.class);
        consignmentNoteRepository.save(consignmentNote);
        List<SaveGoodDTO> goods = consignmentDTO.getGoods();
        goods.forEach(good -> good.setOutputConsignmentId(consignmentNote.getId()));
        goodService.registerOutput(goods, consignmentNote);
        return new ApiResponse(true, "output consignment was created",
                consignmentMapping.getMapper().map(consignmentNote, FindConsignmentDTO.class));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<ConsignmentNote> consignmentNote = consignmentNoteRepository.getByIdAndDeletedFalse(id);
        consignmentNote.ifPresent(consignmentNote1 -> consignmentNote1.setDeleted(true));
        log.info("Consignment with id " + id + " was deleted");
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveConsignmentDTO saveConsignmentDTO) throws ChangeSetPersister.NotFoundException {
        ConsignmentNote oldConsignmentNote = findById(id);
        consignmentMapping.getMapper().map(saveConsignmentDTO, oldConsignmentNote);
        log.info("Consignment note with id " + id + " was updated");
        return new ApiResponse(true, "The consignment is updated.",
                consignmentMapping.getMapper().map(oldConsignmentNote, FindConsignmentDTO.class));
    }

    @Transactional
    public FindConsignmentDTO verifyConsignment(VerificationConsignmentDTO verificationDTO) throws ChangeSetPersister.NotFoundException {
        ConsignmentNote note = findById(verificationDTO.getId());
        note.setStatus(ConsignmentStatus.VERIFICATION_COMPLETED);
        note.setVerificationDate(verificationDTO.getVerificationDate());
        consignmentNoteRepository.save(note);
        log.info("tth " + note.getId() + " verified");
        List<FindGoodDTO> goods = verificationDTO.getGoods();
        goodService.verifyGoods(goods, note);
        return consignmentMapping.getMapper().map(note, FindConsignmentDTO.class);
    }

    @Transactional
    public FindConsignmentDTO completeRegistration(UpdateConsignmentDTO registrationDTO) throws ChangeSetPersister.NotFoundException {
        ConsignmentNote note = findById(registrationDTO.getId());
        note.setStatus(ConsignmentStatus.REGISTRATION_COMPLETED);
        note.setRegistrationCompletedDate(registrationDTO.getRegistrationCompletedDate());
        if (note.getType().equals(ConsignmentType.OUTPUT)) {
            note.setDriver(driverRepository.findById(registrationDTO.getDriverId()).orElse(null));
            note.setVehicleType(registrationDTO.getVehicleType());
            note.setVehicleNo(registrationDTO.getVehicleNo());
        }
        consignmentNoteRepository.save(note);
        log.info("tth " + note.getId() + " complete registration");
        List<FindGoodDTO> goods = registrationDTO.getGoods();
        goodService.registerGoods(goods, note);
        return consignmentMapping.getMapper().map(note, FindConsignmentDTO.class);
    }

    @Transactional(readOnly = true)
    public Page<ShortConsignmentDTO> findStockNotesByTypeAndStatus
            (String type, String status, Pageable pageable) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long stockId = userPrincipal.getStockId();
        ConsignmentType consignmentType = ConsignmentType.valueOf(type);
        ConsignmentStatus consignmentStatus = ConsignmentStatus.valueOf(status);
        Page<ConsignmentNote> notes = consignmentNoteRepository
                .findAll(buildWhereTypeStatusAndStock(consignmentType, consignmentStatus, stockId), pageable);
        return notes.map(note -> consignmentMapping.getMapper().map(note, ShortConsignmentDTO.class));
    }


    private ConsignmentNote findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<ConsignmentNote> consignmentNote = consignmentNoteRepository.findById(id);
        if (consignmentNote.isPresent()) {
            return consignmentNoteRepository.getOne(id);
        }
        log.warn("Cannot find consignment note with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private BooleanBuilder buildWhereTypeStatusAndStock(ConsignmentType type, ConsignmentStatus status, Long stockId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QConsignmentNote.consignmentNote.type.eq(type))
                .and(QConsignmentNote.consignmentNote.status.eq(status))
                .and(QConsignmentNote.consignmentNote.stock.id.eq(stockId))
                .and(QConsignmentNote.consignmentNote.deleted.isFalse());
        return booleanBuilder;
    }

    private BooleanBuilder buildWhere(String type) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QConsignmentNote.consignmentNote.deleted.isFalse());
        if (type != null) {
            booleanBuilder.and(QConsignmentNote.consignmentNote.type.eq(ConsignmentType.valueOf(type)));
        }
        return booleanBuilder;
    }
}
