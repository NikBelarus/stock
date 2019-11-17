package com.onlinestock.core.consignment.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.consignment.dto.FindConsignmentDTO;
import com.onlinestock.core.consignment.dto.SaveConsignmentDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface ConsignmentService {
    FindConsignmentDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse createInput(@Valid SaveConsignmentDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveConsignmentDTO saveDto) throws ChangeSetPersister.NotFoundException;
}