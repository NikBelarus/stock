package com.onlinestock.core.quartz;

import com.onlinestock.core.company.Company;
import com.onlinestock.core.company.service.impl.CompanyServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
public class PaymentVerificationJob implements Job {
    @Autowired
    CompanyServiceImpl companyService;

    @Override
    @Transactional
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        List<Company> companies = companyService.findAll();
        for (Company company : companies) {
            if (company.getLastPaymentDate().toLocalDate().isEqual(LocalDate.now().minusMonths(1))) {
                company.setBlocked(true);
            }
        }
    }
}
