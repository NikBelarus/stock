package com.onlinestock.core.stock.dto;

import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.company.repository.CompanyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StockMapping extends MainAppMapping {

    @Autowired
    private CompanyRepository companyRepository;

    public StockMapping() {
        modelMapper.createTypeMap(Stock.class, SaveStockDTO.class)
                .addMappings(mapping -> mapping.skip(SaveStockDTO::setCompanyId))
                .setPreConverter(context -> {
                    Long companyId = context.getSource().getCompany().getId();
                    context.getDestination().setCompanyId(companyId);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveStockDTO.class, Stock.class)
                .addMappings(mapping -> mapping.skip(Stock::setCompany))
                .addMappings(mapping -> mapping.skip(Stock::setStockCells))
                .setPreConverter(context -> {
                    Company company = companyRepository.findById(context.getSource().getCompanyId()).orElse(null);
                    context.getDestination().setCompany(company);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(Stock.class, FindStockDTO.class)
                .addMappings(mapping -> mapping.skip(FindStockDTO::setCompanyId))
                .setPreConverter(context -> {
                    Long companyId = context.getSource().getCompany().getId();
                    context.getDestination().setCompanyId(companyId);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(FindStockDTO.class, Stock.class)
                .addMappings(mapping -> mapping.skip(Stock::setCompany))
                .addMappings(mapping -> mapping.skip(Stock::setStockCells))
                .setPreConverter(context -> {
                    Company company = companyRepository.findById(context.getSource().getCompanyId()).orElse(null);
                    context.getDestination().setCompany(company);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(Stock.class, TableStockDTO.class)
                .addMappings(mapping -> mapping.skip(TableStockDTO::setCompanyId))
                .setPreConverter(context -> {
                    Long companyId = context.getSource().getCompany().getId();
                    context.getDestination().setCompanyId(companyId);
                    return context.getDestination();
                });

    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
