package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.ForgotPasswordToken;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.ForgotPasswordRepo;
import com.swapnil.TradingApp.service.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    private final ForgotPasswordRepo forgotPasswordRepo;


    @Override
    public ForgotPasswordToken createToken(Users user,
                                           String id,
                                           String otp,
                                           VerificationType verificationType,
                                           String sendTo) {

        ForgotPasswordToken token=new ForgotPasswordToken();
        token.setId(id);
        token.setOtp(otp);
        token.setUser(user);
        token.setSendTo(sendTo);
        token.setVerificationType(verificationType);
        return forgotPasswordRepo.save(token);
    }

    @Override
    public ForgotPasswordToken findById(String id) {

        Optional<ForgotPasswordToken> forgotPasswordToken=forgotPasswordRepo.findById(id);
        return forgotPasswordToken.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUser(Long userId) {
        return forgotPasswordRepo.findUserById(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepo.delete(token);

    }
}
