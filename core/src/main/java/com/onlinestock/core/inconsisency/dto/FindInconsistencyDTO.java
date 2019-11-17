package com.onlinestock.core.inconsisency.dto;

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
public class FindInconsistencyDTO {

    private Long id;

    private LocalDateTime date;

    private FindDriverDTO driver;

    private FindUserDTO user;

    private List<FindGoodDTO> goods;
}
