package com.onlinestock.core.stockcell.dto;

import com.onlinestock.core.stockcell.StorageCondition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveStockCellDTO {

    @NotNull
    private StorageCondition storageCondition;

    @NotNull(message = "volume is required")
    @Digits(integer=10, fraction=0, message = "volume must contain less than 10 numbers")
    @Positive(message = "volume must be positive")
    private BigDecimal volume;

    @NotNull(message = "price is required")
    @Digits(integer=10, fraction=2, message = "price must contain less than 10 numbers")
    @Positive(message = "price must be positive")
    private BigDecimal cellPrice;

    @NotNull(message = "Cells count is required")
    @Positive(message = "Cells count must be positive")
    private Long cellsCount;

    @NotNull(message = "Stock id is required")
    @Positive(message = "The stock id must be positive")
    private Long stockId;
}
