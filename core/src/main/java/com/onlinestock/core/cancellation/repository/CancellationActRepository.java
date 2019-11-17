package com.onlinestock.core.cancellation.repository;

import com.onlinestock.core.cancellation.CancellationAct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CancellationActRepository extends JpaRepository<CancellationAct, Long>, QuerydslPredicateExecutor<CancellationAct> {

    Page<CancellationAct> findByDeletedFalseOrderByDateDesc(Pageable pageable);
}