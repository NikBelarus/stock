package com.onlinestock.core.stock.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.stock.QStock;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.dto.FindStockDTO;
import com.onlinestock.core.stock.dto.SaveStockDTO;
import com.onlinestock.core.stock.dto.StockInfoDTO;
import com.onlinestock.core.stock.dto.StockMapping;
import com.onlinestock.core.stock.dto.TableStockDTO;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.stock.service.StockService;
import com.onlinestock.core.stockcell.QStockCell;
import com.onlinestock.core.stockcell.StockCell;
import com.onlinestock.core.stockcell.dto.FindStockCellDTO;
import com.onlinestock.core.stockcell.repository.StockCellRepository;
import com.onlinestock.core.stockcell.service.impl.StockCellServiceImpl;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.dto.StockWorkerDTO;
import com.onlinestock.core.user.repository.UserRepository;
import com.querydsl.core.BooleanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockMapping stockMapping;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockCellRepository stockCellRepository;

    @Autowired
    private StockCellServiceImpl stockCellService;

    @Transactional(readOnly = true)
    public Page<FindStockDTO> findByCompanyId(Long id, Pageable pageable) {
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!user.getCompanyId().equals(id)) {
            throw new AccessDeniedException("You cannot get this stock info");
        }
        Page<Stock> stocks = stockRepository.findAll(buildWhereCompanyId(id), pageable);
        log.info("Found stocks page by company id " + id + " with number of elements " + stocks.getNumberOfElements());
        return stocks.map(stock -> stockMapping.getMapper().map(stock, FindStockDTO.class));
    }

    @Transactional(readOnly = true)
    public List<Stock> getByCompanyId(Long id){
        return stockRepository.getByCompanyIdAndDeletedFalse(id);
    }

    @Transactional(readOnly = true)
    public Page<FindStockDTO> findPage(Pageable pageable) {
        Page<Stock> stocks = stockRepository.getAllByDeletedFalse(pageable);
        log.info("Found stocks page with number of elements " + stocks.getNumberOfElements());
        return stocks.map(stock -> stockMapping.getMapper().map(stock, FindStockDTO.class));
    }

    @Transactional(readOnly = true)
    @Override
    public FindStockDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        log.info("Found stock with id " + id);
        Stock stock = findById(id);
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!user.getCompanyId().equals(stock.getCompany().getId())) {
            throw new AccessDeniedException("You cannot get this stock info");
        }
        return stockMapping.getMapper().map(stock, FindStockDTO.class);
    }

    @Transactional(readOnly = true)
    public StockInfoDTO findStockInfo(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Stock> optionalStock = stockRepository.getByIdAndDeletedFalse(id);
        if(optionalStock.isPresent()){
            ModelMapper mapper = stockMapping.getMapper();
            Stock  stock = optionalStock.get();
            List<StockCell> cells = stockCellRepository.getAllByStockIdAndDeletedFalse(stock.getId());
            List<User> workers = userRepository.findAllByStockId(stock.getId());

            StockInfoDTO stockInfoDTO = new StockInfoDTO();
            mapper.map(stock, stockInfoDTO);

            stockInfoDTO.setCells(cells.stream()
                    .map(cell -> mapper.map(cell, FindStockCellDTO.class))
                    .collect(Collectors.toList()));
            stockInfoDTO.setWorkers(workers.stream()
            .map(worker -> mapper.map(worker, StockWorkerDTO.class))
            .collect(Collectors.toList()));
            return stockInfoDTO;
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Override
    @Transactional
    public ApiResponse create(SaveStockDTO saveStockDTO) {
        Stock stock = stockMapping.getMapper().map(saveStockDTO, Stock.class);
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!user.getCompanyId().equals(stock.getCompany().getId())) {
            throw new AccessDeniedException("You cannot create this stock");
        }
        stockRepository.save(stock);
        log.info("Stock with id " + stock.getId() + " was created");
        return new ApiResponse(true, "The stock is created.", stockMapping.getMapper().map(stock, FindStockDTO.class));
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveStockDTO saveStockDTO) throws ChangeSetPersister.NotFoundException {
        Optional<Stock> stock = stockRepository.getByIdAndDeletedFalse(id);
        if(stock.isPresent()){
            Stock oldStock = stock.get();
            UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!user.getCompanyId().equals(oldStock.getCompany().getId())) {
                throw new AccessDeniedException("You cannot update this stock");
            }
            stockMapping.getMapper().map(saveStockDTO, oldStock);
            log.info("Stock with id " + id + " was updated");
            return new ApiResponse(true, "The stock is updated.", stockMapping.getMapper().map(oldStock, FindStockDTO.class));
        } else{
            return new ApiResponse(false, "Can't update stock", null);
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Stock> stock = stockRepository.getByIdAndDeletedFalse(id);
        stock.ifPresent(stock1 -> {
            UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!user.getCompanyId().equals(stock.get().getCompany().getId())) {
                throw new AccessDeniedException("You cannot get info about this company");
            }
            stock.get().setDeleted(true);
            stockCellService.deleteByStockId(id);
            log.info("Stock with id " + id + " was deleted");
        });
    }

    @PreAuthorize("hasAuthority('STOCK_ADMIN') or hasAuthority('STOCK_OWNER')")
    @Transactional(readOnly = true)
    public List<TableStockDTO> getCompanyStockTable() {
        Long companyId = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getCompanyId();
        List<Stock> stocks = stockRepository.getByCompanyIdAndDeletedFalse(companyId);
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!user.getCompanyId().equals(companyId)) {
            throw new AccessDeniedException("You cannot get info about this company");
        }
        log.info("Found stocks by company id " + companyId + " with number of elements " + stocks.size());
        return stocks.stream()
                .map(stock -> {
                    Long workersCount = userRepository.countByStockIdAndDeletedFalse(stock.getId());
                    Long cellsCount = stockCellRepository.countByStockIdAndDeletedFalse(stock.getId());
                    Long freeCellsCount = stockCellRepository.count(buildWhereStockIdAndNoGoods(stock.getId()));

                    TableStockDTO tableStockDTO;
                    tableStockDTO = stockMapping.getMapper().map(stock, TableStockDTO.class);
                    tableStockDTO.setWorkersCount(workersCount);
                    tableStockDTO.setCellsCount(cellsCount);
                    tableStockDTO.setFreeCellsCount(freeCellsCount);

                    return tableStockDTO;
                })
                .collect(Collectors.toList());
    }

    private Stock findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Stock> stock = stockRepository.getByIdAndDeletedFalse(id);
        if (stock.isPresent()) {
            UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!user.getCompanyId().equals(stock.get().getCompany().getId())) {
                throw new AccessDeniedException("You cannot get this stock");
            }
            return stock.get();
        }
        log.error("Cannot find stock with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private BooleanBuilder buildWhereCompanyId(Long id) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QStock.stock.company.id.eq(id)).and(QStock.stock.deleted.isFalse());
        return booleanBuilder;
    }

    private BooleanBuilder buildWhereStockIdAndNoGoods(Long stockId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QStockCell.stockCell.deleted.isFalse())
                .and(QStockCell.stockCell.stock.id.eq(stockId))
                .and(QStockCell.stockCell.goods.isEmpty());
        return booleanBuilder;
    }
}
