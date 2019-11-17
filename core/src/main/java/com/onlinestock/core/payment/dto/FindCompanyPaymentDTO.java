package com.onlinestock.core.payment.dto;

import com.onlinestock.core.company.dto.FindCompanyDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindCompanyPaymentDTO {

    private Long id;

    private LocalDateTime date;

    private BigDecimal sum;

    private FindCompanyDTO company;
}
