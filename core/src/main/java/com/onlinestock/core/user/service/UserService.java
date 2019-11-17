package com.onlinestock.core.user.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.SaveUserDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface UserService {
    FindUserDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid SaveUserDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveUserDTO saveDto) throws ChangeSetPersister.NotFoundException;
}
