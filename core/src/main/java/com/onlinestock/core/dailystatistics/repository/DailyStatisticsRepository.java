package com.onlinestock.core.dailystatistics.repository;

import com.onlinestock.core.dailystatistics.DailyStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyStatisticsRepository extends JpaRepository<DailyStatistics, Long>, QuerydslPredicateExecutor<DailyStatistics> {
}
