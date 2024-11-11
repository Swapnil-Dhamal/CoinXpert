package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.model.TwoFactorOtp;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.TwoFactorOtpRepo;
import com.swapnil.TradingApp.service.TwoFactorOtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TwoFactorOtpImpl implements TwoFactorOtpService {

    private final TwoFactorOtpRepo otpRepo;

    @Override
    public TwoFactorOtp createTwoFactorOtp(Users users, String otp, String jwt) {
        UUID uuid=UUID.randomUUID();

        String id=uuid.toString();

        TwoFactorOtp twoFactorOtp=new TwoFactorOtp();
        twoFactorOtp.setOtp(otp);
        twoFactorOtp.setId(id);
        twoFactorOtp.setJwt(jwt);
        twoFactorOtp.setUsers(users);
        return otpRepo.save(twoFactorOtp);
    }

    @Override
    public TwoFactorOtp findByUserId(Long userId) {
        return otpRepo.findByUsers_Id(userId);
    }

    @Override
    public TwoFactorOtp findById(String id) {
        Optional<TwoFactorOtp> opt=otpRepo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp, String otp) {
        return twoFactorOtp.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp) {
        otpRepo.delete(twoFactorOtp);

    }
}
