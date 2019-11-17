package com.onlinestock.core.carriage.service;

import com.onlinestock.core.carriage.dto.FindCarrierDTO;
import com.onlinestock.core.carriage.dto.SaveCarrierDTO;
import com.onlinestock.core.common.ApiResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface CarrierService {
    FindCarrierDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid SaveCarrierDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveCarrierDTO saveDto) throws ChangeSetPersister.NotFoundException;
}
