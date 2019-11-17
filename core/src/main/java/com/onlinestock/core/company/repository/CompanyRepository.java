package com.onlinestock.core.company.repository;

import com.onlinestock.core.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, QuerydslPredicateExecutor<Company> {

    Optional<Company> getByIdAndDeletedFalse(Long id);

    boolean existsByNameAndIdIsNotAndDeletedFalse(String name, Long id);

    List<Company> getAllByDeletedFalse();
}
