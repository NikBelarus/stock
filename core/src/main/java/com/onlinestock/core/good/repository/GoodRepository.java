package com.onlinestock.core.good.repository;

import com.onlinestock.core.good.Good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoodRepository extends JpaRepository<Good, Long>, QuerydslPredicateExecutor<Good> {

    Optional<Good> getByIdAndDeletedFalse(Long id);

    List<Good> getAllByStockCellIdAndDeletedFalse(Long id);

    Optional<Good> findByIdAndDeletedFalse(Long id);

    List<Good> findByInconsistencyActIdAndDeletedFalse(Long id);

    List<Good> findByCancellationActIdAndDeletedFalse(Long id);

    List<Good> findByStockCellIdAndDeletedFalse(Long id);

}
