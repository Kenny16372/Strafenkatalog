package com.nicken.fcbbackend.transaction;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.nicken.fcbbackend.fine.Fine;
import com.nicken.fcbbackend.player.Player;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    // amount in cents
    @Column(name = "amount", updatable = false, nullable = false)
    private Integer amount;
    // number of fines of this type (fine_id->amount * count == amount)
    @Column(name = "count", updatable = false, nullable = false)
    private Integer count;
    @Column(name = "timestamp", updatable = false, nullable = false)
    private Timestamp timestamp;
    @Column(name = "timestamp_paid", updatable = true, nullable = true)
    private Timestamp timestampPaid;
    @Column(name = "timestamp_deleted", updatable = true, nullable = true)
    private Timestamp timestampDeleted;
    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;
    @ManyToOne
    @JoinColumn(name = "fine_id")
    private Fine fine;
}
