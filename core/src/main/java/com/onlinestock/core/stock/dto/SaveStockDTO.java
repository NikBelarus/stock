package com.onlinestock.core.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveStockDTO {

    @NotNull(message = "Company id is required")
    private Long companyId;

    @NotBlank(message = "City is required")
    @Size(max=100, message = "City must contain less than 100 symbols")
    private String city;

    @NotBlank(message = "Street is required")
    @Size(max=100, message = "Street must contain less than 100 symbols")
    private String street;

    @NotBlank(message = "House is required")
    @Size(max=100, message = "House must contain less than 100 symbols")
    private String house;

    @NotNull(message = "Latitude is required")
    private Float latitude;

    @NotNull(message = "Longitude is required")
    private Float longitude;
}
