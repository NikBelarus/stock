package com.onlinestock.webapp.stock;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.stock.dto.FindStockDTO;
import com.onlinestock.core.stock.dto.SaveStockDTO;
import com.onlinestock.core.stock.dto.StockInfoDTO;
import com.onlinestock.core.stock.dto.TableStockDTO;
import com.onlinestock.core.stock.service.impl.StockServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
@RequestMapping("api/stocks")
public class StockController {

    @Autowired
    private StockServiceImpl stockServiceImpl;

//    @GetMapping
//    public Page<FindStockDTO> findByCompanyId(Pageable pageable) {
//        return stockServiceImpl.findByCompanyId(pageable);
//    }

    @GetMapping("{id}")
    public FindStockDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find stock with id " + id);
        return stockServiceImpl.findOne(id);
    }

    @GetMapping("table")
    public Page<TableStockDTO> getStockTable(){
        return new PageImpl<TableStockDTO>(stockServiceImpl.getCompanyStockTable());
    }
  
    @GetMapping("{id}/stat")
    public StockInfoDTO getStockStat(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return stockServiceImpl.findStockInfo(id);
    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveStockDTO saveStockDTO) throws ChangeSetPersister.NotFoundException {
        log.info("Request update stock with id " + id);
        return stockServiceImpl.update(id, saveStockDTO);
    }

    @PostMapping
    public ApiResponse create(@RequestBody SaveStockDTO stockDTO){
        log.info("Request create stock with company id " + stockDTO.getCompanyId());
        return stockServiceImpl.create(stockDTO);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request delete stock with id " + id);
        stockServiceImpl.delete(id);
    }
}
