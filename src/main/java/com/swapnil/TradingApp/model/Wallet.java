package com.swapnil.TradingApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id")
    private Users user;

    private BigDecimal balance=BigDecimal.ZERO;
}
