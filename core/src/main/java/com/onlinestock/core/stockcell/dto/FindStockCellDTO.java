package com.onlinestock.core.stockcell.dto;

import com.onlinestock.core.stockcell.StorageCondition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindStockCellDTO {

    private Long id;

    private StorageCondition storageCondition;

    private String name;

    private BigDecimal cellPrice;

    private BigDecimal volume;

    private BigDecimal freeVolume;

    private Long stockId;
}
