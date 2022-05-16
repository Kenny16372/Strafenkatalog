package com.nicken.fcbbackend.transaction;

import java.sql.Timestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TransactionRestModel {
    private Long id;
    private Long playerId;
    private Long priceId;
    private Integer amount;
    private Integer count;
    private Timestamp timestamp;
    private Timestamp timestampDeleted;
}
