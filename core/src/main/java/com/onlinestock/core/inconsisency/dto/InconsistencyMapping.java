package com.onlinestock.core.inconsisency.dto;

import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.driver.Driver;
import com.onlinestock.core.driver.dto.DriverMapping;
import com.onlinestock.core.driver.dto.FindDriverDTO;
import com.onlinestock.core.driver.repository.DriverRepository;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.good.dto.GoodMapping;
import com.onlinestock.core.good.repository.GoodRepository;
import com.onlinestock.core.inconsisency.InconsistencyAct;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class InconsistencyMapping extends MainAppMapping {

    @Autowired
    private GoodMapping goodMapping;

    @Autowired
    private DriverMapping driverMapping;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private GoodRepository goodRepository;

    @Autowired
    private UserRepository userRepository;

    public InconsistencyMapping() {
        modelMapper.createTypeMap(InconsistencyAct.class, FindInconsistencyDTO.class)
                .addMappings(mapping -> mapping.skip(FindInconsistencyDTO::setGoods))
                .addMappings(mapping -> mapping.skip(FindInconsistencyDTO::setDriver))
                .addMappings(mapping -> mapping.skip(FindInconsistencyDTO::setUser))
                .setPreConverter(context -> {
                    InconsistencyAct source = context.getSource();
                    List<Good> goods = goodRepository.findByInconsistencyActIdAndDeletedFalse(source.getId());
                    context.getDestination().setGoods(goods.stream()
                            .map(good -> goodMapping.getMapper().map(good, FindGoodDTO.class))
                            .collect(Collectors.toList()));
                    context.getDestination().setDriver(
                            driverMapping.getMapper().map(source.getDriver(), FindDriverDTO.class));
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveInconsistencyDTO.class, InconsistencyAct.class)
                .addMappings(mapping -> mapping.skip(InconsistencyAct::setDriver))
                .addMappings(mapping -> mapping.skip(InconsistencyAct::setUser))
                .addMappings(mapping -> mapping.skip(InconsistencyAct::setGoods))
                .setPreConverter(context -> {
                    SaveInconsistencyDTO dto = context.getSource();
                    Driver driver = driverRepository.findById(dto.getDriverId()).orElse(null);
                    User user = userRepository.findById(dto.getUserId()).orElse(null);
                    context.getDestination().setDriver(driver);
                    context.getDestination().setUser(user);
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}