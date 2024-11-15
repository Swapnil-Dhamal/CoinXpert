package com.swapnil.TradingApp.request;

import com.swapnil.TradingApp.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {

    private String sendTo;
    private VerificationType verificationType;
}
