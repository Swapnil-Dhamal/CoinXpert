package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.Order;
import com.swapnil.TradingApp.model.Wallet;
import org.springframework.stereotype.Service;
import com.swapnil.TradingApp.model.Users;

@Service
public interface WalletService {

    Wallet getUserWallet(Users user);

    Wallet addBalance(Wallet wallet, Long money);

    Wallet findWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(Users sender, Wallet receiver, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, Users users) throws Exception;


}
