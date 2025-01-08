package com.swapnil.TradingApp.model;


import com.swapnil.TradingApp.domain.PaymentMethod;
import com.swapnil.TradingApp.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class PaymentOrder {

    @Id
    private String id = UUID.randomUUID().toString();

    private Long amount;

    @Enumerated(EnumType.ORDINAL)
    private PaymentOrderStatus paymentOrderStatus;



    @Enumerated(EnumType.ORDINAL)
    private PaymentMethod paymentMethod;

    @ManyToOne
    private Users user;
}
