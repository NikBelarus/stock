package com.onlinestock.webapp.user;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.SaveUserDTO;
import com.onlinestock.core.user.service.impl.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping
    public Page<FindUserDTO> find(@RequestParam(value = "stockId", required = false) Long stockId, Pageable pageable) {
        log.info("Request find page of users with stock id " + stockId + ", pageNumber " + pageable.getPageNumber() +
                ", size " + pageable.getPageSize());
        return userService.ByStockId(stockId, pageable);
    }

    @GetMapping("{id}")
    public FindUserDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find user with id " + id);
        return userService.findOne(id);
    }

    @PostMapping
    public ApiResponse create(@Valid @RequestBody SaveUserDTO saveUserDTO) {
        log.info("Request create user with email " + saveUserDTO.getEmail());
        return userService.create(saveUserDTO);
    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveUserDTO saveUserDTO) throws ChangeSetPersister.NotFoundException {
        log.info("Request update user with id " + id);
        return userService.update(id, saveUserDTO);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        log.info("Request delete user with id " + id);
        userService.delete(id);
    }
}