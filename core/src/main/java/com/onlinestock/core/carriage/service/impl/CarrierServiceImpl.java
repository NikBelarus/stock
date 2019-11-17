package com.onlinestock.core.carriage.service.impl;

import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.carriage.QCarrier;
import com.onlinestock.core.carriage.dto.CarrierMapping;
import com.onlinestock.core.carriage.dto.FindCarrierDTO;
import com.onlinestock.core.carriage.dto.SaveCarrierDTO;
import com.onlinestock.core.carriage.repository.CarrierRepository;

import com.onlinestock.core.carriage.service.CarrierService;
import com.onlinestock.core.common.ApiResponse;
import com.querydsl.core.BooleanBuilder;


import com.onlinestock.core.user.authentication.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CarrierServiceImpl implements CarrierService {

    @Autowired
    CarrierMapping carrierMapping = new CarrierMapping();

    @Autowired
    private CarrierRepository carrierRepository;

    @Transactional(readOnly = true)
    public Page<FindCarrierDTO> find(String name, Pageable pageable) {
        Page<Carrier> carriers = carrierRepository.findAll(buildWhereNameContainsAndDeletedFalse(name, ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getCompanyId()), pageable);
        log.info("Carriers page found, number of elements: " + carriers.getNumberOfElements());
        return carriers.map(carrier -> carrierMapping.getMapper().map(carrier, FindCarrierDTO.class));
    }

    @Transactional(readOnly = true)
    public List<FindCarrierDTO> findAll() {
        List<Carrier> carriers = carrierRepository.findAllByDeletedFalse();
        log.info("All carriers found, number of elements: " + carriers.size());
        return carriers.stream()
                .map(carrier -> carrierMapping.getMapper().map(carrier, FindCarrierDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public FindCarrierDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        Carrier carrier = findById(id);
        log.info("Found carrier with id " + id);
        return carrierMapping.getMapper().map(carrier, FindCarrierDTO.class);
    }

    @Override
    @Transactional
    public ApiResponse create(SaveCarrierDTO saveCarrierDTO) {
        Carrier carrier = carrierMapping.getMapper().map(saveCarrierDTO, Carrier.class);
        carrierRepository.save(carrier);
        log.info("Carrier with name " + carrier.getName() + " was created");
        return new ApiResponse(true, "The carrier is created.", carrierMapping.getMapper().map(carrier, FindCarrierDTO.class));
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveCarrierDTO saveCarrierDTO) throws ChangeSetPersister.NotFoundException {
        Carrier carrier = findById(id);
        carrierMapping.getMapper().map(saveCarrierDTO, carrier);
        log.info("Carrier with id " + id + " was updated");
        return new ApiResponse(true, "The carrier is updated.", carrierMapping.getMapper().map(carrier, FindCarrierDTO.class));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Carrier> carrier = carrierRepository.getByIdAndDeletedFalse(id);
        carrier.ifPresent(carrier1 -> carrier1.setDeleted(true));
        log.info("Carrier with id " + id + " was deleted");
    }

    @Transactional(readOnly = true)
    public Page<FindCarrierDTO> findByCompanyID(Long companyId, Pageable pageable) {
        Page<Carrier> carriers = carrierRepository.findAll(buildWhereCompanyId(companyId), pageable);
        log.info("Find company "+ companyId + "carriers" );
        return carriers.map(carrier -> carrierMapping.getMapper().map(carrier, FindCarrierDTO.class));
    }

    private Carrier findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Carrier> carrier = carrierRepository.getByIdAndDeletedFalse(id);
        if(carrier.isPresent()){
            return carrier.get();
        }
        log.error("Cannot find carrier with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private BooleanBuilder buildWhereNameContainsAndDeletedFalse(String name, Long id) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QCarrier.carrier.company.id.eq(id)).and(QCarrier.carrier.deleted.isFalse());
        if(name != null) {
            booleanBuilder.and(QCarrier.carrier.name.contains(name));
        }
        return booleanBuilder;
    }

    @Transactional
    protected void create(Carrier carrier){
        carrierRepository.save(carrier);
    }

    @Transactional
    protected void update(SaveCarrierDTO saveCarrierDTO, Carrier carrier){
        carrierMapping.getMapper().map(saveCarrierDTO, carrier);
    }

    @Transactional
    protected void delete(Carrier carrier){
        carrier.setDeleted(true);
    }

    private BooleanBuilder buildWhereCompanyId(Long companyId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QCarrier.carrier.deleted.isFalse())
                .and(QCarrier.carrier.company.id.eq(companyId));
        return booleanBuilder;
    }
}
