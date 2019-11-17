package com.onlinestock.core.dailystatistics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindDailyStatisticsDTO {
    
    private LocalDate date;

    private BigDecimal income;

    private BigDecimal consumption;

    private Long companyId;
}
