package com.swapnil.TradingApp.model;


import com.swapnil.TradingApp.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VerificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String otp;

    @OneToOne
    private Users user;

    private String email;

    private String mobile;

    @Enumerated(EnumType.ORDINAL)
    private VerificationType verificationType;
}
