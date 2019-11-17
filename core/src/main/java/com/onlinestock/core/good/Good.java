package com.onlinestock.core.good;

import com.onlinestock.core.cancellation.CancellationAct;
import com.onlinestock.core.carriage.Carrier;
import com.onlinestock.core.common.PostgreSQLEnumType;
import com.onlinestock.core.consignment.ConsignmentNote;
import com.onlinestock.core.inconsisency.InconsistencyAct;
import com.onlinestock.core.stockcell.StockCell;
import com.onlinestock.core.stockcell.StorageCondition;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

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
import javax.persistence.Table;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "good")
@TypeDef(
        name = "pgsql_enum",
        typeClass = PostgreSQLEnumType.class
)
@NoArgsConstructor
@AllArgsConstructor
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "name")
    private String name;

    @Column (name = "storage_condition",
            columnDefinition = "condition")
    @Type( type = "pgsql_enum" )
    @Enumerated(EnumType.STRING)
    private StorageCondition storageCondition;

    @Column (name = "weight")
    private BigDecimal weight;

    @Column (name = "state",
            columnDefinition = "goods_state")
    @Type( type = "pgsql_enum" )
    @Enumerated(EnumType.STRING)
    private GoodsStatus state;

    @Column (name = "count")
    private Integer count;

    @Column (name = "unit")
    private String unit;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name="volume")
    private BigDecimal volume;

    @Column(name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "input_tth_id")
    private ConsignmentNote inputNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "output_tth_id")
    private ConsignmentNote outputNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrier_id")
    private Carrier carrier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inconsistensy_act_id")
    private InconsistencyAct inconsistencyAct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancellation_act_id")
    private CancellationAct cancellationAct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="stock_cell_id")
    private StockCell stockCell;
}
