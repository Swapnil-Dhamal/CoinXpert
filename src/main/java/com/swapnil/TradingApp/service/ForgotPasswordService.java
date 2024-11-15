package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.ForgotPasswordToken;
import com.swapnil.TradingApp.model.Users;
import org.springframework.stereotype.Service;

@Service
public interface ForgotPasswordService {

    ForgotPasswordToken createToken(Users user,
                                    String id,
                                    String otp,
                                    VerificationType verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);


}
