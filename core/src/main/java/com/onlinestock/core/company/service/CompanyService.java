package com.onlinestock.core.company.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.company.dto.CompanyWithAdminAndOwnerDTO;
import com.onlinestock.core.company.dto.FindCompanyDTO;
import com.onlinestock.core.company.dto.SaveCompanyDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface CompanyService {
    FindCompanyDTO findOne(@NotNull Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse create(@Valid CompanyWithAdminAndOwnerDTO saveDto);

    void delete(@NotNull Long id);

    ApiResponse update(@NotNull Long id, @Valid SaveCompanyDTO saveDto) throws ChangeSetPersister.NotFoundException;
}
