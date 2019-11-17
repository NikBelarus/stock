package com.onlinestock.core.dailystatistics.service;

import com.onlinestock.core.dailystatistics.DailyStatistics;
import com.onlinestock.core.dailystatistics.dto.FindDailyStatisticsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Iterator;


public interface DailyStatisticsService {

    void create(DailyStatistics dailyStatistics);

    Iterator<DailyStatistics> findIncomeById(Long id, LocalDate start, LocalDate finish);

    Page<FindDailyStatisticsDTO> findAllById(Long id, LocalDate start, LocalDate finish, Pageable pageable);
}
