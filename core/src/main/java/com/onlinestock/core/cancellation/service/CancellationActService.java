package com.onlinestock.core.cancellation.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.cancellation.dto.FindCancellationActDTO;
import com.onlinestock.core.cancellation.dto.SaveCancellationActDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface CancellationActService {
    FindCancellationActDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid SaveCancellationActDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveCancellationActDTO saveDto) throws ChangeSetPersister.NotFoundException;
}
