package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.Users;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public Users findUserProfileByJwt(String jwt);
    public Users findUserByEmail(String email);
    public Users findById(Long userId);

    public Users enableTwoFactorAuthentication(
            VerificationType verificationType,
            String sendTo,
            Users user);

    Users updatePassword(Users users, String newPassword);

}
