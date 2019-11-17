package com.onlinestock.core.inconsisency;

import com.onlinestock.core.driver.Driver;
import com.onlinestock.core.good.Good;
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
@Table(name = "inconsistency_act")
@NoArgsConstructor
@AllArgsConstructor
public class InconsistencyAct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "date")
    private LocalDateTime date;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_worker_id")
    private User user;

    @OneToMany(mappedBy = "inconsistencyAct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Good> goods;
}
