package com.onlinestock.core.stockcell.dto;

import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.stockcell.StockCell;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StockCellMapping extends MainAppMapping {

    @Autowired
    private StockRepository stockRepository;

    public StockCellMapping(){
        modelMapper.createTypeMap(StockCell.class, SaveStockCellDTO.class)
                .addMappings(mapping -> mapping.skip(SaveStockCellDTO::setStockId))
                .setPreConverter(context -> {
                    Long stockId = context.getSource().getStock().getId();
                    context.getDestination().setStockId(stockId);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveStockCellDTO.class, StockCell.class)
                .addMappings(mapping -> mapping.skip(StockCell::setStock))
                .addMappings(mapping -> mapping.skip(StockCell::setGoods))
                .setPreConverter(context -> {
                    Stock stock = stockRepository.findById(context.getSource().getStockId()).orElse(null);
                    context.getDestination().setStock(stock);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(StockCell.class, FindStockCellDTO.class)
                .addMappings(mapping -> mapping.skip(FindStockCellDTO::setStockId))
                .setPreConverter(context -> {
                    Long stockId = context.getSource().getStock().getId();
                    context.getDestination().setStockId(stockId);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(FindStockCellDTO.class, StockCell.class)
                .addMappings(mapping -> mapping.skip(StockCell::setStock))
                .addMappings(mapping -> mapping.skip(StockCell::setGoods))
                .setPreConverter(context -> {
                    Stock stock = stockRepository.findById(context.getSource().getStockId()).orElse(null);
                    context.getDestination().setStock(stock);
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
