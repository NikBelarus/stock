package com.onlinestock.core.cancellation.dto;

import com.onlinestock.core.good.dto.SaveGoodDTO;
import com.onlinestock.core.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCancellationActDTO {

    @NotNull(message = "Date is required!")
    @Past(message = "Bad format of date")
    private LocalDateTime date;

    @NotNull(message = "Responsible worker id is required!")
    @Digits(integer = 20, fraction = 0, message = "Manager id must contain less than 20 digits")
    private Long controllerId;

    List<SaveGoodDTO> goods;
}
