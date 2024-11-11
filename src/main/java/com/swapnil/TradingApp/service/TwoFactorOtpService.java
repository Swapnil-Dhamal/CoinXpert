package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.TwoFactorOtp;
import com.swapnil.TradingApp.model.Users;
import org.springframework.stereotype.Service;

@Service
public interface TwoFactorOtpService {

    TwoFactorOtp createTwoFactorOtp(Users users,String otp, String jwt);

    TwoFactorOtp findByUserId(Long userId);

    TwoFactorOtp findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp, String otp);

    void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp);
}
