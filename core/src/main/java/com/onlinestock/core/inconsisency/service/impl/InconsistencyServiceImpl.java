package com.onlinestock.core.inconsisency.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import com.onlinestock.core.good.service.impl.GoodServiceImpl;
import com.onlinestock.core.inconsisency.InconsistencyAct;
import com.onlinestock.core.inconsisency.dto.FindInconsistencyDTO;
import com.onlinestock.core.inconsisency.dto.InconsistencyMapping;
import com.onlinestock.core.inconsisency.dto.SaveInconsistencyDTO;
import com.onlinestock.core.inconsisency.repository.InconsistencyActRepository;
import com.onlinestock.core.inconsisency.service.InconsistencyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class InconsistencyServiceImpl implements InconsistencyService {

    @Autowired
    private InconsistencyActRepository inconsistencyActRepository;

    @Autowired
    private GoodServiceImpl goodService;

    @Autowired
    private InconsistencyMapping inconsistencyMapping;

    @Transactional(readOnly = true)

    public Page<FindInconsistencyDTO> findPage(Pageable pageable) {
        Page<InconsistencyAct> acts = inconsistencyActRepository.findByDeletedFalseOrderByDateDesc(pageable);
        log.info("Inconsistencies acts page found, number of elements: " + acts.getNumberOfElements());
        return acts.map(act -> inconsistencyMapping.getMapper().map(act, FindInconsistencyDTO.class));
    }

    public FindInconsistencyDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        InconsistencyAct act = findById(id);
        log.info("Found inconsistency act with id " + id);
        return inconsistencyMapping.getMapper().map(act, FindInconsistencyDTO.class);
    }

    @Transactional
    public ApiResponse create(SaveInconsistencyDTO saveInconsistencyDTO) {
        InconsistencyAct act = inconsistencyMapping.getMapper().map(saveInconsistencyDTO, InconsistencyAct.class);
        inconsistencyActRepository.save(act);
        List<SaveGoodDTO> goods = saveInconsistencyDTO.getGoods();
        goods.forEach(good -> good.setInconsistencyActId(act.getId()));
        goodService.createAll(saveInconsistencyDTO.getGoods());
        goodService.updateAllCounts(goods);
        log.info("Inconsistency act " + act.getId() + " was created");

        return new ApiResponse(true, "The inconsistency act is created. ",
                inconsistencyMapping.getMapper().map(act, FindInconsistencyDTO.class));
    }

    private InconsistencyAct findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<InconsistencyAct> act = inconsistencyActRepository.findByIdAndDeletedFalse(id);
        if (act.isPresent()) {
            return act.get();
        }
        log.warn("Cannot find inconsistency act " + id);
        throw new ChangeSetPersister.NotFoundException();
    }
}