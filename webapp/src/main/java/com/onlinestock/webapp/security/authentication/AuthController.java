package com.onlinestock.webapp.security.authentication;

import com.onlinestock.core.company.service.impl.CompanyServiceImpl;
import com.onlinestock.core.user.Role;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.LoginUserDTO;
import com.onlinestock.webapp.security.authentication.jwt.JwtProvider;
import com.onlinestock.webapp.security.authentication.jwt.JwtAuthenticationResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CompanyServiceImpl companyService;

    @Autowired
    JwtProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginUserDTO loginUserDto) {
        log.info("Request authenticate user with email " + loginUserDto.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        FindUserDTO findUserDTO = new ModelMapper().map(userPrincipal, FindUserDTO.class);
        Role userRole = findUserDTO.getRole();
        if (userRole.equals(Role.SYSTEM_ADMIN) ||
                companyService.checkPayment(userPrincipal.getCompanyId())) {
            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, findUserDTO));
        } else {
            if(userRole.equals(Role.STOCK_OWNER)){
                String jwt = tokenProvider.generateToken(authentication);
                Long days = companyService.getLeftPaidDays(findUserDTO.getCompanyId());
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, findUserDTO, days + " left "));
            }
            return ResponseEntity.ok(new NeedPaymentResponse());
        }


    }
}
