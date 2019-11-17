package com.onlinestock.webapp.report;

import com.onlinestock.core.dailystatistics.dto.FindDailyStatisticsDTO;
import com.onlinestock.core.dailystatistics.service.DailyStatisticsService;
import com.onlinestock.core.report.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Enumeration;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/report")
public class ReportController {

    @Autowired
    ReportService reportService;

    @Autowired
    DailyStatisticsService dailyStatisticsService;

    @PostMapping("{id}")
    public void download(@PathVariable long id, HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.info("Enter ReportController to download the report for company with id = " + id);
        LocalDate start = LocalDate.parse(request.getParameter("start"));
        LocalDate finish = LocalDate.parse(request.getParameter("finish"));
        log.info("Start day: " + start + "; Finish day: " + finish);
        response.setHeader("Content-disposition", "attachment; filename=report.xls");
        response.setContentType("application/vnd.ms-excel");
        reportService.download(response.getOutputStream(), id, start, finish);
    }

    @GetMapping("/stats")
    public Page<FindDailyStatisticsDTO> findAllById(HttpServletRequest request, Pageable pageable){
        long id = Long.parseLong(request.getHeader("companyId"));
        LocalDate sDate = LocalDate.parse(request.getHeader("startDate"));
        LocalDate lDate = LocalDate.parse(request.getHeader("lastDate"));
        return dailyStatisticsService.findAllById(id, sDate, lDate, pageable);
    }
}