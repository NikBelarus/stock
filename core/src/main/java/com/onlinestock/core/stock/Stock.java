package com.onlinestock.core.stock;

import com.onlinestock.core.company.Company;
import com.onlinestock.core.cancellation.CancellationAct;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.stockcell.StockCell;
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
import java.util.List;

@Data
@Entity
@Table(name = "stock")
@NoArgsConstructor
@AllArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column (name = "house")
    private String house;

    @Column(name ="latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private List<User> users;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StockCell> stockCells;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    private List<CancellationAct> cancellationAct;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ConsignmentNote> consignmentNotes;
}
