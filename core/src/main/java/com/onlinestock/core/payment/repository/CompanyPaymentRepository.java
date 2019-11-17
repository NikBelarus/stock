package com.onlinestock.core.payment.repository;

import com.onlinestock.core.payment.service.CompaniesReportProjection;
import com.onlinestock.core.payment.CompanyPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CompanyPaymentRepository extends JpaRepository<CompanyPayment, Long>, QuerydslPredicateExecutor<CompanyPayment> {

    @Query(value = "select sum(sum) from public.company_payment where date >= :date1 and date <= :date2", nativeQuery = true)
    Double findSumByDate(@Param("date1") Date date1, @Param("date2") Date date2);

    @Query(value = "select distinct name, sum(cp.sum) from public.company_payment cp, public.company c where c.id =" +
            " cp.company_id group by cp.company_id, c.name order by sum desc", nativeQuery = true)
    List<CompaniesReportProjection> findCompaniesWithSum();
  
    List<CompanyPayment> getAllByIdAndDeletedFalse(Long id);

}