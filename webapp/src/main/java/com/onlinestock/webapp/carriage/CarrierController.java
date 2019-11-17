package com.onlinestock.webapp.carriage;

import com.onlinestock.core.carriage.dto.FindCarrierDTO;
import com.onlinestock.core.carriage.dto.SaveCarrierDTO;
import com.onlinestock.core.carriage.service.impl.CarrierServiceImpl;
import com.onlinestock.core.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import com.onlinestock.core.user.authentication.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/carriers")

public class CarrierController {

    @Autowired
    private CarrierServiceImpl carrierServiceImpl;

    @GetMapping("/{id}")
    public FindCarrierDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find carrier with id " + id);
        return carrierServiceImpl.findOne(id);
    }

    @GetMapping
    public Page<FindCarrierDTO> find(@RequestParam(value = "name", required = false) String name, Pageable pageable) {
        log.info("Request find page of carriers with name " + name + ", pageNumber " + pageable.getPageNumber() + ", size " + pageable.getPageSize());
        return carrierServiceImpl.find(name, pageable);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        log.info("Request delete carrier with id " + id);
        carrierServiceImpl.delete(id);
    }

    @PutMapping("/{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveCarrierDTO saveCarrierDTO) throws ChangeSetPersister.NotFoundException {
        log.info("Request update carrier with id " + id);
        return carrierServiceImpl.update(id, saveCarrierDTO);
    }

    @PostMapping
    public ApiResponse create(@RequestBody SaveCarrierDTO saveCarrierDTO) {
        log.info("Request create carrier with name " + saveCarrierDTO.getName());
        return carrierServiceImpl.create(saveCarrierDTO);
    }
}
