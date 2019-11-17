package com.onlinestock.webapp.common;

import com.onlinestock.core.common.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;

@ControllerAdvice
@Slf4j
class GlobalControllerExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND) // 404
    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    public String handleNotFound(ChangeSetPersister.NotFoundException e) {
        log.error(e.getMessage(), e);
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST) // 400
    @ExceptionHandler(RuntimeException.class)
    public ApiResponse handleBadRequest(RuntimeException e) {
        log.error(e.getMessage(), e);
        return new ApiResponse(false, e.getMessage(), null);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN) // 403
    @ExceptionHandler(AccessDeniedException.class)
    public String handleForbidden(AccessDeniedException e) {
        log.error(e.getMessage(), e);
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) // 500
    @ExceptionHandler(IOException.class)
    public String handleInternalServerError(IOException e) {
        log.error(e.getMessage(), e);
        return e.getMessage();
    }
}