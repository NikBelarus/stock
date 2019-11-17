package com.onlinestock.core.consignment.dto;

import com.onlinestock.core.carriage.VehicleType;
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
public class UpdateConsignmentDTO {

        private Long id;

        private String consignmentDescription;

        private ConsignmentType type;

        private VehicleType vehicleType;

        private String vehicleNo;

        private LocalDateTime registrationDate;
        private LocalDateTime verificationDate;
        private LocalDateTime registrationCompletedDate;

        private Long carrierId;

        private Long driverId;

        private Long managerId;
        private Long dispatcherId;
        private Long controllerId;

        private List<FindGoodDTO> goods;

}
