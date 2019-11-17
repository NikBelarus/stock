package com.onlinestock.core.consignment.dto;

import com.onlinestock.core.carriage.VehicleType;
import com.onlinestock.core.carriage.dto.FindCarrierDTO;
import com.onlinestock.core.consignment.ConsignmentStatus;
import com.onlinestock.core.consignment.ConsignmentType;
import com.onlinestock.core.driver.dto.FindDriverDTO;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.user.dto.FindUserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindConsignmentDTO {
    private Long id;

    private Long numberInCompany;

    private String consignmentDescription;

    private FindCarrierDTO carrier;
    private FindDriverDTO driver;

    private ConsignmentStatus status;
    private VehicleType vehicleType;

    private String vehicleNo;

    private ConsignmentType type;

    private LocalDateTime registrationDate;
    private LocalDateTime verificationDate;
    private LocalDateTime registrationCompletedDate;

    private Long stockId;

    private FindUserDTO manager;
    private FindUserDTO dispatcher;
    private FindUserDTO controller;

    private List<FindGoodDTO> goods;
}
