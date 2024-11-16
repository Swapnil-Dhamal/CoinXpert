package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.OrderType;
import com.swapnil.TradingApp.model.Order;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.repo.WalletRepo;
import com.swapnil.TradingApp.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepo walletRepo;


    @Override
    public Wallet getUserWallet(Users user) {

        Wallet wallet=walletRepo.findUserById(user.getId());

        if(wallet == null){
            wallet=new Wallet();
            wallet.setUser(user);
        }

        return  wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money) {

        BigDecimal balance=wallet.getBalance();
        BigDecimal newBalance=balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);
        return walletRepo.save(wallet);

    }

    @Override
    public Wallet findWalletById(Long id) throws Exception {

        Optional<Wallet> wallet= Optional.ofNullable(walletRepo.findUserById(id));

        if(wallet.isPresent()){
            return wallet.get();
        }

        throw new Exception("Wallet not found");
    }

    @Override
    public Wallet walletToWalletTransfer(Users sender, Wallet receiverWallet, Long amount) throws Exception {

        Wallet senderWallet=getUserWallet(sender);

        if(senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount))< 0){
            throw new Exception("Insufficient balance...");
        }

        BigDecimal senderBalance=senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(senderBalance);
        walletRepo.save(senderWallet);


        BigDecimal receiverBalance=receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
        receiverWallet.setBalance(receiverBalance);
        walletRepo.save(receiverWallet);

        return senderWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, Users users) throws Exception {

        Wallet wallet=getUserWallet(users);

        if(order.getOrderType().equals(OrderType.BUY)){
            BigDecimal newBalance=wallet.getBalance().subtract(order.getPrice());

            if(newBalance.compareTo(order.getPrice()) < 0){
                throw new Exception("Insufficient balance for this transaction");
            }

            wallet.setBalance(newBalance);
        }

        else{
            BigDecimal newBalance=wallet.getBalance().add(order.getPrice());
            wallet.setBalance(newBalance);
        }

        walletRepo.save(wallet);
        return wallet;
    }
}
