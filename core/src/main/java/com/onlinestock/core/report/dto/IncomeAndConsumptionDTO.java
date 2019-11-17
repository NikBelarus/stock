package com.onlinestock.core.report.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncomeAndConsumptionDTO {

    BigDecimal income;

    BigDecimal consumption;
}
