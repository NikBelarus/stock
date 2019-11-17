package com.onlinestock.core.user.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class LoginUserDTO {

    @NotBlank(message = "Email is required")
    @Size(max=100, message = "Email must contain less than 100 symbols")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max=100, message = "Password must contain less than 100 symbols")
    private String password;
}
