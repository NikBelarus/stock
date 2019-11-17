package com.onlinestock.core.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCompanyPaymentDTO {

    @NotNull(message = "Sum is required")
    private BigDecimal sum;

    @NotNull(message = "Company id is required")
    private Long companyId;
}
