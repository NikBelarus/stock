package com.onlinestock.core.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveCompanyDTO {

    @NotEmpty(message = "Name is required")
    @Size(max=100, message = "Name must contain less than 100 symbols")
    private String name;
}
