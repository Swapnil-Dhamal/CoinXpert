package com.swapnil.TradingApp.controller;

import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.model.Withdrawal;
import com.swapnil.TradingApp.service.UserService;
import com.swapnil.TradingApp.service.WalletService;
import com.swapnil.TradingApp.service.WithdrawalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class WithdrawalController {

    private final WithdrawalService withdrawalService;
    private final WalletService walletService;
    private final UserService userService;

    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long amount
    )
    {
        Users user = userService.findUserProfileByJwt(jwt);
        Wallet userWallet=walletService.getUserWallet(user);

        Withdrawal withdrawal=withdrawalService.requestWithdrawal(amount, user);

        walletService.addBalance(userWallet, -withdrawal.getAmount());

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);

    }



    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawal(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id,
            @PathVariable boolean accept
    ) throws Exception {
        Users user = userService.findUserProfileByJwt(jwt);
        Withdrawal withdrawal=withdrawalService.proceedWithdrawal(id, accept);
        Wallet userWallet=walletService.getUserWallet(user);


        // If withdrawal request is failed or denied by the admin
        if(!accept){
            walletService.addBalance(userWallet, withdrawal.getAmount());
        }


        return new ResponseEntity<>(withdrawal, HttpStatus.OK);

    }

    @GetMapping("/api/withdrawal/history")
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String jwt){

        Users user=userService.findUserProfileByJwt(jwt);

        List<Withdrawal> withdrawalList=withdrawalService.getUsersWithdrawalHistory(user);

        return new ResponseEntity<>(withdrawalList, HttpStatus.OK);
    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(
            @RequestHeader("Authorization") String jwt){

        Users user=userService.findUserProfileByJwt(jwt);

        List<Withdrawal> withdrawalList=withdrawalService.getAllWithdrawalRequest();

        return new ResponseEntity<>(withdrawalList, HttpStatus.OK);
    }



}
