package com.nicken.fcbbackend.price;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PriceRestModel {
    private long id;
    private String name;
    private Integer amount;
}
