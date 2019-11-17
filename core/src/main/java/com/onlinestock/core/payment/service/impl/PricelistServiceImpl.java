package com.onlinestock.core.payment.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.payment.Pricelist;
import com.onlinestock.core.payment.dto.PriceListDTO;
import com.onlinestock.core.payment.repository.PricelistRepository;
import com.onlinestock.core.payment.service.PricelistService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PricelistServiceImpl implements PricelistService {

    @Autowired
    PricelistRepository pricelistRepository;

    ModelMapper modelMapper = new ModelMapper();

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Override
    @Transactional(readOnly = true)
    public PriceListDTO findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Pricelist> optionalPricelist = pricelistRepository.findById(id);
        if (optionalPricelist.isPresent()) {
            return modelMapper.map(pricelistRepository.findById(id), PriceListDTO.class);
        } else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Override
    @Transactional
    public ApiResponse update(PriceListDTO priceListDTO) throws ChangeSetPersister.NotFoundException {
        Optional<Pricelist> optionalPricelist = pricelistRepository.getByIdAndDeletedFalse(priceListDTO.getId());
        if (optionalPricelist.isPresent()) {
            Pricelist oldPriceList = optionalPricelist.get();
            modelMapper.map(priceListDTO, oldPriceList);
            return new ApiResponse(true, "Pricelist changed", modelMapper.map(oldPriceList, PriceListDTO.class));
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }

    }
}
