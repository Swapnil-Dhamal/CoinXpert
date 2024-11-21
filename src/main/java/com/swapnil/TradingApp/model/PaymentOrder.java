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

    private PaymentOrderStatus paymentOrderStatus;

    private PaymentOrder paymentOrder;

    private PaymentMethod paymentMethod;

    @ManyToOne
    private Users users;
}
