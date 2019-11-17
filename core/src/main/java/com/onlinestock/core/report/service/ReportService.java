package com.onlinestock.core.report.service;

import org.springframework.validation.annotation.Validated;

import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;

@Validated
public interface ReportService {

    void download(OutputStream os, long id, LocalDate start, LocalDate finish) throws IOException;
}
