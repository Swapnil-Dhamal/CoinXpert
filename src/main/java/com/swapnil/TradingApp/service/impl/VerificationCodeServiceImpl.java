package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.VerificationCode;
import com.swapnil.TradingApp.repo.VerificationCodeRepo;
import com.swapnil.TradingApp.service.VerificationCodeService;
import com.swapnil.TradingApp.utils.OtpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationCodeServiceImpl implements VerificationCodeService {

    private final VerificationCodeRepo verificationCodeRepo;

    @Override
    public VerificationCode sendVerificationOtp(Users user, VerificationType verificationType) {

        VerificationCode verificationCode=new VerificationCode();
        verificationCode.setOtp(OtpUtils.generateOtp());
        verificationCode.setVerificationType(verificationType);
        verificationCode.setUser(user);
        return verificationCodeRepo.save(verificationCode);
    }

    @Override
    public VerificationCode getVerificationCodeById(long id) {

        Optional<VerificationCode> verificationCode=verificationCodeRepo.findById(id);

        if(verificationCode.isPresent()){
            return verificationCode.get();
        }
        throw new RuntimeException("Verification code not found");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userId) {
        return verificationCodeRepo.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCodeById(VerificationCode verificationCode) {
        verificationCodeRepo.delete(verificationCode);
    }

}
