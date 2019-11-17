package com.onlinestock.core.cancellation;

import com.onlinestock.core.good.Good;
import com.onlinestock.core.user.User;
import com.onlinestock.core.stock.Stock;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.AllArgsConstructor;

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
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "cancellation_act")
@NoArgsConstructor
@AllArgsConstructor
public class CancellationAct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "date")
    private LocalDateTime date;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "controller_id")
    private User controller;

    @OneToMany(mappedBy = "cancellationAct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Good> goods;
}
