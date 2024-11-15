package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForgotPasswordRepo extends JpaRepository<ForgotPasswordToken, String> {

    ForgotPasswordToken findUserById(Long userId);

}
