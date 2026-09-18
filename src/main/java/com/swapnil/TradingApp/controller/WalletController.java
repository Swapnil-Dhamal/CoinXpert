package com.swapnil.TradingApp.controller;

import com.swapnil.TradingApp.model.PaymentOrder;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.model.WalletTransaction;
import com.swapnil.TradingApp.service.PaymentService;
import com.swapnil.TradingApp.service.UserService;
import com.swapnil.TradingApp.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;
    private final UserService userService;
    private  final PaymentService paymentService;


    @GetMapping("/userWallet")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt){

        Users user=userService.findUserProfileByJwt(jwt);


        Wallet wallet=walletService.getUserWallet(user);
        System.out.println("Wallet id: "+wallet.getId());

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);

    }

    @GetMapping("/transactions")
    public ResponseEntity<List<WalletTransaction>> getWalletTransactions(
            @RequestHeader("Authorization") String jwt
    ){

        System.out.println("Request for wallet transactions");

        try {
            Users user = userService.findUserProfileByJwt(jwt);

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle user not found
            }
            List<WalletTransaction> walletTransaction = walletService.getWalletTransaction(user);

            if(walletTransaction.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(walletTransaction, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader("Authorization") String jwt,
                                                         @PathVariable Long walletId,
                                                         @RequestBody WalletTransaction req) throws Exception {

        Users senderUser=userService.findUserProfileByJwt(jwt);

        Wallet receiverWallet=walletService.findWalletById(walletId);
        System.out.println("Receiver wallet: "+ receiverWallet);

        Wallet transfer=walletService.walletToWalletTransfer(senderUser, receiverWallet, req.getAmount());

        return new ResponseEntity<>(transfer, HttpStatus.ACCEPTED);
    }

    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addBalanceToUserWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name = "orderId") String orderId,
            @RequestParam(name = "paymentId") String paymentId
    ) throws Exception {


        Users user=userService.findUserProfileByJwt(jwt);
        Wallet userWallet=walletService.getUserWallet(user);
        PaymentOrder paymentOrder=paymentService.getPaymentOrderById(orderId);
        boolean status= paymentService.proceedPaymentOrder(paymentOrder, paymentId);

        if(userWallet.getBalance()==null){
            userWallet.setBalance(BigDecimal.valueOf(0));
        }

        if(status){
            userWallet=walletService.addBalance(userWallet, paymentOrder.getAmount());
        }

        return new ResponseEntity<>(userWallet, HttpStatus.ACCEPTED);

    }

    @PutMapping("/withdraw/{amount}")
    public ResponseEntity<Wallet> withdrawFromWallet(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long amount

    ) throws Exception {


        System.out.println("Amount to be withdraw: "+amount);
        Users user=userService.findUserProfileByJwt(jwt);
        Wallet userWallet=walletService.getUserWallet(user);
//        PaymentOrder paymentOrder=paymentService.getPaymentOrderById(orderId);
//        boolean status= paymentService.proceedPaymentOrder(paymentOrder, paymentId);

        if(userWallet.getBalance()==null){
            throw new RuntimeException("Wallet balance is 0");
        }

        userWallet=walletService.withdrawBalanceRequest(userWallet, amount, user);


        return new ResponseEntity<>(userWallet, HttpStatus.ACCEPTED);

    }






}
