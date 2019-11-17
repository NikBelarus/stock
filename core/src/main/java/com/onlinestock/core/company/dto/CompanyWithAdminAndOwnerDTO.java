package com.onlinestock.core.company.dto;

import com.onlinestock.core.user.dto.SaveUserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyWithAdminAndOwnerDTO {
    private SaveCompanyDTO company;
    private SaveUserDTO admin;
    private SaveUserDTO owner;
}
