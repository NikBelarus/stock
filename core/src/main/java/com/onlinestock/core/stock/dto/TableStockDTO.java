package com.onlinestock.core.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableStockDTO {
    private Long id;

    private String city;

    private String street;

    private String house;

    private Float longitude;

    private Float latitude;

    private Long companyId;

    private Long workersCount;

    private Long cellsCount;

    private Long freeCellsCount;
}
