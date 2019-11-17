package com.onlinestock.webapp.company;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.company.dto.CompanyWithAdminAndOwnerDTO;
import com.onlinestock.core.company.dto.ExpandedInfoCompanyDTO;
import com.onlinestock.core.company.dto.FindCompanyDTO;
import com.onlinestock.core.company.dto.SaveCompanyDTO;
import com.onlinestock.core.company.service.impl.CompanyServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/companies")
public class CompanyController {

    @Autowired
    private CompanyServiceImpl companyServiceImpl;

    @GetMapping
    public Page<FindCompanyDTO> findByCompanyName(@RequestParam(value = "name", required = false) String name, Pageable pageable) {
        log.info("Request find page of companies with company name " + name + ", pageNumber " + pageable.getPageNumber() +
                ", size " + pageable.getPageSize());
        return companyServiceImpl.findByName(name, pageable);
    }

    @GetMapping("{id}")
    public FindCompanyDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find company with id " + id);
        return companyServiceImpl.findOne(id);
    }

    @GetMapping("expanded")
    public Page<ExpandedInfoCompanyDTO> getExpandedCompanyPage(Pageable pageable){
        log.info("Request find page of expanded companies with pageNumber " + pageable.getPageNumber() + ", size " +
                pageable.getPageSize());
        return companyServiceImpl.getExpandedCompanies(pageable);
    }

    @PostMapping
    public ApiResponse create(@RequestBody CompanyWithAdminAndOwnerDTO companyWithAdminAndOwnerDTO) {
        log.info("Request create company with name " + companyWithAdminAndOwnerDTO.getCompany().getName());
        return companyServiceImpl.create(companyWithAdminAndOwnerDTO);
    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveCompanyDTO saveCompanyDto) throws ChangeSetPersister.NotFoundException {
        log.info("Request update company with id " + id);
        return companyServiceImpl.update(id, saveCompanyDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        log.info("Request delete company with id " + id);
        companyServiceImpl.delete(id);
    }
}
