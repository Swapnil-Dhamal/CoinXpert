package com.swapnil.TradingApp.controller;


import com.swapnil.TradingApp.model.PaymentDetails;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.service.PaymentDetailsService;
import com.swapnil.TradingApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PaymentDetailsController {

    private final UserService userService;
    private final PaymentDetailsService paymentDetailsService;


    @PostMapping("/payment-details")
    public ResponseEntity<PaymentDetails> addPaymentDetails(
            @RequestBody PaymentDetails paymentDetails,
            @RequestHeader("Authorization") String jwt
    )
    {
        Users users=userService.findUserProfileByJwt(jwt);

        PaymentDetails paymentDetails1=paymentDetailsService.addUserDetails(
                paymentDetails.getAccountNumber(),
                paymentDetails.getAccountHolderName(),
                paymentDetails.getIfsc(),
                paymentDetails.getBankName(),
                users);

        return new ResponseEntity<>(paymentDetails1, HttpStatus.CREATED);


    }

    @GetMapping("/payment-details")
    public ResponseEntity<PaymentDetails> getUserPaymentDetails(
            @RequestHeader("Authorization") String jwt
    )
    {
        Users user=userService.findUserProfileByJwt(jwt);

        PaymentDetails paymentDetails=paymentDetailsService.getUserPaymentDetails(user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }
}
