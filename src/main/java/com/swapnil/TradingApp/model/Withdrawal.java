package com.swapnil.TradingApp.model;

import com.swapnil.TradingApp.domain.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.ORDINAL)
    private WithdrawalStatus withdrawalStatus;

    private Long amount;

    @ManyToOne
    private Users user;

    private LocalDateTime date=LocalDateTime.now();
}
