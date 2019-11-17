package com.onlinestock.core.user.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.user.QUser;
import com.onlinestock.core.user.Role;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.SaveUserDTO;
import com.onlinestock.core.user.dto.UserMapping;
import com.onlinestock.core.user.repository.UserRepository;
import com.onlinestock.core.user.service.UserService;
import com.querydsl.core.BooleanBuilder;
import liquibase.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapping userMapping;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PreAuthorize("hasAuthority('STOCK_ADMIN') or hasAuthority('STOCK_OWNER')")
    @Transactional(readOnly = true)
    public Page<FindUserDTO> ByStockId(Long stockId, Pageable pageable) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long companyId = userPrincipal.getCompanyId();
        if (stockId != null && !stockRepository.getByIdAndCompanyIdAndDeletedFalse(stockId, companyId).isPresent()) {
            log.error("Cannot get that stock info : user with id " + userPrincipal.getId() + " cannot get that stock info");
            throw new AccessDeniedException("Yuo cannot get that stock info");
        }
        Page<User> users;
        if (stockId != null) {
            users = userRepository.findAll(buildWhereStockId(stockId), pageable);
            log.info("Found page of users with number of elements " + users.getNumberOfElements() + " for stock id " + stockId);
        } else {
            users = userRepository.findAll(buildWhereCompanyId(companyId), pageable);
            log.info("Found page of users with number of elements " + users.getNumberOfElements() + " for company id " + companyId);
        }
        return users.map(user -> userMapping.getMapper().map(user, FindUserDTO.class));
    }

    @Override
    @Transactional(readOnly = true)
    public FindUserDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        User user = findById(id);
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long companyId = userPrincipal.getCompanyId();
        if (!user.getCompany().getId().equals(companyId)) {
            throw new AccessDeniedException("You cannot get that user");
        }
        log.info("Found user by with " + id);
        return userMapping.getMapper().map(findById(id), FindUserDTO.class);
    }

    @Override
    @PreAuthorize("hasAuthority('STOCK_ADMIN') or hasAuthority('SYSTEM_ADMIN')")
    @Transactional
    public ApiResponse create(SaveUserDTO saveUserDTO) {
        if (existsByEmail(saveUserDTO.getEmail())) {
            log.info("Cannot create user: User with such email " + saveUserDTO.getEmail() + " is already exists");
            throw new RuntimeException("The user with such email is already exists.");
        }
        if (!checkPassword(saveUserDTO)) {
            log.info("Confirm password doesn't match password " + saveUserDTO.getPassword());
            throw new RuntimeException("Confirm password doesn't match password.");
        }
        User user = userMapping.getMapper().map(saveUserDTO, User.class);
        if (saveUserDTO.getRole().equals(Role.STOCK_OWNER) || saveUserDTO.getRole().equals(Role.STOCK_ADMIN)) {
            if (!SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(Role.SYSTEM_ADMIN)) {
                log.error("Cannot create user: Only SYSTEM ADMINISTRATOR can create such user");
                throw new AccessDeniedException("You cannot create that user");
            }
            userRepository.save(user);
            return new ApiResponse(true, "The user is created.", userMapping.getMapper().map(user, FindUserDTO.class));
        }
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userPrincipal.getCompanyId().equals(user.getCompany().getId())) {
            throw new AccessDeniedException("You cannot create that user");
        }
        userRepository.save(user);
        log.info("User with email " + saveUserDTO.getEmail() + " was created");
        return new ApiResponse(true, "The user is created.", userMapping.getMapper().map(user, FindUserDTO.class));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<User> user = userRepository.getByIdAndDeletedFalse(id);
        if (user.isPresent()) {
            if (user.get().getRole().equals(Role.STOCK_OWNER) &&
                    !SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(Role.SYSTEM_ADMIN)) {
                log.error("Cannot delete user: Only SYSTEM ADMINISTRATOR can delete STOCK_OWNER user");
                throw new AccessDeniedException("Only SYSTEM ADMINISTRATOR can delete STOCK_OWNER user");
            }
            if (user.get().getRole().equals(Role.STOCK_ADMIN) &&
                    !SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(Role.SYSTEM_ADMIN)) {
                log.error("Cannot delete user: Only SYSTEM ADMINISTRATOR can delete STOCK_ADMIN user");
                throw new AccessDeniedException("Only SYSTEM ADMINISTRATOR can delete STOCK_ADMIN user");
            }
            UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!userPrincipal.getCompanyId().equals(user.get().getCompany().getId())) {
                throw new AccessDeniedException("You cannot delete that user");
            }
            user.get().setDeleted(true);
            log.info("User with id " + id + " was deleted");
        }
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveUserDTO saveUserDTO) throws ChangeSetPersister.NotFoundException {
        User oldUser = findById(id);
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userPrincipal.getCompanyId().equals(oldUser.getCompany().getId())) {
            throw new AccessDeniedException("You cannot update that user");
        }
        if (!checkPassword(saveUserDTO)) {
            log.info("Cannot update user: Confirm password doesn't match password " + saveUserDTO.getPassword());
            return new ApiResponse(false, "Confirm password doesn't match password.", null);
        }
        if (!existsByEmailAndIdIsNot(saveUserDTO.getEmail(), id)) {
            userMapping.getMapper().map(saveUserDTO, oldUser);
            log.info("User with id " + id + " was updated");
            return new ApiResponse(true, "The user is updated.", userMapping.getMapper().map(oldUser, FindUserDTO.class));
        }
        log.info("Cannot update user: user with such email " + saveUserDTO.getEmail() + " is already exists");
        return new ApiResponse(false, "The user with such email is already exists.", null);
    }

    private User findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<User> user = userRepository.getByIdAndDeletedFalse(id);
        if (user.isPresent()) {
            UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!userPrincipal.getCompanyId().equals(user.get().getCompany().getId())) {
                throw new AccessDeniedException("You cannot update that user");
            }
            return user.get();
        }
        log.error("Cannot find user with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private BooleanBuilder buildWhere(String name) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QUser.user.deleted.isFalse());
        if (StringUtils.isNotEmpty(name)) {
            booleanBuilder.and(QUser.user.firstName.startsWithIgnoreCase(name));
        }
        return booleanBuilder;
    }

    private boolean existsByEmail(String email) {
        return userRepository.existsByEmailAndDeletedFalse(email);
    }

    private boolean existsByEmailAndIdIsNot(String email, Long id) {
        return userRepository.existsByEmailAndIdIsNotAndDeletedFalse(email, id);
    }

    private boolean checkPassword(SaveUserDTO saveUserDTO) {
        if (saveUserDTO.getPassword().equals(saveUserDTO.getConfirmPassword())) {
            saveUserDTO.setPassword(passwordEncoder.encode(saveUserDTO.getPassword()));
            return true;
        }
        return false;
    }

    private BooleanBuilder buildWhereStockId(Long stockId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QUser.user.deleted.isFalse())
                .and(QUser.user.stock.id.eq(stockId));
        return booleanBuilder;
    }

    private BooleanBuilder buildWhereCompanyId(Long companyId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QUser.user.deleted.isFalse())
                .and(QUser.user.company.id.eq(companyId));
        return booleanBuilder;
    }
}