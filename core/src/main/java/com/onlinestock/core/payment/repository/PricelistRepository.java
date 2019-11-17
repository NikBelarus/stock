package com.onlinestock.core.payment.repository;

import com.onlinestock.core.payment.Pricelist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PricelistRepository extends JpaRepository<Pricelist, Long>, QuerydslPredicateExecutor<Pricelist> {
    Optional<Pricelist> getByIdAndDeletedFalse(Long id);
}
