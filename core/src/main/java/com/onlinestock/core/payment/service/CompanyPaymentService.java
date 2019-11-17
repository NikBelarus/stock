package com.onlinestock.core.payment.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.payment.dto.FindCompanyPaymentDTO;
import com.onlinestock.core.payment.dto.SaveCompanyPaymentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface CompanyPaymentService {

    Page<FindCompanyPaymentDTO> findPage(Pageable pageable);

    ApiResponse create(@Valid SaveCompanyPaymentDTO saveCompanyPaymentDTO);
}
