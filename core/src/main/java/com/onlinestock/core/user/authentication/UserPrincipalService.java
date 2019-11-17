package com.onlinestock.core.user.authentication;

import com.onlinestock.core.user.User;
import com.onlinestock.core.user.dto.UserMapping;
import com.onlinestock.core.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserPrincipalService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapping userMapping;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username: " + email)
                );
        log.info("Loaded user with id " + user.getId() + " by username " + email);
        return userMapping.getMapper().map(user, UserPrincipal.class);
    }

    @Transactional
    public UserDetails loadByUserId(Long id){
        User user = userRepository.getByIdAndDeletedFalse(id)
                .orElseThrow(()->
                        new UsernameNotFoundException("User not found with id: " + id)
                );
        log.info("Loaded user by id " + user.getId());
        return userMapping.getMapper().map(user, UserPrincipal.class);
    }
}
