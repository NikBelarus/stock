package com.onlinestock.core.user.dto;

import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.company.repository.CompanyRepository;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.authentication.UserPrincipal;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class UserMapping extends MainAppMapping {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private StockRepository stockRepository;

    public UserMapping(){
        modelMapper.createTypeMap(User.class, SaveUserDTO.class)
                .addMappings(mapping -> mapping.skip(SaveUserDTO::setCompanyId))
                .setPreConverter(context -> {
                    if(context.getSource().getCompany() != null) {
                        Long companyId = context.getSource().getCompany().getId();
                        context.getDestination().setCompanyId(companyId);
                    }
                    if(context.getSource().getStock() != null) {
                        Long stockId = context.getSource().getStock().getId();
                        context.getDestination().setStockId(stockId);
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveUserDTO.class, User.class)
                .addMappings(mapping -> mapping.skip(User::setCompany))
                .addMappings(mapping -> mapping.skip(User::setStock))
                .setPreConverter(context -> {
                    if(context.getSource().getSalary() == null){
                        context.getSource().setSalary(new BigDecimal(0));
                    }
                    if (context.getSource().getCompanyId() != null) {
                        Company company = companyRepository.findById(context.getSource().getCompanyId()).orElse(null);
                        context.getDestination().setCompany(company);
                    }
                    if (context.getSource().getStockId() != null) {
                        Stock stock = stockRepository.getOne(context.getSource().getStockId());
                        context.getDestination().setStock(stock);
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(User.class, FindUserDTO.class)
                .addMappings(mapping -> mapping.skip(FindUserDTO::setCompanyId))
                .setPreConverter(context -> {
                    if(context.getSource().getCompany() != null) {
                        Long companyId = context.getSource().getCompany().getId();
                        context.getDestination().setCompanyId(companyId);
                    }
                    if(context.getSource().getStock() != null) {
                        Long stockId = context.getSource().getStock().getId();
                        context.getDestination().setStockId(stockId);
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(FindUserDTO.class, User.class)
                .addMappings(mapping -> mapping.skip(User::setCompany))
                .addMappings(mapping -> mapping.skip(User::setStock))
                .setPreConverter(context -> {
                    if (context.getSource().getCompanyId() != null) {
                        Company company = companyRepository.findById(context.getSource().getCompanyId()).orElse(null);
                        context.getDestination().setCompany(company);
                    }
                    if (context.getSource().getStockId() != null) {
                        Stock stock = stockRepository.getOne(context.getSource().getStockId());
                        context.getDestination().setStock(stock);
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(User.class, UserPrincipal.class)
                .addMappings(mapping -> mapping.skip(UserPrincipal::setCompanyId))
                .setPreConverter(context -> {
                    if(context.getSource().getCompany() != null) {
                        Long companyId = context.getSource().getCompany().getId();
                        context.getDestination().setCompanyId(companyId);
                    }
                    if(context.getSource().getStock() != null) {
                        Long stockId = context.getSource().getStock().getId();
                        context.getDestination().setStockId(stockId);
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(UserPrincipal.class, User.class)
                .addMappings(mapping -> mapping.skip(User::setCompany))
                .addMappings(mapping -> mapping.skip(User::setStock))
                .setPreConverter(context -> {
                    if (context.getSource().getCompanyId() != null) {
                        Company company = companyRepository.findById(context.getSource().getCompanyId()).orElse(null);
                        context.getDestination().setCompany(company);
                    }
                    if (context.getSource().getStockId() != null) {
                        Stock stock = stockRepository.getOne(context.getSource().getStockId());
                        context.getDestination().setStock(stock);
                    }
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
