package com.onlinestock.core.user.dto;

import com.onlinestock.core.user.Role;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveUserDTO {
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Size(max=100, message = "Email must contain less than 100 symbols")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max=100, message = "Password must contain less than 100 symbols")
    private String password;

    @NotBlank(message = "ConfirmPassword is required")
    @Size(max=100, message = "Password must contain less than 100 symbols")
    private String confirmPassword;

    @NotNull
    private Role role;

    @NotBlank(message = "FirstName is required")
    @Size(max=100, message = "FirstName must contain less than 100 symbols")
    private String firstName;

    @NotBlank(message = "LastName is required")
    @Size(max=100, message = "LastName must contain less than 100 symbols")
    private String lastName;

    @NotBlank(message = "ParentName is required")
    @Size(max=100, message = "ParentName must contain less than 100 symbols")
    private String parentName;

    @NotNull
    @Past(message = "Bad format of birthdate")
    private LocalDate birthdate;

    private BigDecimal salary;

    @NotBlank(message = "City is required")
    @Size(max=100, message = "City must contain less than 100 symbols")
    private String city;

    @NotBlank(message = "Street is required")
    @Size(max=100, message = "Street must contain less than 100 symbols")
    private String street;

    @NotBlank(message = "House is required")
    @Size(max=100, message = "House must contain less than 100 symbols")
    private String house;

    @NotNull(message = "Appartment is required")
    @Digits(integer=4, fraction=0, message = "Appartment must contain less than 4 numbers")
    @Positive(message = "The number of appartment must be positive")
    private Integer appartment;

    @Positive(message = "company id must be positive")
    private Long companyId;

    @Positive(message = "stock id must be positive")
    private Long stockId;
}
