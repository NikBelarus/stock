package com.onlinestock.core.consignment.repository;

import com.onlinestock.core.consignment.ConsignmentNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsignmentNoteRepository extends JpaRepository<ConsignmentNote, Long>, QuerydslPredicateExecutor<ConsignmentNote> {

    Optional<ConsignmentNote> getByIdAndDeletedFalse(Long id);

    Long countByCompanyId(Long companyId);

    List<ConsignmentNote> getByCompanyIdAndDeletedFalse(Long id);
}