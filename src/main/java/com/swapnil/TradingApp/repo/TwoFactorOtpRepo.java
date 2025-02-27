package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.TwoFactorOtp;
import com.swapnil.TradingApp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TwoFactorOtpRepo extends JpaRepository<TwoFactorOtp, String> {


    TwoFactorOtp findByUser_Id(Long userId);
}
