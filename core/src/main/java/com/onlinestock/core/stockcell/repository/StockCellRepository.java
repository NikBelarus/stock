package com.onlinestock.core.stockcell.repository;

import com.onlinestock.core.stockcell.StockCell;
import org.hibernate.annotations.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface StockCellRepository extends JpaRepository<StockCell, Long>, QuerydslPredicateExecutor<StockCell> {

    Optional<StockCell> getByIdAndDeletedFalse(Long id);

    List<StockCell> getByStockIdAndDeletedFalse(Long id);

    Long countByStockIdAndDeletedFalse(Long stockId);

    List<StockCell> getAllByStockIdAndDeletedFalse(Long id);
}
