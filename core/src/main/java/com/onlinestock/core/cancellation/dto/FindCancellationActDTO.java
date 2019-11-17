package com.onlinestock.core.cancellation.dto;

import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.stock.dto.FindStockDTO;
import com.onlinestock.core.user.dto.FindUserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindCancellationActDTO {

    private Long id;

    private LocalDateTime date;

    private FindUserDTO responsibleWorker;

    private FindStockDTO stock;

    private List<FindGoodDTO> goods;
}