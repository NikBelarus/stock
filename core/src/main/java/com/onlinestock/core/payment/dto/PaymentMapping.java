package com.onlinestock.core.payment.dto;

import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.company.dto.CompanyMapping;
import com.onlinestock.core.company.dto.FindCompanyDTO;
import com.onlinestock.core.company.repository.CompanyRepository;
import com.onlinestock.core.payment.CompanyPayment;
import com.onlinestock.core.payment.Pricelist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PaymentMapping extends MainAppMapping {

    @Autowired
    CompanyMapping companyMapping;

    @Autowired
    CompanyRepository companyRepository;

    public PaymentMapping() {
        modelMapper.createTypeMap(CompanyPayment.class, FindCompanyPaymentDTO.class)
                .addMappings(mapping -> mapping.skip(FindCompanyPaymentDTO::setCompany))
                .setPreConverter(context -> {
                    Company company = context.getSource().getCompany();
                    context.getDestination().setCompany(companyMapping.getMapper().map(company, FindCompanyDTO.class));
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveCompanyPaymentDTO.class, CompanyPayment.class)
                .addMappings(mapping -> mapping.skip(CompanyPayment::setCompany))
                .setPreConverter(context -> {
                    Long companyId = context.getSource().getCompanyId();
                    Company company = companyRepository.getByIdAndDeletedFalse(companyId).orElse(null);
                    context.getDestination().setDeleted(false);
                    context.getDestination().setCompany(company);
                    context.getDestination().setDate(LocalDateTime.now());
                    return context.getDestination();
                });
        modelMapper.createTypeMap(PriceListDTO.class, Pricelist.class)
                .addMappings(mapping -> mapping.skip(Pricelist::setId));
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }


}
