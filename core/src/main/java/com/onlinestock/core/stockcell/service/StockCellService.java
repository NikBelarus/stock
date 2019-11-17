package com.onlinestock.core.stockcell.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.stockcell.dto.FindStockCellDTO;
import com.onlinestock.core.stockcell.dto.SaveStockCellDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Validated
public interface StockCellService {
    FindStockCellDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid ArrayList<SaveStockCellDTO> saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveStockCellDTO saveDto) throws ChangeSetPersister.NotFoundException;
}
