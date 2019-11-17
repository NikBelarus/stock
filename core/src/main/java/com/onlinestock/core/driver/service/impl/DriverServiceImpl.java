package com.onlinestock.core.driver.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.driver.Driver;
import com.onlinestock.core.driver.dto.DriverMapping;
import com.onlinestock.core.driver.dto.FindDriverDTO;
import com.onlinestock.core.driver.dto.SaveDriverDTO;
import com.onlinestock.core.driver.repository.DriverRepository;
import com.onlinestock.core.driver.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepository driverRepository;

    @Autowired
    DriverMapping driverMapping;

    @Override
    @Transactional(readOnly = true)
    public FindDriverDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        return driverMapping.getMapper().map(findById(id), FindDriverDTO.class);
    }

    @Override
    @Transactional
    public ApiResponse create(SaveDriverDTO saveDriverDTO) {
        Driver driver = driverMapping.getMapper().map(saveDriverDTO, Driver.class);
        if (driverRepository.existsByPassportNoAndDeletedFalse(saveDriverDTO.getPassportNo())) {
            return new ApiResponse(false, "The driver with such passport is already exists.", null);
        }
        driverRepository.save(driver);
        return new ApiResponse(true, "The driver id created", driverMapping.getMapper().map(driver, FindDriverDTO.class));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Driver> driver = driverRepository.getByIdAndDeletedFalse(id);
        driver.ifPresent(driver1 -> driver1.setDeleted(true));
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveDriverDTO saveDriverDTO) throws ChangeSetPersister.NotFoundException {
        Driver oldDriver = findById(id);
        if(driverRepository.existsByPassportNoAndIdIsNotAndDeletedFalse(saveDriverDTO.getPassportNo(), id)){
            return new ApiResponse(false, "The driver with such passport is already exists.", null);
        }
        driverMapping.getMapper().map(saveDriverDTO, oldDriver);
        return new ApiResponse(true, "The driver is updated", driverMapping.getMapper().map(oldDriver, FindDriverDTO.class));
    }

    @Transactional(readOnly = true)
    public Page<FindDriverDTO> getCarrierDrivers(Long carrierId, Pageable pageable) {
        Page<Driver> drivers = driverRepository.getByCarrierIdAndDeletedFalse(carrierId, pageable);
        return drivers.map(driver -> driverMapping.getMapper().map(driver, FindDriverDTO.class));
    }

    private Driver findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Driver> driver = driverRepository.getByIdAndDeletedFalse(id);
        if (driver.isPresent()) {
            return driver.get();
        }
        throw new ChangeSetPersister.NotFoundException();
    }
}
