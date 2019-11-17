package com.onlinestock.core.payment;

import com.onlinestock.core.company.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name="pricelist")
@NoArgsConstructor
@AllArgsConstructor
public class Pricelist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="common_price")
    private BigDecimal commonPrice;

    @Column(name="one_stock_price")
    private BigDecimal oneStockPrice;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "pricelist", fetch = FetchType.LAZY)
    private List<Company> companies;
}
