package com.onlinestock.core.consignment.dto;

import com.onlinestock.core.consignment.ConsignmentStatus;
import com.onlinestock.core.consignment.ConsignmentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShortConsignmentDTO {
    private Long id;

    private ConsignmentStatus status;

    private ConsignmentType type;

    private LocalDateTime date;
}
