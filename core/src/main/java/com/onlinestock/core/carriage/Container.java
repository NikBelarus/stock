package com.onlinestock.core.carriage;

import com.onlinestock.core.consignment.ConsignmentNote;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Data
@Entity
@Table(name = "container")
@NoArgsConstructor
@AllArgsConstructor
public class Container {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "marking_code")
    private String markingCode;

    @Column (name = "deleted")
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tth_id")
    private ConsignmentNote consignmentNote;
}
