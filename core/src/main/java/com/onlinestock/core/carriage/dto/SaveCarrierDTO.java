package com.onlinestock.core.carriage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.bridge.IMessage;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCarrierDTO {

    @NotBlank(message = "Name is required field")
    @Size(max = 100, message = "Name can not contain more than 100 symbols")
    private String name;

    @NotNull(message ="Company id is required")
    private Long companyId;

}
