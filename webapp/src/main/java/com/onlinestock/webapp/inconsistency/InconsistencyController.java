package com.onlinestock.webapp.inconsistency;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.inconsisency.dto.FindInconsistencyDTO;
import com.onlinestock.core.inconsisency.dto.SaveInconsistencyDTO;
import com.onlinestock.core.inconsisency.service.impl.InconsistencyServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/inconsistency")

public class InconsistencyController {

    @Autowired
    private InconsistencyServiceImpl inconsistencyService;

    @PostMapping
    public ApiResponse create(@RequestBody SaveInconsistencyDTO saveInconsistencyDTO){
        return inconsistencyService.create(saveInconsistencyDTO);
    }

    @GetMapping
    public Page<FindInconsistencyDTO> getInconsistencyPage(Pageable pageable) {
        log.info("Request find page of inconsistencies acts, pageNumber " + pageable.getPageNumber() + " , size " +
                pageable.getPageSize());
        return inconsistencyService.findPage(pageable);
    }
}