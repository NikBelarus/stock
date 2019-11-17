package com.onlinestock.core.inconsisency.dto;

import com.onlinestock.core.good.dto.SaveGoodDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveInconsistencyDTO {

    private LocalDateTime date;

    private Long driverId;

    private Long userId;

    private List<SaveGoodDTO> goods;

}
