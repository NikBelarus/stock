package com.onlinestock.webapp.driver;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.driver.dto.FindDriverDTO;
import com.onlinestock.core.driver.dto.SaveDriverDTO;
import com.onlinestock.core.driver.service.impl.DriverServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/drivers")
public class DriverController {

    @Autowired
    private DriverServiceImpl driverService;

    @GetMapping
    public Page<FindDriverDTO> getDriversByCarrierId(@RequestParam(defaultValue = "null") Long carrier_id, Pageable pageable){
        return driverService.getCarrierDrivers(carrier_id, pageable);
    }

    @PostMapping
    public ApiResponse create(@RequestBody SaveDriverDTO saveDriverDTO){
        return driverService.create(saveDriverDTO);
    }
}
