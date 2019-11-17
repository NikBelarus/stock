package com.onlinestock.core.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceListDTO {

    private Long id;

    private BigDecimal commonPrice;

    private BigDecimal oneStockPrice;
}
