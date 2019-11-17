package com.onlinestock.core.dailystatistics.dto;

import com.onlinestock.core.common.MainAppMapping;
import com.onlinestock.core.dailystatistics.DailyStatistics;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DailyStatisticsMapping extends MainAppMapping {

    public DailyStatisticsMapping(){
        modelMapper.createTypeMap(DailyStatistics.class, FindDailyStatisticsDTO.class)
                .addMappings(mapping -> mapping.skip(FindDailyStatisticsDTO::setCompanyId))
                .setPreConverter(context -> {
                    Long companyId = context.getSource().getCompany().getId();
                    context.getDestination().setCompanyId(companyId);
                    return context.getDestination();
                });
    }

    public ModelMapper getMapper() {
        return modelMapper;
    }
}
