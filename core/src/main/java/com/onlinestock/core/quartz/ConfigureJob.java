package com.onlinestock.core.quartz;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigureJob {
    @Bean
    public JobDetail paymentVerificationJobDetails() {
        return JobBuilder.newJob(PaymentVerificationJob.class).withIdentity("paymentVerificationJob").storeDurably().build();
    }

    @Bean
    public Trigger paymentVerificationJobTrigger(JobDetail paymentVerificationJobDetails) {
        return TriggerBuilder.newTrigger().forJob(paymentVerificationJobDetails)
                .withIdentity("paymentVerificationJobTrigger")
                .withSchedule(CronScheduleBuilder.dailyAtHourAndMinute(9, 0))
//                .withSchedule(CronScheduleBuilder.cronSchedule("0/1 * * ? * * *"))
                .build();
    }

    @Bean
    public JobDetail dailyStatisticsJobDetails() {
        return JobBuilder.newJob(DailyStatisticsJob.class).withIdentity("dailyStatisticsJob").storeDurably().build();
    }

    @Bean
    public Trigger dailyStatisticsJobTrigger(JobDetail dailyStatisticsJobDetails) {
        return TriggerBuilder.newTrigger().forJob(dailyStatisticsJobDetails)
                .withIdentity("dailyStatisticsJobTrigger")
                .withSchedule(CronScheduleBuilder.dailyAtHourAndMinute(9, 0))
                .build();
    }
}
