package com.onlinestock.core.user.repository;

import com.onlinestock.core.user.Role;
import com.onlinestock.core.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User> {

    Optional<User> findByEmailAndDeletedFalse(String email);

    Optional<User> getByIdAndDeletedFalse(Long id);

    User getByCompanyIdAndRole(Long id, Role role);

    boolean existsByEmailAndDeletedFalse(String email);

    boolean existsByEmailAndIdIsNotAndDeletedFalse(String email, Long id);

    Long countByStockIdAndDeletedFalse(Long id);

    List<User> findAllByStockId(Long id);
}
