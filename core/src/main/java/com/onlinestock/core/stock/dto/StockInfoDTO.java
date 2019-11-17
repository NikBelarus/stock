package com.onlinestock.core.stock.dto;

import com.onlinestock.core.stockcell.dto.FindStockCellDTO;
import com.onlinestock.core.user.dto.StockWorkerDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockInfoDTO {

    private Long id;
    private String city;
    private String street;
    private String house;

    private Float latitude;
    private Float longitude;

    private List<FindStockCellDTO> cells;
    private List<StockWorkerDTO> workers;
}
