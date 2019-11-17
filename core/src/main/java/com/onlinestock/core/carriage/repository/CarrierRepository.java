package com.onlinestock.core.carriage.repository;

import com.onlinestock.core.carriage.Carrier;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarrierRepository extends JpaRepository<Carrier, Long>, QuerydslPredicateExecutor<Carrier> {

    List<Carrier> findAllByDeletedFalse();

    Optional<Carrier> getByIdAndDeletedFalse(Long id);
}
