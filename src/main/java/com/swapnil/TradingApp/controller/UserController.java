package com.swapnil.TradingApp.controller;


import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.service.MailService;
import com.swapnil.TradingApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<Users> getUserProfile(@RequestHeader("Authorization") String jwt){

        Users user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/profile/verification/{verificationType}/sendOtp")
    public ResponseEntity<Users> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType 
    ){

        Users user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable2FA/{otp}")
    public ResponseEntity<Users> enable2FA(Users user){

        Users user = userService.findUserByEmail(user.getEmail());

        user.setTwoFactorAuth(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
