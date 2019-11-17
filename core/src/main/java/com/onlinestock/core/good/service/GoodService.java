package com.onlinestock.core.good.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface GoodService {
    FindGoodDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid SaveGoodDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveGoodDTO saveDto) throws ChangeSetPersister.NotFoundException;
}