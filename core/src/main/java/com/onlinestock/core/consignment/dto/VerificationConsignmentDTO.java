package com.onlinestock.core.consignment.dto;

import com.onlinestock.core.consignment.ConsignmentType;
import com.onlinestock.core.good.dto.FindGoodDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationConsignmentDTO {
    private Long id;

    private List<FindGoodDTO> goods;

    private LocalDateTime verificationDate;

    private ConsignmentType type;

}
