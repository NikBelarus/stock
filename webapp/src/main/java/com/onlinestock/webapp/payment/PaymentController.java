package com.onlinestock.webapp.payment;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.payment.service.CompaniesReportProjection;
import com.onlinestock.core.company.service.impl.CompanyServiceImpl;
import com.onlinestock.core.payment.dto.FindCompanyPaymentDTO;
import com.onlinestock.core.payment.dto.SaveCompanyPaymentDTO;
import com.onlinestock.core.payment.service.impl.CompanyPaymentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {

    @Autowired
    CompanyPaymentServiceImpl companyPaymentService;
    @Autowired
    CompanyServiceImpl companyService;


    @PostMapping
    public ApiResponse pay(){
        SaveCompanyPaymentDTO companyPaymentDTO = companyService.pay();
        return companyPaymentService.create(companyPaymentDTO);
    }

    @GetMapping
    public Page<FindCompanyPaymentDTO> getPayments(Pageable pageable){
        return companyPaymentService.findPage(pageable);
    }

    @GetMapping("/year_report")
    public List<Double> getYearReport() throws ParseException {
        return companyPaymentService.getYearReport();
    }

    @GetMapping("/companies_report")
    public List<CompaniesReportProjection> getCompaniesReport(){
        return companyPaymentService.getCompaniesReport();
    }
}