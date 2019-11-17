package com.onlinestock.core.dailystatistics.service.impl;

import com.onlinestock.core.dailystatistics.DailyStatistics;
import com.onlinestock.core.dailystatistics.QDailyStatistics;

import com.onlinestock.core.dailystatistics.dto.DailyStatisticsMapping;
import com.onlinestock.core.dailystatistics.dto.FindDailyStatisticsDTO;
import com.onlinestock.core.dailystatistics.repository.DailyStatisticsRepository;
import com.onlinestock.core.dailystatistics.service.DailyStatisticsService;
import com.querydsl.core.BooleanBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Iterator;

@Slf4j
@Service
public class DailyStatisticsServiceImpl implements DailyStatisticsService {

    @Autowired
    DailyStatisticsRepository dailyStatisticsRepository;

    @Autowired
    DailyStatisticsMapping dailyStatisticsMapping;

    @Override
    @Transactional
    public void create(DailyStatistics dailyStatistics) {
        dailyStatisticsRepository.save(dailyStatistics);
    }

    @Override
    @Transactional(readOnly = true)
    public Iterator<DailyStatistics> findIncomeById(Long id, LocalDate start, LocalDate finish){
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QDailyStatistics.dailyStatistics.company.id.eq(id)).and(QDailyStatistics.dailyStatistics.date.between(start, finish));
        return dailyStatisticsRepository.findAll(booleanBuilder).iterator();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FindDailyStatisticsDTO> findAllById(Long id, LocalDate start, LocalDate finish, Pageable pageable){
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QDailyStatistics.dailyStatistics.company.id.eq(id)).and(QDailyStatistics.dailyStatistics.date.between(start, finish));
        Page<DailyStatistics> stats = dailyStatisticsRepository.findAll(booleanBuilder, pageable);
        return stats.map(stat -> dailyStatisticsMapping.getMapper().map(stat, FindDailyStatisticsDTO.class));
    }
}
