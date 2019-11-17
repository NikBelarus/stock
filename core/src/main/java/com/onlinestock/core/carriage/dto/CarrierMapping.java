package com.onlinestock.core.carriage.dto;

import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.company.repository.CompanyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CarrierMapping extends MainAppMapping {

    @Autowired
    private CompanyRepository companyRepository;

    public CarrierMapping(){
        modelMapper.createTypeMap(Carrier.class, SaveCarrierDTO.class);
        modelMapper.createTypeMap(SaveCarrierDTO.class, Carrier.class)
                .addMappings(mapping -> mapping.skip(Carrier::setCompany))
                .setPreConverter(context -> {
                    if (context.getSource().getCompanyId() != null) {
                        Company company = companyRepository.findById(context.getSource().getCompanyId()).orElse(null);
                        context.getDestination().setCompany(company);
                    }
                    return context.getDestination();
                });;
        modelMapper.createTypeMap(Carrier.class, FindCarrierDTO.class);
        modelMapper.createTypeMap(FindCarrierDTO.class, Carrier.class);
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
