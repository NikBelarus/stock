package com.onlinestock.core.company.dto;

import com.onlinestock.core.payment.Pricelist;
import com.onlinestock.core.payment.repository.PricelistRepository;
import com.onlinestock.core.user.Role;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.UserMapping;
import com.onlinestock.core.user.repository.UserRepository;
import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.company.Company;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapping extends MainAppMapping {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PricelistRepository pricelistRepository;

    public CompanyMapping(){
        modelMapper.createTypeMap(Company.class, SaveCompanyDTO.class);
        modelMapper.createTypeMap(SaveCompanyDTO.class, Company.class)
                .setPreConverter(
                        context -> {
                            Pricelist pricelist = pricelistRepository.findById((long) 1).get();
                            context.getDestination().setPricelist(pricelist);
                            return context.getDestination();
                        }
                );
        modelMapper.createTypeMap(Company.class, FindCompanyDTO.class);
        modelMapper.createTypeMap(FindCompanyDTO.class, Company.class);
        modelMapper.createTypeMap(Company.class, ExpandedInfoCompanyDTO.class)
                .addMappings(mapping -> mapping.skip(ExpandedInfoCompanyDTO::setAdminInfo))
                .addMappings(mapping -> mapping.skip(ExpandedInfoCompanyDTO::setOwnerInfo))
                .setPreConverter(context ->{
                    Long companyId = context.getSource().getId();
                    User owner = userRepository.getByCompanyIdAndRole(companyId, Role.STOCK_OWNER);
                    User stockAdmin = userRepository.getByCompanyIdAndRole(companyId, Role.STOCK_ADMIN);
                    FindUserDTO ownerInfo = new UserMapping().getMapper().map(owner, FindUserDTO.class);
                    FindUserDTO adminInfo = new UserMapping().getMapper().map(stockAdmin, FindUserDTO.class);

                    context.getDestination().setAdminInfo(adminInfo);
                    context.getDestination().setOwnerInfo(ownerInfo);
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper(){
        return modelMapper;
    }
}
