package com.swapnil.TradingApp.controller;


import com.razorpay.Payment;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.swapnil.TradingApp.domain.PaymentMethod;
import com.swapnil.TradingApp.model.Order;
import com.swapnil.TradingApp.model.PaymentOrder;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.response.PaymentResponse;
import com.swapnil.TradingApp.service.OrderService;
import com.swapnil.TradingApp.service.PaymentService;
import com.swapnil.TradingApp.service.UserService;
import com.swapnil.TradingApp.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PaymentController {

    private final UserService userService;
    private final PaymentService paymentService;
    private final WalletService walletService;
    private final OrderService orderService;


    @PostMapping("/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(

            @RequestHeader("Authorization") String jwt,
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount
            ) throws RazorpayException, StripeException {
        Users user=userService.findUserProfileByJwt(jwt);

        PaymentResponse paymentResponse;

        PaymentOrder paymentOrder=paymentService.createOrder(user, amount, paymentMethod);

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            paymentResponse = paymentService.createRazorpayPaymentLink(user, amount, paymentOrder.getId());
        }
        else{
            paymentResponse = paymentService.createStripePaymentLink(user, amount, Long.valueOf(paymentOrder.getId()));
        }

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }



}
