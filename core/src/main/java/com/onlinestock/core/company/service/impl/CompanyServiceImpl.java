package com.onlinestock.core.company.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.company.QCompany;
import com.onlinestock.core.company.dto.CompanyMapping;
import com.onlinestock.core.company.dto.CompanyWithAdminAndOwnerDTO;
import com.onlinestock.core.company.dto.ExpandedInfoCompanyDTO;
import com.onlinestock.core.company.dto.FindCompanyDTO;
import com.onlinestock.core.company.dto.SaveCompanyDTO;
import com.onlinestock.core.company.repository.CompanyRepository;
import com.onlinestock.core.payment.Pricelist;
import com.onlinestock.core.payment.dto.SaveCompanyPaymentDTO;
import com.onlinestock.core.stock.repository.StockRepository;
import com.onlinestock.core.user.QUser;
import com.onlinestock.core.user.Role;
import com.onlinestock.core.user.User;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.onlinestock.core.user.dto.FindUserDTO;
import com.onlinestock.core.user.dto.UserMapping;
import com.onlinestock.core.user.repository.UserRepository;
import com.onlinestock.core.company.service.CompanyService;
import com.onlinestock.core.user.service.impl.UserServiceImpl;
import com.querydsl.core.BooleanBuilder;
import liquibase.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyMapping companyMapping;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserServiceImpl userService;

    @Transactional(readOnly = true)
    @Override
    public FindCompanyDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        log.info("Found company with id " + id);
        return companyMapping.getMapper().map(findById(id), FindCompanyDTO.class);
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Override
    @Transactional
    public ApiResponse create(CompanyWithAdminAndOwnerDTO companyWithAdminAndOwnerDTO) {
        Company company = companyMapping.getMapper().map(companyWithAdminAndOwnerDTO.getCompany(), Company.class);
        Company save = companyRepository.save(company);
        log.info("Company with name " + company.getName() + " was created");
        companyWithAdminAndOwnerDTO.getAdmin().setCompanyId(save.getId());
        companyWithAdminAndOwnerDTO.getOwner().setCompanyId(save.getId());
        userService.create(companyWithAdminAndOwnerDTO.getAdmin());
        userService.create(companyWithAdminAndOwnerDTO.getOwner());
        return new ApiResponse(true, "The company with admin and owner is created.", null);
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Company> company = companyRepository.getByIdAndDeletedFalse(id);
        company.ifPresent(company1 -> company1.setDeleted(true));
        log.info("Company with id " + id + " was deleted");
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Override
    @Transactional
    public ApiResponse update(Long id, SaveCompanyDTO saveCompanyDto) throws ChangeSetPersister.NotFoundException {
        Company oldCompany = findById(id);
        if (!existsByNameAndIdIsNot(saveCompanyDto.getName(), id)) {
            companyMapping.getMapper().map(saveCompanyDto, oldCompany);
            log.info("Company with id " + id + " was updated");
            return new ApiResponse(true, "The company is updated.", companyMapping.getMapper().map(oldCompany, FindCompanyDTO.class));
        }
        log.info("Cannot update company: Company with such name " + saveCompanyDto.getName() + " is already exists");
        return new ApiResponse(false, "The company with such name is already exists.", null);
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Transactional(readOnly = true)
    public Page<FindCompanyDTO> findByName(String name, Pageable pageable) {
        Page<Company> companies = companyRepository.findAll(buildWhereName(name), pageable);
        log.info("Found companies page by name " + name + " with number of elements " + companies.getNumberOfElements());
        return companies.map(company -> companyMapping.getMapper().map(company, FindCompanyDTO.class));
    }

    @Transactional(readOnly = true)
    public List<Company> findAll() {
        List<Company> companies = companyRepository.getAllByDeletedFalse();
        log.info("Found " + companies.size() + " companies");
        return companies;
    }

    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    @Transactional(readOnly = true)
    public Page<ExpandedInfoCompanyDTO> getExpandedCompanies(Pageable pageable) {
        Page<Company> companies = companyRepository.findAll(pageable);
        log.info("Found expanded companies page with number of elements " + companies.getNumberOfElements());
        return companies.map(company -> {
            User owner = userRepository.findOne(buildWhereCompanyIdAndRole(company.getId(), Role.STOCK_OWNER)).orElse(null);
            User admin = userRepository.findOne(buildWhereCompanyIdAndRole(company.getId(), Role.STOCK_ADMIN)).orElse(null);
            UserMapping mapping = new UserMapping();
            return new ExpandedInfoCompanyDTO(company.getId(),
                    company.getName(),
                    mapping.getMapper().map(owner, FindUserDTO.class),
                    mapping.getMapper().map(admin, FindUserDTO.class)
            );
        });
    }

    @Transactional(readOnly = true)
    public boolean checkPayment(Long companyId) {
        Optional<Company> optionalCompany = companyRepository.getByIdAndDeletedFalse(companyId);
        if (optionalCompany.isPresent()) {
            Company company = optionalCompany.get();
            return !company.getBlocked();
        } else return false;
    }

    private BooleanBuilder buildWhereName(String name) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QCompany.company.deleted.isFalse());
        if (StringUtils.isNotEmpty(name)) {
            booleanBuilder.and(QCompany.company.name.startsWithIgnoreCase(name));
        }
        return booleanBuilder;
    }

    private BooleanBuilder buildWhereCompanyIdAndRole(Long companyId, Role role) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QCompany.company.deleted.isFalse());
        booleanBuilder.and(QUser.user.company.id.eq(companyId)).and(QUser.user.role.eq(role));
        return booleanBuilder;
    }

    private Company findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Company> company = companyRepository.getByIdAndDeletedFalse(id);
        if (company.isPresent()) {
            return company.get();
        }
        log.error("Cannot find company with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private boolean existsByNameAndIdIsNot(String name, Long id) {
        return companyRepository.existsByNameAndIdIsNotAndDeletedFalse(name, id);
    }

    @PreAuthorize("hasAuthority('STOCK_OWNER')")
    @Transactional
    public SaveCompanyPaymentDTO pay() {
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Company company = companyRepository.getOne(user.getCompanyId());
        BigDecimal sum = computePaymentsum(company);
        SaveCompanyPaymentDTO saveCompanyPaymentDTO = new SaveCompanyPaymentDTO(sum, company.getId());
        company.setBlocked(false);
        return saveCompanyPaymentDTO;
    }

    private BigDecimal computePaymentsum(Company company) {
        Pricelist pricelist = company.getPricelist();
        Long stockCount = stockRepository.countByCompanyIdAndDeletedFalse(company.getId());
        BigDecimal sum = pricelist.getCommonPrice().add(pricelist.getOneStockPrice()
                .multiply(new BigDecimal(stockCount)));
        return sum;
    }

    @Transactional(readOnly = true)
    public Long getLeftPaidDays(Long companyId) {
        long between = 0;
        Optional<Company> optionalCompany = companyRepository.getByIdAndDeletedFalse(companyId);
        if (optionalCompany.isPresent()) {
            LocalDateTime today = LocalDateTime.now();
            LocalDateTime d1 = today.plusMonths(1).withDayOfMonth(1);
            between = ChronoUnit.DAYS.between(d1, today);
        }
        return between;
    }
}
