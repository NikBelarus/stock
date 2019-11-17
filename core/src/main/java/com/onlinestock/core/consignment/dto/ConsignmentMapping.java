package com.onlinestock.core.consignment.dto;

import com.onlinestock.core.carriage.repository.CarrierRepository;
import com.onlinestock.core.company.repository.CompanyRepository;
import com.onlinestock.core.consignment.repository.ConsignmentNoteRepository;
import com.onlinestock.core.driver.repository.DriverRepository;
import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ConsignmentMapping extends MainAppMapping {

    @Autowired
    private  CompanyRepository companyRepository;

    @Autowired
    private CarrierRepository carrierRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private ConsignmentNoteRepository consignmentRepository;

    public ConsignmentMapping(){
        modelMapper.createTypeMap(ConsignmentNote.class, SaveConsignmentDTO.class)
                .addMappings(mapping -> mapping.skip(SaveConsignmentDTO::setCarrierId))
                .addMappings(mapping -> mapping.skip(SaveConsignmentDTO::setStockId))
                .addMappings(mapping -> mapping.skip(SaveConsignmentDTO::setDriverId))
                .setPreConverter(context -> {
                    context.getDestination().setCarrierId(context.getSource().getCarrier().getId());
                    context.getDestination().setStockId(context.getSource().getStock().getId());
                    context.getDestination().setDriverId(context.getSource().getDriver().getId());
                    return context.getDestination();
                });
        modelMapper.createTypeMap(SaveConsignmentDTO.class, ConsignmentNote.class)
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setCarrier))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setStock))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setDispatcher))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setManager))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setController))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setDriver))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setId))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setNumberInCompany))
                .addMappings(mapping -> mapping.skip(ConsignmentNote ::setInputGoods))
                .addMappings(mapping -> mapping.skip(ConsignmentNote::setCompany))
                .setPreConverter(context -> {
                    SaveConsignmentDTO saveDTO = context.getSource();
                    context.getDestination().setCarrier(carrierRepository.findById(saveDTO.getCarrierId()).orElse(null));
                    context.getDestination().setStock(stockRepository.findById(saveDTO.getStockId()).orElse(null));
                    if(saveDTO.getDispatcherId() != null){
                        context.getDestination().setDispatcher(userRepository.findById(saveDTO.getDispatcherId()).orElse(null));
                    }
                    if(saveDTO.getManagerId() != null){
                        context.getDestination().setManager(userRepository.findById(saveDTO.getManagerId()).orElse(null));
                    }
                    if(saveDTO.getControllerId() != null){
                        context.getDestination().setDispatcher(userRepository.findById(saveDTO.getControllerId()).orElse(null));
                    }
                    context.getDestination().setCompany(companyRepository.findById(saveDTO.getCompanyId()).orElse(null));
                    if(saveDTO.getDriverId() != null) {
                        context.getDestination().setDriver(driverRepository.findById(saveDTO.getDriverId()).orElse(null));
                    }
                    context.getDestination().setNumberInCompany(consignmentRepository.countByCompanyId(saveDTO.getCompanyId()) + 1);
                    return context.getDestination();
                });
        modelMapper.createTypeMap(ConsignmentNote.class, FindConsignmentDTO.class);
        modelMapper.createTypeMap(ConsignmentNote.class, ShortConsignmentDTO.class)
                .addMappings(mapping -> mapping.skip(ShortConsignmentDTO::setDate))
                .setPreConverter(context ->{
                    ConsignmentNote note = context.getSource();
                    LocalDateTime date;
                    switch (note.getStatus()){
                        case REGISTERED:
                            date = note.getRegistrationDate();
                            break;
                        case REGISTRATION_COMPLETED:
                            date = note.getRegistrationCompletedDate();
                            break;
                        case VERIFICATION_COMPLETED:
                            date = note.getVerificationDate();
                            break;
                        default:
                            date = null;
                    }
                    context.getDestination().setDate(date);
                    return context.getDestination();
                });

    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
