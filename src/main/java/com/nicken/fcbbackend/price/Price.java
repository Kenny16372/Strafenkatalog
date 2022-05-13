package com.nicken.fcbbackend.price;

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
@Table(name = "prices")
public class Price {
    @GeneratedValue
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    // amount in cents
    @Column(name = "amount", nullable = false)
    private Integer amount;
}
