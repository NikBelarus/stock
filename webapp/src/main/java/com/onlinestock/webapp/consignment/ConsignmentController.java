package com.onlinestock.webapp.consignment;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.consignment.dto.*;
import com.onlinestock.core.consignment.service.impl.ConsignmentServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/consignments")
public class ConsignmentController {
    @Autowired
    private ConsignmentServiceImpl consignmentService;

    @GetMapping
    public Page<FindConsignmentDTO> find(Pageable pageable, @RequestParam(required = false) String type) {
        log.info("Request find page of consignments with type " + type + ", pageNumber " + pageable.getPageNumber() +
                ", size " + pageable.getPageSize());
        return consignmentService.find(pageable, type);
    }

    @GetMapping("{id}")
    public FindConsignmentDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find consignment with id " + id);
        return consignmentService.findOne(id);
    }

    @GetMapping("active")
    public Page<ShortConsignmentDTO> findNotesList(@RequestParam String type, @RequestParam String status, Pageable pageable){
        log.info("Request list " + type.toString() + status.toString() + " notes" );
        return consignmentService.findStockNotesByTypeAndStatus(type, status, pageable);
    }

    @PostMapping("input")
    public ApiResponse createInput(@RequestBody SaveConsignmentDTO saveConsignmentDTO){
        log.info("Request create input consignment for company " + saveConsignmentDTO.getCompanyId());
        return consignmentService.createInput(saveConsignmentDTO);
    }

    @PostMapping("output")
    public ApiResponse createOutput(@RequestBody SaveConsignmentDTO consignmentDTO){
        log.info("Request create output consignment for company " + consignmentDTO.getCompanyId());
        return consignmentService.createOutput(consignmentDTO);

    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveConsignmentDTO saveConsignmentDTO)
            throws ChangeSetPersister.NotFoundException {
        log.info("Request update consignment with id " + id);
        return consignmentService.update(id, saveConsignmentDTO);
    }

    @PutMapping({"verification"})
    public FindConsignmentDTO verify(@RequestBody VerificationConsignmentDTO verificationConsignmentDTO)
            throws ChangeSetPersister.NotFoundException {
        log.info("request verify dto " + verificationConsignmentDTO.getId());
        return consignmentService.verifyConsignment(verificationConsignmentDTO);
    }

    @PutMapping({"complete_registration"})
    public FindConsignmentDTO register(@RequestBody UpdateConsignmentDTO updateConsignmentDTO)
            throws ChangeSetPersister.NotFoundException {
        log.info("request complete registration ");
        return consignmentService.completeRegistration(updateConsignmentDTO);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        log.info("Request delete consignment with id " + id);
        consignmentService.delete(id);
    }
}
