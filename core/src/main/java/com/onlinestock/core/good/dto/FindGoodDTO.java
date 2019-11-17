package com.onlinestock.core.good.dto;

import com.onlinestock.core.good.GoodsStatus;
import com.onlinestock.core.stockcell.StorageCondition;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindGoodDTO {

    private Long  id;

    private String name;

    private BigDecimal weight;

    private Integer count;

    private String unit;

    private BigDecimal price;

    private BigDecimal volume;

    private StorageCondition storageCondition;

    private GoodsStatus state;

    private Long carrierId;

    private Long inputConsignmentId;

    private Long outputConsignmentId;

    private Long inconsistencyActId;

    private Long cancellationActId;

    private Long cellId;
}
