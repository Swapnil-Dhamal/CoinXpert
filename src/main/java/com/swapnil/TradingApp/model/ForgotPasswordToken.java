package com.swapnil.TradingApp.model;


import com.swapnil.TradingApp.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne
    private Users user;

    private String otp;

    @Enumerated(EnumType.ORDINAL)
    private VerificationType verificationType;

    private String sendTo;
}
