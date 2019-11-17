package com.onlinestock.core.common;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import static org.modelmapper.config.Configuration.AccessLevel.PRIVATE;

@Component
public class MainAppMapping {
    protected ModelMapper modelMapper = new ModelMapper();

    public MainAppMapping(){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT).setFieldMatchingEnabled(true).setFieldAccessLevel(PRIVATE).setAmbiguityIgnored(true);
    }
}
