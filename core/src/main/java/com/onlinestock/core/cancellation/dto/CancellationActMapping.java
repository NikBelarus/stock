package com.onlinestock.core.cancellation.dto;

import com.onlinestock.core.cancellation.CancellationAct;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.good.dto.GoodMapping;
import com.onlinestock.core.good.repository.GoodRepository;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.dto.FindStockDTO;
import com.onlinestock.core.stock.dto.StockMapping;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.UserMapping;
import com.onlinestock.core.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CancellationActMapping {

    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapping userMapping;

    @Autowired
    private GoodRepository goodRepository;

    @Autowired
    private GoodMapping goodMapping;

    @Autowired
    private StockMapping stockMapping;

    public CancellationActMapping() {
        modelMapper.createTypeMap(SaveCancellationActDTO.class, CancellationAct.class)
                .addMappings(mapping -> mapping.skip(CancellationAct::setController))
                .addMappings(mapping -> mapping.skip(CancellationAct::setGoods))
                .setPreConverter(context -> {
                    SaveCancellationActDTO dto = context.getSource();
                    User user = userRepository.findById(dto.getControllerId()).orElse(null);
                    context.getDestination().setController(user);
                    Stock stock = null;
                    if (user != null) {
                        stock = user.getStock();
                    }
                    context.getDestination().setStock(stock);
                    return context.getDestination();
                });

        modelMapper.createTypeMap(CancellationAct.class, FindCancellationActDTO.class)
                .addMappings(mapping -> mapping.skip(FindCancellationActDTO::setGoods))
                .addMappings(mapping -> mapping.skip(FindCancellationActDTO::setResponsibleWorker))
                .addMappings(mapping -> mapping.skip(FindCancellationActDTO::setStock))
                .addMappings(mapping -> mapping.skip(FindCancellationActDTO::setGoods))
                .setPreConverter(context -> {
                    CancellationAct source = context.getSource();
                    List<Good> goods = goodRepository.findByCancellationActIdAndDeletedFalse(source.getId());
                    context.getDestination().setGoods(goods.stream()
                            .map(good -> goodMapping.getMapper().map(good, FindGoodDTO.class))
                            .collect(Collectors.toList()));
                    context.getDestination().setStock(
                            stockMapping.getMapper().map(source.getStock(), FindStockDTO.class));
                    context.getDestination().setResponsibleWorker(
                            userMapping.getMapper().map(source.getController(), FindUserDTO.class));
                    context.getDestination().setDate(context.getSource().getDate());
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
