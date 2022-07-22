package com.nicken.fcbbackend.fine;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FineRestModel {
    private long id;
    private String name;
    private Integer amount;
}
