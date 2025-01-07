package com.swapnil.TradingApp.model;


import com.swapnil.TradingApp.domain.PaymentMethod;
import com.swapnil.TradingApp.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private Long amount;

    @Enumerated(EnumType.ORDINAL)
    private PaymentOrderStatus paymentOrderStatus;



    @Enumerated(EnumType.ORDINAL)
    private PaymentMethod paymentMethod;

    @ManyToOne
    private Users user;
}
