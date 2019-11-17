package com.onlinestock.core.payment.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.payment.service.CompaniesReportProjection;
import com.onlinestock.core.company.repository.CompanyRepository;
import com.onlinestock.core.payment.CompanyPayment;
import com.onlinestock.core.payment.dto.FindCompanyPaymentDTO;
import com.onlinestock.core.payment.dto.PaymentMapping;
import com.onlinestock.core.payment.dto.SaveCompanyPaymentDTO;
import com.onlinestock.core.payment.repository.CompanyPaymentRepository;
import com.onlinestock.core.payment.service.CompanyPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CompanyPaymentServiceImpl implements CompanyPaymentService {

    @Autowired
    CompanyPaymentRepository companyPaymentRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    PaymentMapping paymentMapping;

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Override
    @Transactional(readOnly = true)
    public Page<FindCompanyPaymentDTO> findPage(Pageable pageable) {
        Page<CompanyPayment> payments = companyPaymentRepository.findAll(pageable);
        return payments.map(payment -> paymentMapping.getMapper().map(payment, FindCompanyPaymentDTO.class));
    }

    @PreAuthorize("hasAuthority('STOCK_OWNER')")
    @Override
    @Transactional
    public ApiResponse create(@Valid SaveCompanyPaymentDTO saveCompanyPaymentDTO) {
        CompanyPayment payment = paymentMapping.getMapper().map(saveCompanyPaymentDTO, CompanyPayment.class);
        companyPaymentRepository.save(payment);
        return new ApiResponse(true, "Payment completed", paymentMapping.getMapper().map(payment,
                FindCompanyPaymentDTO.class));
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Transactional(readOnly = true)
    public List<Double> getYearReport() throws ParseException {
        List<Double> result = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 0; i < 12; i++) {
            result.add(companyPaymentRepository.findSumByDate(sdf.parse("2019-" + (i + 1) + "-01"),
                    sdf.parse("2019-" + (i + 1) + "-31")));
        }
        return result;
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Transactional(readOnly = true)
    public List<CompaniesReportProjection> getCompaniesReport() {
        return companyPaymentRepository.findCompaniesWithSum();
    }
}