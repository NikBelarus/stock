package com.onlinestock.webapp.stockcell;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.stockcell.StockCell;
import com.onlinestock.core.stockcell.dto.FindStockCellDTO;
import com.onlinestock.core.stockcell.dto.SaveStockCellDTO;
import com.onlinestock.core.stockcell.service.impl.StockCellServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/cells")
public class StockCellController {

    @Autowired
    private StockCellServiceImpl stockCellServiceImpl;

    @GetMapping
    public Page<FindStockCellDTO> findByStockId(@RequestParam long stock_id, @PageableDefault(size = Integer.MAX_VALUE) Pageable pageable){
        log.info("Request find page of stock cells with stock id " + stock_id + ", pageNumber " + pageable.getPageNumber() +
                ", size " + pageable.getPageSize());
        return stockCellServiceImpl.findByStockId(stock_id, pageable);
    }

    @GetMapping("{id}")
    public FindStockCellDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find stock cell with id " + id);
        return stockCellServiceImpl.findOne(id);
    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveStockCellDTO saveStockCellDTO) throws ChangeSetPersister.NotFoundException {
        log.info("Request update stock cell with id " + id);
        return stockCellServiceImpl.update(id, saveStockCellDTO);
    }

    @PostMapping
    public ApiResponse create(@RequestBody ArrayList<SaveStockCellDTO> stockCellDto){
        return stockCellServiceImpl.create(stockCellDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id){
        log.info("Request delete stock cell with id " + id);
        stockCellServiceImpl.delete(id);
    }

}
