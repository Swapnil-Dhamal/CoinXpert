package com.swapnil.TradingApp.controller;


import com.swapnil.TradingApp.domain.VerificationType;
import com.swapnil.TradingApp.model.ForgotPasswordToken;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.VerificationCode;
import com.swapnil.TradingApp.request.ForgotPasswordTokenRequest;
import com.swapnil.TradingApp.request.ResetPasswordRequest;
import com.swapnil.TradingApp.response.ApiResponse;
import com.swapnil.TradingApp.response.AuthResponse;
import com.swapnil.TradingApp.service.ForgotPasswordService;
import com.swapnil.TradingApp.service.MailService;
import com.swapnil.TradingApp.service.UserService;
import com.swapnil.TradingApp.service.VerificationCodeService;
import com.swapnil.TradingApp.utils.OtpUtils;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final MailService mailService;
    private final VerificationCodeService verificationCodeService;
    private final ForgotPasswordService forgotPasswordService;




    @GetMapping("/api/users/profile")
    public ResponseEntity<Users> getUserProfile(@RequestHeader("Authorization") String jwt){

        Users user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/profile/verification/{verificationType}/sendOtp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType 
    ) throws MessagingException {

        Users user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode=verificationCodeService
                .getVerificationCodeByUser(user.getId());

        if(verificationCode==null){
            verificationCode=verificationCodeService.sendVerificationOtp(user, verificationType);
        }

        if(verificationType.equals(VerificationType.EMAIL)){
            mailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
        }

        return new ResponseEntity<>("Verification otp sent successfully", HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable2FA/{otp}")
    public ResponseEntity<Users> enable2FA(
            @PathVariable String otp,
            @RequestHeader("Authorization") String jwt
    ){

        Users user=userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo=verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail() : verificationCode.getMobile();

        boolean isVerified =verificationCode.getOtp().equals(otp);

        if(isVerified){
            Users updatedUser=userService.enableTwoFactorAuthentication(
                    verificationCode.getVerificationType(), sendTo, user);


            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }

        throw new RuntimeException("Wrong otp");



    }


    @PostMapping("/api/users/reset-password/sendOtp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(
            @RequestBody ForgotPasswordTokenRequest req,
            @PathVariable VerificationType verificationType
    ) throws MessagingException {

        Users user=userService.findUserByEmail(req.getSendTo());
        String otp= OtpUtils.generateOtp();
        UUID uuid=UUID.randomUUID();
        String id=uuid.toString();

        ForgotPasswordToken token=forgotPasswordService.findByUser(user.getId());

        if(token==null){
            token=forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
        }

        if(req.getVerificationType().equals(VerificationType.EMAIL)){
            mailService.sendVerificationOtpEmail(user.getEmail(),  token.getOtp());
        }

        AuthResponse response=new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password reset otp sent successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }


    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req,
            @RequestHeader("Authorization") String jwt
    ){

        ForgotPasswordToken forgotPasswordToken=forgotPasswordService.findById(id);

        boolean isVerified=forgotPasswordToken.getOtp().equals(req.getOtp());

        if(isVerified){
            userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());

            ApiResponse res=new ApiResponse();
            res.setMessage("Password update successfully");
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }

        throw new RuntimeException("Wrong otp");



    }
}
