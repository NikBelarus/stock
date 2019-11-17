package com.onlinestock.core.user.dto;

import com.onlinestock.core.user.Role;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindUserDTO {

    private Long id;

    private Role role;

    private String firstName;

    private String lastName;

    private String parentName;

    private String email;

    private BigDecimal salary;

    private LocalDate birthdate;

    private String city;

    private String street;

    private String house;

    private Integer appartment;

    private Long companyId;

    private Long stockId;
}
