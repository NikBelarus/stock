package com.onlinestock.core.payment.service;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.payment.dto.PriceListDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.validation.annotation.Validated;

@Validated
public interface PricelistService {

    PriceListDTO findById(Long id) throws ChangeSetPersister.NotFoundException;

    ApiResponse update(PriceListDTO priceListDTO) throws ChangeSetPersister.NotFoundException;
}
