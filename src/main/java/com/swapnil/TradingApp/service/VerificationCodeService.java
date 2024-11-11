package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.VerificationCode;
import org.springframework.stereotype.Service;

@Service
public interface VerificationCodeService {

    VerificationCode sendVerificationOtp(Users user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(long id);

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeById(VerificationCode verificationCode);

}
