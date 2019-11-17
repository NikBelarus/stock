package com.onlinestock.core.stockcell;

import com.onlinestock.core.common.PostgreSQLEnumType;
import com.onlinestock.core.stock.Stock;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import com.onlinestock.core.good.Good;
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
import java.util.List;

@Data
@Entity
@Table(name = "stock_cell")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
@NoArgsConstructor
@AllArgsConstructor
public class StockCell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column (name = "storage_condition",
            columnDefinition = "condition")
    @Type( type = "pgsql_enum" )
    @Enumerated(EnumType.STRING)
    private StorageCondition storageCondition;

    @Column (name = "volume")
    private BigDecimal volume;

    @Column (name = "cell_price")
    private BigDecimal cellPrice;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @OneToMany(mappedBy = "stockCell", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Good> goods;

}
