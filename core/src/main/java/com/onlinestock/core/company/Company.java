package com.onlinestock.core.company;

import com.onlinestock.core.dailystatistics.DailyStatistics;
import com.onlinestock.core.payment.CompanyPayment;
import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.payment.Pricelist;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.user.User;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "company")
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "name")
    private String name;

    @Column (name = "deleted")
    private Boolean deleted = false;

    @Column (name = "blocked")
    private Boolean blocked = false;

    @Column (name = "last_payment_date")
    private LocalDateTime lastPaymentDate;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Stock> stocks;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Carrier> carriers;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> users;

    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
    private List<CompanyPayment> payments;

    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
    private List<DailyStatistics> incomes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="pricelist_id")
    private Pricelist pricelist;
}
