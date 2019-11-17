package com.onlinestock.core.good.dto;

import com.onlinestock.core.good.GoodsStatus;
import com.onlinestock.core.stockcell.StorageCondition;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveGoodDTO {

    private Long id;

    @NotEmpty(message = "Title is required!")
    @Size(max = 100, message = "Title must contain less than 100 symbols")
    private String name;
    

    @NotNull(message = "Weight is required!")
    @Digits(integer = 10, fraction = 2, message = "")
    private BigDecimal weight;

    @NotNull(message = "Count is required!")
    @Digits(integer = 10, fraction = 0, message = "Count is a too big number!")
    private Integer count;

    @NotEmpty(message = "Unit is required!")
    @Size(max = 100, message = "Unit must contain less than 100 symbols")
    private String unit;

    @NotNull(message="carrier is required")
    private Long carrierId;

    @NotNull(message = "Price is required!")
    @Digits(integer = 10, fraction = 2, message = "")
    private BigDecimal price;

    @NotNull(message ="Volume is required!")
    @Digits(integer = 10, fraction = 2, message = "")
    private BigDecimal volume;

    private Long stockCellId;

    private Long inputConsignmentId;
    private Long outputConsignmentId;
    private Long inconsistencyActId;
    private Long cancellationActId;

    @NotNull(message = "Condition is required!")
    private StorageCondition storageCondition;

    @NotNull(message = "State is required!")
    private GoodsStatus state;
}
