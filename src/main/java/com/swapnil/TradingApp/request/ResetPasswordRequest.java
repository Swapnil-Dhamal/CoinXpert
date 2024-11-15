package com.swapnil.TradingApp.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String otp;
    private String password;
}
