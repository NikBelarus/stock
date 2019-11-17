package com.onlinestock.core.inconsisency.repository;

import com.onlinestock.core.inconsisency.InconsistencyAct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InconsistencyActRepository extends JpaRepository<InconsistencyAct, Long>, QuerydslPredicateExecutor<InconsistencyAct> {

    Optional<InconsistencyAct> findByIdAndDeletedFalse(Long id);

    Page<InconsistencyAct> findByDeletedFalseOrderByDateDesc(Pageable pageable);
}