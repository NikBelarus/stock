package com.onlinestock.core.company.dto;

import com.onlinestock.core.user.dto.FindUserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpandedInfoCompanyDTO {
    Long id;
    String name;
    FindUserDTO ownerInfo;
    FindUserDTO adminInfo;
}
