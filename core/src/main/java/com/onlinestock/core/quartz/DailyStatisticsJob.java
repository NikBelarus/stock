package com.onlinestock.core.quartz;

import com.onlinestock.core.company.Company;
import com.onlinestock.core.company.service.impl.CompanyServiceImpl;
import com.onlinestock.core.dailystatistics.DailyStatistics;
import com.onlinestock.core.dailystatistics.service.DailyStatisticsService;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.good.service.impl.GoodServiceImpl;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.stock.service.impl.StockServiceImpl;
import com.onlinestock.core.stockcell.StockCell;
import com.onlinestock.core.stockcell.service.impl.StockCellServiceImpl;
import com.onlinestock.core.user.User;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class DailyStatisticsJob implements Job {

    @Autowired
    CompanyServiceImpl companyService;

    @Autowired
    StockServiceImpl stockService;

    @Autowired
    StockCellServiceImpl stockCellService;

    @Autowired
    GoodServiceImpl goodService;

    @Autowired
    DailyStatisticsService dailyStatisticsService;

    @Override
    @Transactional
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        List<Company> companies = companyService.findAll();
        for(int i = 0; i < companies.size(); i++){
            DailyStatistics dailyStatistics = new DailyStatistics();
            dailyStatistics.setCompany(companies.get(i));
            dailyStatistics.setDate(LocalDate.now());
            BigDecimal summaryIncome = new BigDecimal(0);
            //вычисляем доход компании за предстоящий день
            List<Stock> stocks = stockService.getByCompanyId(companies.get(i).getId());
            for(int j = 0; j < stocks.size(); j++){
                List<StockCell> stockCells = stockCellService.getByStockId(stocks.get(j).getId());
                for(int k = 0; k < stockCells.size(); k++){
                    List<Good> goods = goodService.findAllByStockCellId(stockCells.get(k).getId());
                    BigDecimal summaryVolume = new BigDecimal(0);
                    for(int c = 0; c < goods.size(); c++){
                        summaryVolume = summaryVolume.add(goods.get(c).getVolume().multiply(new BigDecimal(goods.get(c).getCount())));
                    }
                    summaryIncome = summaryIncome.add(summaryVolume.multiply(stockCells.get(k).getCellPrice()).divide(stockCells.get(k).getVolume()));
                }
            }
            dailyStatistics.setIncome(summaryIncome);
            //и расход
            List<User> users = companies.get(i).getUsers();
            BigDecimal summaryConsumption = new BigDecimal(0);
            for(int j = 0; j < users.size(); j++){
                summaryConsumption = summaryConsumption.add(users.get(j).getSalary());
            }
            dailyStatistics.setConsumption(summaryConsumption);
            dailyStatisticsService.create(dailyStatistics);
        }
    }
}
