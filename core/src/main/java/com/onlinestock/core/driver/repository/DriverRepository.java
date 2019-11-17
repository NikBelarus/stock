package com.onlinestock.core.driver.repository;

import com.onlinestock.core.driver.Driver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    boolean existsByPassportNoAndDeletedFalse(String passportNo);

    boolean existsByPassportNoAndIdIsNotAndDeletedFalse(String passportNo, Long id);

    Optional<Driver> getByIdAndDeletedFalse(Long id);

    Page<Driver> getByCarrierIdAndDeletedFalse(Long carrierId, Pageable pageable);
}
