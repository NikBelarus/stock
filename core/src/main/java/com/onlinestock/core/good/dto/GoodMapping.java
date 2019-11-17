package com.onlinestock.core.good.dto;

import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.carriage.repository.CarrierRepository;
import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.consignment.repository.ConsignmentNoteRepository;
import com.onlinestock.core.cancellation.CancellationAct;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.cancellation.repository.CancellationActRepository;
import com.onlinestock.core.inconsisency.InconsistencyAct;
import com.onlinestock.core.inconsisency.repository.InconsistencyActRepository;
import com.onlinestock.core.stockcell.StockCell;
import com.onlinestock.core.stockcell.repository.StockCellRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GoodMapping extends MainAppMapping {

    @Autowired
    CarrierRepository carrierRepository;

    @Autowired
    ConsignmentNoteRepository consignmentRepository;

    @Autowired
    InconsistencyActRepository inconsistencyRepository;

    @Autowired
    CancellationActRepository cancellationRepository;

    @Autowired
    StockCellRepository cellRepository;

    public GoodMapping() {
        modelMapper.createTypeMap(Good.class, SaveGoodDTO.class);
        modelMapper.createTypeMap(SaveGoodDTO.class, Good.class)
                .addMappings(mapping -> mapping.skip(Good::setCarrier))
                .addMappings(mapping -> mapping.skip(Good::setInputNote))
                .addMappings(mapping -> mapping.skip(Good::setOutputNote))
                .addMappings(mapping -> mapping.skip(Good :: setId))
                .setPreConverter(context -> {
                    Carrier carrier = carrierRepository.findById(context.getSource().getCarrierId()).orElse(null);
                    context.getDestination().setCarrier(carrier);
                    if(context.getSource().getInputConsignmentId() != null){
                        ConsignmentNote note = consignmentRepository
                                .findById(context.getSource().getInputConsignmentId()).orElse(null);
                        context.getDestination().setInputNote(note);
                    }
                    if(context.getSource().getOutputConsignmentId()!= null){
                        ConsignmentNote outputNote = consignmentRepository
                                .findById(context.getSource().getOutputConsignmentId()).orElse(null);
                        context.getDestination().setOutputNote(outputNote);
                    }
                    if(context.getSource().getInconsistencyActId()!= null){
                        InconsistencyAct inconsistencyAct = inconsistencyRepository
                                .findById(context.getSource().getInconsistencyActId()).orElse(null);
                        context.getDestination().setInconsistencyAct(inconsistencyAct);
                    }
                    if(context.getSource().getCancellationActId()!= null){
                        CancellationAct cancellationAct = cancellationRepository.findById(context.getSource().getCancellationActId()).orElse(null);
                        context.getDestination().setCancellationAct(cancellationAct);
                    }
                    if(context.getSource().getStockCellId() != null){
                        StockCell cell = cellRepository.findById(context.getSource().getStockCellId()).orElse(null);
                        context.getDestination().setStockCell(cell);
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(Good.class, FindGoodDTO.class)
                .addMappings(mapping -> mapping.skip(FindGoodDTO::setCarrierId))
                .setPreConverter(context -> {
                    Good source = context.getSource();
                    context.getDestination().setCarrierId(source.getCarrier().getId());
                    if (source.getInputNote() != null) {
                        context.getDestination().setInputConsignmentId(context.getSource().getInputNote().getId());
                    }
                    if(source.getOutputNote() !=  null) {
                        context.getDestination().setOutputConsignmentId(context.getSource().getOutputNote().getId());
                    }
                    if(source.getCancellationAct() != null){
                        context.getDestination().setCancellationActId(source.getCancellationAct().getId());
                    }
                    if(source.getInconsistencyAct() != null){
                        context.getDestination().setInconsistencyActId(source.getInconsistencyAct().getId());
                    }
                    return context.getDestination();
                });
        modelMapper.createTypeMap(FindGoodDTO.class, Good.class);
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
