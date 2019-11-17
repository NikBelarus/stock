package com.onlinestock.webapp.good;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.good.service.impl.GoodServiceImpl;
import com.onlinestock.core.user.authentication.UserPrincipal;
import com.onlinestock.webapp.security.SecurityConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/goods")
public class GoodController {
    @Autowired
    private GoodServiceImpl goodServiceImpl;

   /* @GetMapping
    public Page<FindGoodDTO> getGoods(String name, Pageable pageable) {
        log.info("Request find page of goods with name " + name + ", pageNumber " + pageable.getPageNumber() +
                ", size " + pageable.getPageSize());
        return goodServiceImpl.find(name, pageable);
    }*/

    @GetMapping
    public Page<FindGoodDTO> getStockCarrierGoods(Pageable pageable, @RequestParam(defaultValue = "0") Long carrier_id){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long stockId = user.getStockId();
        log.info("Request find carrirer's " + carrier_id + " goods on stock "+ stockId);
        return goodServiceImpl.findStockCarriersGoods(stockId, carrier_id, pageable);
    }

    @GetMapping("{id}")
    public FindGoodDTO findOne(@PathVariable long id) throws ChangeSetPersister.NotFoundException {
        log.info("Request find good with id " + id);
        return goodServiceImpl.findOne(id);
    }

    @PostMapping
    public ApiResponse create(@RequestBody SaveGoodDTO good) {
        log.info("Request create good with name " + good.getName());
        return goodServiceImpl.create(good);
    }

    @PutMapping("{id}")
    public ApiResponse update(@PathVariable long id, @RequestBody SaveGoodDTO good) throws ChangeSetPersister.NotFoundException {
        log.info("Request update good with id " + id);
        return goodServiceImpl.update(id, good);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        log.info("Request delete good with id " + id);
        goodServiceImpl.delete(id);
    }

}
