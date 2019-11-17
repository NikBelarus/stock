package com.onlinestock.core.stock.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.stock.dto.FindStockDTO;
import com.onlinestock.core.stock.dto.SaveStockDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface StockService {
    FindStockDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid SaveStockDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveStockDTO saveDto) throws ChangeSetPersister.NotFoundException;
}
