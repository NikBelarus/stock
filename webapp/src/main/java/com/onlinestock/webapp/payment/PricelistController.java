package com.onlinestock.webapp.payment;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.payment.dto.PriceListDTO;
import com.onlinestock.core.payment.service.impl.PricelistServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pricelist")
public class PricelistController {

    @Autowired
    private PricelistServiceImpl pricelistService;

    @GetMapping("{id}")
    public PriceListDTO getPricelist(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return pricelistService.findById(id);
    }

    @PutMapping
    public ApiResponse updatePricelist(@RequestBody PriceListDTO priceListDTO) throws ChangeSetPersister.NotFoundException {
        return pricelistService.update(priceListDTO);
    }

}
