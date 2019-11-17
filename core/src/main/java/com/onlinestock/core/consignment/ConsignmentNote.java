package com.onlinestock.core.consignment;

import com.onlinestock.core.common.PostgreSQLEnumType;
import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.driver.Driver;
import com.onlinestock.core.carriage.VehicleType;
import com.onlinestock.core.good.Good;
import com.onlinestock.core.stock.Stock;
import com.onlinestock.core.user.User;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "tth")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
@NoArgsConstructor
@AllArgsConstructor
public class ConsignmentNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="number_in_company")
    private Long numberInCompany;

    @Column(name = "status",
            columnDefinition = "tth_status")
    @Type(type = "pgsql_enum")
    @Enumerated(EnumType.STRING)
    private ConsignmentStatus status;

    @Column(name = "consignment_description")
    private String consignmentDescription;

    @Column(name = "vehicle_type",
            columnDefinition = "vehicle_type")
    @Type(type = "pgsql_enum")
    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "type",
            columnDefinition = "tth_type")
    @Type(type = "pgsql_enum")
    @Enumerated(EnumType.STRING)
    private ConsignmentType type;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @Column(name = "verification_date")
    private LocalDateTime verificationDate;

    @Column(name = "registration_completed_date")
    private LocalDateTime registrationCompletedDate;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrier_id")
    private Carrier carrier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dispatcher_id")
    private User dispatcher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "controller_id")
    private User controller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="company_id")
    private Company company;

    @OneToMany(mappedBy = "inputNote", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Good> inputGoods;

    @OneToMany(mappedBy = "outputNote", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Good> outputGoods;
}
