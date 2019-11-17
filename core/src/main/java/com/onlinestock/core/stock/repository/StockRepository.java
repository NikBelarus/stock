package com.onlinestock.core.stock.repository;

import com.onlinestock.core.stock.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long>, QuerydslPredicateExecutor<Stock> {

    Optional<Stock> getByIdAndDeletedFalse(Long id);

    Page<Stock> getAllByDeletedFalse(Pageable pageable);

    List<Stock> getByCompanyIdAndDeletedFalse(Long companyId);

    Long countByCompanyIdAndDeletedFalse(Long id);

    Optional<Stock> getByIdAndCompanyIdAndDeletedFalse(Long stockId, Long companyId);
}
