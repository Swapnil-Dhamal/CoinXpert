package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.config.JwtProvider;
import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.TwoFactorAuth;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.UserRepo;
import com.swapnil.TradingApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;


    @Override
    public Users findUserProfileByJwt(String jwt) {

        String email= JwtProvider.getEmailFromToken(jwt);

        Users user = userRepo.findByEmail(email);
        if(user == null){
            throw new RuntimeException("User not found");
        }
        return user;
    }

    @Override
    public Users findUserByEmail(String email) {
        Users user = userRepo.findByEmail(email);
        if(user == null){
            throw new RuntimeException("User not found");
        }
        return user;
    }

    @Override
    public Users findById(Long userId) {
        Optional<Users> user = userRepo.findById(userId);

        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }

        return user.get();

    }

    @Override
    public Users enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, Users user) {

        TwoFactorAuth  twoFactorAuth=new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);

        user.setTwoFactorAuth(twoFactorAuth);

        return userRepo.save(user);
    }



    @Override
    public Users updatePassword(Users users, String newPassword) {

        users.setPassword(newPassword);
        return userRepo.save(users);
    }
}
