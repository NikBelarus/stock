package com.onlinestock.core.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindStockDTO {

    private Long id;

    private Long companyId;

    private String city;

    private String street;

    private String house;

    private Float latitude;

    private Float longitude;
}
