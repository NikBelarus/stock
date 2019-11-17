package com.onlinestock.core.good.service.impl;

import com.onlinestock.core.common.ApiResponse;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.consignment.ConsignmentType;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.good.GoodsStatus;
import com.onlinestock.core.good.QGood;
import com.onlinestock.core.good.dto.FindGoodDTO;
import com.onlinestock.core.good.dto.GoodMapping;
import com.onlinestock.core.good.dto.SaveGoodDTO;
import com.onlinestock.core.good.repository.GoodRepository;
import com.onlinestock.core.good.service.GoodService;
import com.onlinestock.core.stockcell.repository.StockCellRepository;
import com.querydsl.core.BooleanBuilder;
import liquibase.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private GoodMapping goodMapping;

    @Autowired
    private GoodRepository goodRepository;

    @Autowired
    private StockCellRepository cellRepository;

    @Transactional(readOnly = true)
    public Page<FindGoodDTO> find(String name, Pageable pageable) {
        Page<Good> goods = goodRepository.findAll(buildWhere(name), pageable);
        log.info("Goods page found, number of elements: " + goods.getNumberOfElements());
        return goods.map(good -> goodMapping.getMapper().map(good, FindGoodDTO.class));
    }

    @Transactional(readOnly = true)
    public List<Good> findAllByStockCellId(Long id) {
        return goodRepository.getAllByStockCellIdAndDeletedFalse(id);
    }

    @Transactional(readOnly = true)
    public Page<FindGoodDTO> findStockCarriersGoods(Long stockId, Long carrierId, Pageable pageable) {
        Page<Good> goods = goodRepository.findAll(buildWhereStockAndCarrier(stockId, carrierId), pageable);
        log.info("Goods page found, number of elements: " + goods.getNumberOfElements());
        return goods.map(good -> goodMapping.getMapper().map(good, FindGoodDTO.class));
    }

    @Override
    @Transactional(readOnly = true)
    public FindGoodDTO findOne(Long id) throws ChangeSetPersister.NotFoundException {
        log.info("Found good with id " + id);
        return goodMapping.getMapper().map(findById(id), FindGoodDTO.class);
    }

    @Transactional(readOnly = true)
    public Page<FindGoodDTO> findConsignmentGoods(Long noteId) {
        Page<Good> goods = goodRepository.findAll(buildWhereNote(noteId), Pageable.unpaged());
        return goods.map(good -> goodMapping.getMapper().map(good, FindGoodDTO.class));
    }

    private BooleanBuilder buildWhereNote(Long noteId) {
        return null;
    }

    @Override
    @Transactional
    public ApiResponse create(SaveGoodDTO saveGoodDTO) {
        Good good = goodMapping.getMapper().map(saveGoodDTO, Good.class);
        goodRepository.save(good);
        log.info("Good with id " + good.getId() + " was created");
        return new ApiResponse(true, "The good is created.", goodMapping.getMapper().map(good, FindGoodDTO.class));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Good> good = goodRepository.getByIdAndDeletedFalse(id);
        good.ifPresent(good1 -> good1.setDeleted(true));
        log.info("Good with id " + id + " was deleted");
    }

    @Override
    @Transactional
    public ApiResponse update(Long id, SaveGoodDTO saveGoodDTO) throws ChangeSetPersister.NotFoundException {
        Good prevGood = findById(id);
        goodMapping.getMapper().map(saveGoodDTO, prevGood);
        log.info("Good with id " + id + " was updated");
        return new ApiResponse(true, "The good is updated.", goodMapping.getMapper().map(prevGood, FindGoodDTO.class));
    }

    @Transactional
    public void verifyGoods(List<FindGoodDTO> goodDTOS, ConsignmentNote note) {
        List<Good> goods = goodDTOS.stream()
                .map(goodDTO -> {
                    try {
                        Good good = findById(goodDTO.getId());
                        if (note.getType().equals(ConsignmentType.INPUT)) {
                            good.setState(GoodsStatus.VERIFICATION_COMPLETED);
                            good.setInputNote(note);
                        } else {
                            good.setState(GoodsStatus.REMOVED_FROM_STOCK);
                            good.setOutputNote(note);
                        }
                        return good;
                    } catch (ChangeSetPersister.NotFoundException e) {
                        log.error("missing good id:" + goodDTO.getId());
                        return null;
                    }
                })
                .filter(good -> good != null)
                .collect(Collectors.toList());
        goodRepository.saveAll(goods);
        log.info("verified " + note.getId() + " note goods");
    }

    @Transactional
    public void registerGoods(List<FindGoodDTO> goods, ConsignmentNote note) {
        goods.forEach(goodDto -> {
            try {
                Good good = findById(goodDto.getId());
                if (note.getType().equals(ConsignmentType.INPUT)) {
                    good.setState(GoodsStatus.ACCEPTED_FOR_STORAGE);
                    good.setStockCell(cellRepository.getOne(goodDto.getCellId()));
                } else {
                    good.setState(GoodsStatus.RELEASE_ALLOWED);
                }
                goodRepository.save(good);
            } catch (ChangeSetPersister.NotFoundException e) {
                log.error(e + " missing good id:" + goodDto.getId());
            }
        });
    }

    @Transactional
    public void registerOutput(List<SaveGoodDTO> goods, ConsignmentNote outputNote) {
        goods.forEach(goodDto -> {
            try {
                Good good = findById(goodDto.getId());
                if (good.getCount().intValue() != goodDto.getCount().intValue()) {
                    //то что осталось на складе
                    good.setCount(good.getCount() - goodDto.getCount());
                    goodRepository.save(good);
                    //то что уезжает
                    Good exportGood = new Good();
                    goodMapping.getMapper().map(good, exportGood);
                    exportGood.setId(null);
                    exportGood.setCount(goodDto.getCount());
                    exportGood.setState(GoodsStatus.REMOVED_FROM_STORAGE);
                    exportGood.setOutputNote(outputNote);
                    exportGood.setStockCell(null);
                    goodRepository.save(exportGood);
                } else {
                    good.setState(GoodsStatus.REMOVED_FROM_STORAGE);
                    good.setOutputNote(outputNote);
                    good.setStockCell(null);
                    goodRepository.save(good);
                }
            } catch (ChangeSetPersister.NotFoundException e) {
                log.error(e + " missing good id:" + goodDto.getId());
            }
        });
    }

    private Good findById(Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Good> good = goodRepository.findByIdAndDeletedFalse(id);
        if (good.isPresent()) {
            return goodRepository.getOne(id);
        }
        log.error("Cannot find good with id " + id);
        throw new ChangeSetPersister.NotFoundException();
    }

    private BooleanBuilder buildWhereStockAndCarrier(Long stockId, Long carrierId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (stockId > 0) {
            booleanBuilder.and(QGood.good.stockCell.stock.id.eq(stockId));
        }
        if (carrierId != null && carrierId > 0) {
            booleanBuilder.and(QGood.good.carrier.id.eq(carrierId));
        }
        booleanBuilder.and(QGood.good.deleted.isFalse())
                .and(QGood.good.state.eq(GoodsStatus.ACCEPTED_FOR_STORAGE));
        return booleanBuilder;
    }

    private BooleanBuilder buildWhere(String name) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QGood.good.deleted.isFalse());
        if (StringUtils.isNotEmpty(name)) {
            booleanBuilder.and(QGood.good.name.startsWithIgnoreCase(name));
        }
        return booleanBuilder;
    }

    public void createAll(List<SaveGoodDTO> goods) {
        goods.forEach(saveGoodDTO -> {
            Good good = goodMapping.getMapper().map(saveGoodDTO, Good.class);
            goodRepository.save(good);
        });
    }

    public void updateAllCounts(List<SaveGoodDTO> dtos) {
        List<Good> goods = dtos.stream().map(dto -> {
            try {
                Good good = findById(dto.getId());
                GoodsStatus state = dto.getState();
                if (state.equals(GoodsStatus.LOST_BY_CARRIER) ||
                        state.equals(GoodsStatus.LOST_IN_STOCK)) {
                    good.setCount(good.getCount() - dto.getCount());
                    return good;
                }
            } catch (ChangeSetPersister.NotFoundException e) {
                log.error("try update nonexistence good");
            }
            return null;
        })
                .filter(good -> good != null)
                .collect(Collectors.toList());
        goodRepository.saveAll(goods);
    }
}
