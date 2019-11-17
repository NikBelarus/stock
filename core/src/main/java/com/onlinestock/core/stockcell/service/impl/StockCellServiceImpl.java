package com.onlinestock.core.stockcell.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.good.repository.GoodRepository;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stockcell.QStockCell;
import com.onlinestock.core.stockcell.StockCell;
import com.onlinestock.core.stockcell.dto.FindStockCellDTO;
import com.onlinestock.core.stockcell.dto.SaveStockCellDTO;
import com.onlinestock.core.stockcell.dto.StockCellMapping;
import com.onlinestock.core.stockcell.repository.StockCellRepository;
import com.onlinestock.core.stockcell.service.StockCellService;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.querydsl.core.BooleanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class StockCellServiceImpl implements StockCellService {

    @Autowired
    private StockCellMapping stockCellMapping;

    @Autowired
    private StockCellRepository stockCellRepository;

    @Autowired
    private GoodRepository goodRepository;

    @Transactional(readOnly = true)
    public Page<FindStockCellDTO> findByStockId(Long id, Pageable pageable){
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long companyId = userPrincipal.getCompanyId();
        Page<StockCell> cells = stockCellRepository.findAll(buildWhere(id), pageable);
        log.info("Found stocks cells page by stock id " + id + " with number of elements " + cells.getNumberOfElements());
        return cells.map(cell -> {
            FindStockCellDTO dtoCell = stockCellMapping.getMapper().map(cell, FindStockCellDTO.class);
            dtoCell.setFreeVolume(countCellFreeSpace(cell));
            return dtoCell;
        });
    }

    @Transactional(readOnly = true)
    public List<StockCell> getByStockId(Long id){ return stockCellRepository.getAllByStockIdAndDeletedFalse(id); }

    @Override
    @Transactional(readOnly = true)
    public FindStockCellDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        log.info("Found stock cell by id " + id);
        return stockCellMapping.getMapper().map(findById(id), FindStockCellDTO.class);
    }

    @Override
    @PreAuthorize("hasAuthority('STOCK_ADMIN')")
    @Transactional
    public ApiResponse create(ArrayList<SaveStockCellDTO> saveStockCellDto) {
        for(SaveStockCellDTO oneStorageCell : saveStockCellDto) {
            for (int i = 0; i < oneStorageCell.getCellsCount(); i++) {
                StockCell cell = stockCellMapping.getMapper().map(oneStorageCell, StockCell.class);
                Long stockId = cell.getStock().getId();
                String name = stockId.toString()
                        + cell.getStorageCondition().getAbbreviation()
                        + stockCellRepository.countByStockIdAndDeletedFalse(stockId);
                cell.setName(name);
                stockCellRepository.save(cell);
            }
        }
        log.info("Stock cells with id were created");
        return new ApiResponse(true, "The stock cell is created.", new FindStockCellDTO());
    }

    @Override
    @PreAuthorize("hasAuthority('STOCK_ADMIN')")
    @Transactional
    public void delete(Long id) {
        Optional<StockCell> stockCell = stockCellRepository.getByIdAndDeletedFalse(id);
        stockCell.ifPresent(stockCell1 -> stockCell1.setDeleted(true));
        log.info("Stock cell with id " + id + " was deleted");
    }

    @PreAuthorize("hasAuthority('STOCK_ADMIN')")
    @Transactional
    public void deleteByStockId(Long stockId){
        List<StockCell> stockCells = stockCellRepository.getByStockIdAndDeletedFalse(stockId);
        for (StockCell stockCell : stockCells) {
            stockCell.setDeleted(true);
        }
        log.info(stockCells.size() + " stock cells were deleted");
    }

    @Override
    @PreAuthorize("hasAuthority('STOCK_ADMIN')")
    @Transactional
    public ApiResponse update(Long id, SaveStockCellDTO saveStockCellDto) throws ChangeSetPersister.NotFoundException {
        StockCell oldCell = findById(id);
        stockCellMapping.getMapper().map(saveStockCellDto, oldCell);
        log.info("Stock cell with id " + id + " was updated");
        return new ApiResponse(true, "The stock cell is updated.", stockCellMapping.getMapper().map(oldCell, FindStockCellDTO.class));
    }

    private StockCell findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<StockCell> stockCell =  stockCellRepository.getByIdAndDeletedFalse(id);
        if (stockCell.isPresent()){
            return stockCell.get();
        }
        log.error("Cannot find stock cell with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private BooleanBuilder buildWhere(Long id){
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QStockCell.stockCell.stock.id.eq(id)).and(QStockCell.stockCell.deleted.isFalse());
        return booleanBuilder;
    }

    private BigDecimal countCellFreeSpace(StockCell cell){
        List<Good> cellGoods= goodRepository.findByStockCellIdAndDeletedFalse(cell.getId());
        BigDecimal cellVolume = cell.getVolume();
        BigDecimal occupiedPlace = new BigDecimal(0);
        for (Good good: cellGoods) {
            occupiedPlace = occupiedPlace.add(good.getVolume());
        }
        return cellVolume.subtract(occupiedPlace);
    }
}
