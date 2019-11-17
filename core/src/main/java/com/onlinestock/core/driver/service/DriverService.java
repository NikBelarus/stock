package com.onlinestock.core.driver.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.driver.dto.FindDriverDTO;
import com.onlinestock.core.driver.dto.SaveDriverDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface DriverService {
    FindDriverDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid SaveDriverDTO saveDriverDTO);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveDriverDTO saveDriverDTO) throws ChangeSetPersister.NotFoundException;

}
