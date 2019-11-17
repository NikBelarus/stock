package com.onlinestock.core.user.dto;

import com.onlinestock.core.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockWorkerDTO {

    private Long id;

    private Role role;

    private String email;

    private String firstName;

    private String lastName;

    private String parentName;
}
