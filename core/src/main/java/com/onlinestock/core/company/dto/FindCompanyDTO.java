package com.onlinestock.core.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindCompanyDTO {
    private Long id;
    private String Name;
    private Boolean blocked;
}
