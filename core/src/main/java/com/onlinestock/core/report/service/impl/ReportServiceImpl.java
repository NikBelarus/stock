package com.onlinestock.core.report.service.impl;

import com.onlinestock.core.dailystatistics.DailyStatistics;
import com.onlinestock.core.dailystatistics.service.DailyStatisticsService;
import com.onlinestock.core.report.dto.IncomeAndConsumptionDTO;
import com.onlinestock.core.report.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Iterator;


@Slf4j
@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    DailyStatisticsService dailyStatisticsService;

    @Override
    public void download(OutputStream os, long id, LocalDate start, LocalDate finish) throws IOException {
        try(Workbook workbook = new HSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            //создаём отчёт
            generateReport(workbook, start, finish, id);
            //помещаем наш workbook в выходной файл
            workbook.write(out);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(out.toByteArray());
            int read;
            byte[] bytes = new byte[1024];
            while ((read = byteArrayInputStream.read(bytes)) != -1) {
                os.write(bytes, 0, read);
            }
            os.flush();
            os.close();
            log.info("Successful download of attachment");
        }
    }

    private void generateReport(Workbook workbook, LocalDate start, LocalDate finish, long id){
        Sheet sheet = workbook.createSheet();
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0);
        headerRow.createCell(1).setCellValue("Нач. дата");
        headerRow.createCell(2).setCellValue("Кон. дата");
        headerRow.createCell(3).setCellValue("Расход");
        headerRow.createCell(4).setCellValue("Доход");
        headerRow.createCell(5).setCellValue("Прибыль");
        int n = (int)Math.ceil((finish.toEpochDay() - start.toEpochDay() + 1.0) / 7.0);
        for(int i = 1; i <= n; i++) {
            Row row = sheet.createRow(i);
            row.createCell(0).setCellValue("Неделя " + i);
            row.createCell(1).setCellValue(start.toString());
            if(i != n) {
                row.createCell(2).setCellValue(start.plusDays(6).toString());
            }
            else {
                row.createCell(2).setCellValue(finish.toString());
            }
            IncomeAndConsumptionDTO incomeAndConsumptionDTO = countStatistics(start, finish, id);
            row.createCell(3).setCellValue(incomeAndConsumptionDTO.getConsumption().toString());
            row.createCell(4).setCellValue(incomeAndConsumptionDTO.getIncome().toString());
            row.createCell(5).setCellValue(incomeAndConsumptionDTO.getIncome().subtract(incomeAndConsumptionDTO.getConsumption()).toString());
            start = start.plusWeeks(1);
        }
    }

    private IncomeAndConsumptionDTO countStatistics(LocalDate start, LocalDate finish, long id){
        Iterator<DailyStatistics> dailyIncomeList = dailyStatisticsService.findIncomeById(id, start, finish);
        BigDecimal sumIncome = new BigDecimal(0);
        BigDecimal sumConsumption = new BigDecimal(0);
        while (dailyIncomeList.hasNext()){
            DailyStatistics dailyStatistics = dailyIncomeList.next();
            sumIncome = sumIncome.add(dailyStatistics.getIncome());
            sumConsumption = sumConsumption.add(dailyStatistics.getConsumption());
        }
        return new IncomeAndConsumptionDTO(sumIncome, sumConsumption);
    }
}
