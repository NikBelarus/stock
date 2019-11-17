package com.onlinestock.core.user;

import com.onlinestock.core.common.PostgreSQLEnumType;
import com.onlinestock.core.company.Company;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.cancellation.CancellationAct;
import com.onlinestock.core.inconsisency.InconsistencyAct;
import com.onlinestock.core.stock.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "stock_app_user")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;


    @Column(name = "password")
    private String password;

    @Column(name = "role",
            columnDefinition = "user_role")
    @Type(type = "pgsql_enum")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "parent_name")
    private String parentName;

    @Column(name = "birth_date")
    private LocalDate birthdate;

    @Column(name = "salary")
    private BigDecimal salary = new BigDecimal(200);

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house")
    private String house;

    @Column(name = "appartment")
    private Integer appartment;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @OneToMany(mappedBy = "controller", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CancellationAct> cancellationActs;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InconsistencyAct> inconsistencyActs;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ConsignmentNote> managerConsignmentNotes;

    @OneToMany(mappedBy = "dispatcher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ConsignmentNote> dispatcherConsignmentNotes;

    @OneToMany(mappedBy = "controller", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ConsignmentNote> controllerConsignmentNotes;
}
