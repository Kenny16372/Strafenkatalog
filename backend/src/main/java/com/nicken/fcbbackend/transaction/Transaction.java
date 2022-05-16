package com.nicken.fcbbackend.transaction;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    @Column(name = "player_id", updatable = false, nullable = false)
    private Long playerId;
    @Column(name = "price_id", updatable = false, nullable = false)
    private Long priceId;
    // amount in cents
    @Column(name = "amount", updatable = false, nullable = false)
    private Integer amount;
    // number of fines of this type (price_id->amount * count == amount)
    @Column(name = "count", updatable = false, nullable = false)
    private Integer count;
    @Column(name = "timestamp", updatable = false, nullable = false)
    private Timestamp timestamp;
    @Column(name = "timestamp_deleted", updatable = true, nullable = true)
    private Timestamp timestampDeleted;
}
