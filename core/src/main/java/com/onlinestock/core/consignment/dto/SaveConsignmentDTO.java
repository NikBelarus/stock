package com.onlinestock.core.consignment.dto;

import com.onlinestock.core.carriage.VehicleType;
import com.onlinestock.core.consignment.ConsignmentStatus;
import com.onlinestock.core.consignment.ConsignmentType;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveConsignmentDTO {

    private String consignmentDescription;

    private VehicleType vehicleType;
    private String vehicleNo;

    @NotNull(message = "ConsignmentType is required!")
    private ConsignmentType type;

    private LocalDateTime registrationDate;
    private LocalDateTime verificationDate;
    private LocalDateTime registrationCompletedDate;

    @NotNull(message = "CarrierId is required!")
    private Long carrierId;

    @NotNull(message = "StockId is required!")
    private Long stockId;

    @NotNull(message = "status is required")
    private ConsignmentStatus status;


    @NotNull(message = "Company id is required")
    private Long companyId;

    private Long managerId;
    private Long dispatcherId;
    private Long controllerId;

    @NotNull(message = "DriverId is required!")
    private Long driverId;

    @NotNull(message = "Goods are required!")
    private List<SaveGoodDTO> goods;

}
