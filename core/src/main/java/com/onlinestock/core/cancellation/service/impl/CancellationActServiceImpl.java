package com.onlinestock.core.cancellation.service.impl;

import com.onlinestock.core.cancellation.CancellationAct;
import com.onlinestock.core.cancellation.QCancellationAct;
import com.onlinestock.core.cancellation.dto.CancellationActMapping;
import com.onlinestock.core.cancellation.dto.FindCancellationActDTO;
import com.onlinestock.core.cancellation.dto.SaveCancellationActDTO;
import com.onlinestock.core.cancellation.repository.CancellationActRepository;
import com.onlinestock.core.cancellation.service.CancellationActService;
import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import com.onlinestock.core.good.service.impl.GoodServiceImpl;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.user.authentication.UserPrincipal;
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

@Slf4j
@Service
public class CancellationActServiceImpl implements CancellationActService {

    @Autowired
    private CancellationActRepository cancellationActRepository;

    @Autowired
    private GoodServiceImpl goodService;

    @Autowired
    private CancellationActMapping mapping;

    @Autowired
    private StockRepository stockRepository;


    @Transactional(readOnly = true)
    public Page<FindCancellationActDTO> findByStockId(Long stockId, Pageable pageable) {
        Optional<Stock> optionalStock = stockRepository.findById(stockId);
        if (!optionalStock.isPresent()) {
            log.warn("Requested nonexistent stock");
            return null;
        }
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long companyId = userPrincipal.getCompanyId();
        if (optionalStock.get().getCompany().getId().equals(companyId)) {
            log.error("Cannot get that stock info : user with id " + userPrincipal.getId() + " cannot get that stock info");
            throw new AccessDeniedException("Yuo cannot get that stock info");
        }
        Page<CancellationAct> acts = cancellationActRepository.findAll(buildWhere(stockId), pageable);
        log.info("Found cancellation acts page by stock id " + stockId + " with number of elements " + acts
                .getNumberOfElements());
        return acts.map(act -> mapping.getMapper().map(act, FindCancellationActDTO.class));
    }

    @Transactional(readOnly = true)
    public Page<FindCancellationActDTO> findPage(Pageable pageable) {
        Page<CancellationAct> acts = cancellationActRepository.findByDeletedFalseOrderByDateDesc(pageable);
        log.info("Found cancellation acts page with number of elements " + acts.getNumberOfElements());
        return acts.map(act -> mapping.getMapper().map(act, FindCancellationActDTO.class));
    }

    @Override
    @Transactional(readOnly = true)
    public FindCancellationActDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        log.info("Found cancellation act by with id " + id);
        CancellationAct act = findById(id);
        return mapping.getMapper().map(act, FindCancellationActDTO.class);
    }

    @Override
    @Transactional
    public ApiResponse create(SaveCancellationActDTO saveAct) {
        CancellationAct act = mapping.getMapper().map(saveAct, CancellationAct.class);
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userPrincipal.getId().equals(saveAct.getControllerId())) {
            log.error("Cannot create that act ");
            throw new AccessDeniedException("Yuo cannot create that act");
        }
        List<SaveGoodDTO> goods = saveAct.getGoods();
        cancellationActRepository.save(act);
        goods.forEach(good -> good.setCancellationActId(act.getId()));
        goodService.createAll(goods);
        goodService.updateAllCounts(goods);

        log.info("Cancellation act with id " + act.getId() + " was created");
        return new ApiResponse(true, "The cancellation act is created.", mapping.getMapper().map(act, FindCancellationActDTO.class));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        cancellationActRepository.deleteById(id);
        log.info("Cancellation act with id" + id + " was deleted");
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveCancellationActDTO saveAct) throws ChangeSetPersister.NotFoundException {
        CancellationAct act = findById(id);
        mapping.getMapper().map(saveAct, act);
        cancellationActRepository.save(act);
        log.info("Cancellation act with id " + act.getId() + " was updated");
        return new ApiResponse(true, "The cancellation act is updated.", mapping.getMapper()
                .map(act, FindCancellationActDTO.class));
    }

    private CancellationAct findById(Long id) {
        return cancellationActRepository.getOne(id);
    }

    private BooleanBuilder buildWhere(Long id) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QCancellationAct.cancellationAct.id.eq(id)).and(QCancellationAct.cancellationAct.deleted.isFalse());
        return booleanBuilder;
    }
}