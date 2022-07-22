package com.nicken.fcbbackend.fine;

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
@Table(name = "fine")
public class Fine {
    @GeneratedValue
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    // amount in cents
    @Column(name = "amount", nullable = false)
    private Integer amount;
    @Column(name = "timestampDeleted", nullable = true)
    private Timestamp timestampDeleted;
}
