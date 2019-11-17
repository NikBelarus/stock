package com.onlinestock.core.driver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveDriverDTO {

    @NotBlank(message = "First name is required")
    @Size(max=100, message = "First name must contain less than 100 symbols")
    private String firstName;

    @NotBlank(message = "LastName is required")
    @Size(max=100, message = "LastName must contain less than 100 symbols")
    private String lastName;

    @NotBlank(message = "PassportNo is required")
    private String passportNo;

    @NotBlank(message = "Country is required")
    private String issueCountry;

    @NotNull(message = "carrier is required")
    private Long carrierId;
}
