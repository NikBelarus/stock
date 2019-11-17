package com.onlinestock.webapp.cancellation;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.cancellation.dto.FindCancellationActDTO;
import com.onlinestock.core.cancellation.dto.SaveCancellationActDTO;
import com.onlinestock.core.cancellation.service.impl.CancellationActServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/cancellation")
public class CancellationActController {

    @Autowired
    private CancellationActServiceImpl cancellationActServiceImpl;

    @GetMapping
    public Page<FindCancellationActDTO> getCancellationActsPage(Pageable pageable) {
        log.info("Request find page of cancellation acts, pageNumber " + pageable.getPageNumber() + " , size " +
                pageable.getPageSize());
        return cancellationActServiceImpl.findPage(pageable);
    }

    @GetMapping("stocks/{stock_id}")
    public Page<FindCancellationActDTO> getCancellationActs(@PathVariable long stock_id, Pageable pageable) {
        log.info("Request find page of cancellation acts with stock id " + stock_id + ", pageNumber " + pageable
                .getPageNumber() + ", size " + pageable.getPageSize());
        return cancellationActServiceImpl.findByStockId(stock_id, pageable);
    }

    @GetMapping("{id}")
    public FindCancellationActDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find cancellation act with id " + id);
        return cancellationActServiceImpl.findOne(id);
    }

    @PostMapping
    public ApiResponse create(@RequestBody SaveCancellationActDTO actDTO) {
        log.info("Request create cancellation act with stock worker id " + actDTO.getControllerId());
        return cancellationActServiceImpl.create(actDTO);
    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveCancellationActDTO actDTO)
            throws ChangeSetPersister.NotFoundException {
        log.info("Request update cancellation act with id " + id);
        return cancellationActServiceImpl.update(id, actDTO);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        log.info("Request delete cancellation act with id " + id);
        cancellationActServiceImpl.delete(id);
    }
}
