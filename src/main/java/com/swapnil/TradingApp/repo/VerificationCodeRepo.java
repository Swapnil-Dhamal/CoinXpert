package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepo extends JpaRepository<VerificationCode, Long> {

    public VerificationCode findByUser_Id(Long userId);
}
