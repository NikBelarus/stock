package com.onlinestock.webapp.security.authentication.jwt;

import com.onlinestock.core.user.dto.FindUserDTO;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class JwtAuthenticationResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private String message;
    private FindUserDTO user;


    public JwtAuthenticationResponse(String accessToken, FindUserDTO user) {
        this.accessToken = accessToken;
        this.user = user;
        log.info("Set token " + accessToken + " for user " + user);
    }

    public JwtAuthenticationResponse(String accessToken, FindUserDTO user, String message){
        this.accessToken = accessToken;
        this.user = user;
        this.message = message;
    }
}
