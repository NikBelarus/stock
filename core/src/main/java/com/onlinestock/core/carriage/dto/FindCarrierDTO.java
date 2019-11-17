package com.onlinestock.core.carriage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindCarrierDTO {
    private Long id;
    private String name;
}
