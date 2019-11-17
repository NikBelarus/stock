package com.onlinestock.core.driver.dto;

import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.carriage.repository.CarrierRepository;
import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.driver.Driver;
import com.onlinestock.core.driver.repository.DriverRepository;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.dto.FindStockDTO;
import com.onlinestock.core.stock.dto.SaveStockDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DriverMapping extends MainAppMapping {


    @Autowired
    CarrierRepository carrierRepository;

    public DriverMapping(){
        modelMapper.createTypeMap(Driver.class, FindDriverDTO.class)
                .addMappings(mapping -> mapping.skip(FindDriverDTO::setCarrierId))
                .setPreConverter(context -> {
                    Long carrierId = context.getSource().getCarrier().getId();
                    context.getDestination().setCarrierId(carrierId);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveDriverDTO.class, Driver.class)
                .addMappings(mapping -> mapping.skip(Driver::setCarrier))
                .setPreConverter(context -> {
                    Carrier carrier = carrierRepository.getByIdAndDeletedFalse(context.getSource().getCarrierId()).orElse(null);
                    context.getDestination().setCarrier(carrier);
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper(){
        return modelMapper;
    }
}
