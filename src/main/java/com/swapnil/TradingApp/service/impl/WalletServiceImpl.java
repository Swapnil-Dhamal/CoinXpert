package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.OrderType;
import com.swapnil.TradingApp.domain.WalletTransactionType;
import com.swapnil.TradingApp.domain.WithdrawalStatus;
import com.swapnil.TradingApp.model.*;
import com.swapnil.TradingApp.repo.UserRepo;
import com.swapnil.TradingApp.repo.WalletRepo;
import com.swapnil.TradingApp.repo.WalletTransactionRepo;
import com.swapnil.TradingApp.repo.WithdrawalRepo;
import com.swapnil.TradingApp.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepo walletRepo;
    private final WalletTransactionRepo walletTransactionRepo;
    private final UserRepo userRepo;
    private final WithdrawalRepo withdrawalRepo;

    @Override
    public Wallet getUserWallet(Users user) {

        Optional<Wallet> optionalWallet= Optional.ofNullable(walletRepo.findByUserId(user.getId()));

        Wallet wallet=optionalWallet.orElseGet(()->{
            Wallet newWallet=new Wallet();
            newWallet.setUser(user);
            newWallet.setBalance(BigDecimal.ZERO);
            return walletRepo.save(newWallet);

        });
        return wallet;
    }

    @Override
    @Transactional
    public Wallet addBalance(Wallet wallet, Long money) {

        BigDecimal balance=wallet.getBalance();
        BigDecimal newBalance=balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);

        WalletTransaction transaction=new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setTransferId(UUID.randomUUID().toString());
        transaction.setDate(LocalDate.now());
        transaction.setAmount(money);
        transaction.setType(WalletTransactionType.ADD_MONEY);
        transaction.setPurpose("Amount added to wallet");
        walletTransactionRepo.save(transaction);

        return walletRepo.save(wallet);

    }

    @Override
    public Wallet findWalletById(Long id) throws Exception {

        Optional<Wallet> wallet=walletRepo.findById(id);
        System.out.println("Found wallet: "+ wallet);
        if(wallet.isPresent()){
            return wallet.get();
        }

        throw new Exception("Wallet not found");
    }

    @Override
    @Transactional
    public Wallet  walletToWalletTransfer(Users sender, Wallet receiver, Long amount) throws Exception {

        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be greater than zero");
        }

        Wallet senderWallet = getUserWallet(sender);
        Wallet receiverWallet = receiver;

        if (senderWallet == null || receiverWallet == null) {
            throw new Exception("Sender or receiver wallet not found");
        }

        // Check sender balance
        if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new Exception("Insufficient balance...");
        }

        // Update sender balance
        BigDecimal senderBalance = senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(senderBalance);
        walletRepo.save(senderWallet);

        // Update receiver balance
        BigDecimal receiverBalance = receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
        receiverWallet.setBalance(receiverBalance);
        walletRepo.save(receiverWallet);

        // Record transactions for both sender and receiver
        WalletTransaction senderTxn = new WalletTransaction();
        senderTxn.setWallet(senderWallet);
        senderTxn.setType(WalletTransactionType.WALLET_TRANSFER);
        senderTxn.setDate(LocalDate.now());
        senderTxn.setTransferId(UUID.randomUUID().toString());
        senderTxn.setPurpose("Money sent to " + receiver.getUser().getFullName());
        senderTxn.setAmount(amount);
        walletTransactionRepo.save(senderTxn);

        WalletTransaction receiverTxn = new WalletTransaction();
        receiverTxn.setWallet(receiverWallet);
        receiverTxn.setType(WalletTransactionType.WALLET_TRANSFER);
        receiverTxn.setDate(LocalDate.now());
        receiverTxn.setTransferId(senderTxn.getTransferId()); // same ID for traceability
        receiverTxn.setPurpose("Money received from " + sender.getFullName());
        receiverTxn.setAmount(amount);
        walletTransactionRepo.save(receiverTxn);

        return senderWallet;
    }

    @Override
    @Transactional
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

    @Override
    @Transactional
    public List<WalletTransaction> getWalletTransaction(Users user) throws Exception {

        Wallet userWallet=user.getWallet();
        System.out.println("User wallet: "+userWallet);
        if(userWallet==null){
            throw new Exception("User wallet not found");
        }
        return walletTransactionRepo.findByWallet(userWallet);
    }

//    @Override
//    @Transactional
//    public Wallet withdrawBalance(Wallet userWallet, Long amount, Users user) throws Exception {
//
//        BigDecimal currentBalance=userWallet.getBalance();
//        BigDecimal amountToBeWithdrawn=BigDecimal.valueOf(amount);
//
//        if(currentBalance.compareTo(amountToBeWithdrawn) >= 0){
//            BigDecimal newBalance=currentBalance.subtract(amountToBeWithdrawn);
//            userWallet.setBalance(newBalance);
//        }
//        else{
//            throw new Exception("Insufficient balance");
//        }
//
//        WalletTransaction transaction=new WalletTransaction();
//        transaction.setWallet(userWallet);
//        transaction.setTransferId(UUID.randomUUID().toString());
//        transaction.setDate(LocalDate.now());
//        transaction.setAmount(amount);
//        transaction.setType(WalletTransactionType.WITHDRAWAL);
//        transaction.setPurpose("Amount withdraw");
//        walletTransactionRepo.save(transaction);
//
//
//        Users managedUser = userRepo.findById(user.getId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Withdrawal newWithdrawal=new Withdrawal();
//        newWithdrawal.setWithdrawalStatus(WithdrawalStatus.SUCCESS);
//        newWithdrawal.setAmount(amount);
//        newWithdrawal.setUser(managedUser);
//        withdrawalRepo.save(newWithdrawal);
//
//        System.out.println("Withdraw success");
//        return walletRepo.save(userWallet);
//    }


    @Override
    @Transactional
    public Wallet withdrawBalanceRequest(Wallet userWallet, Long amount, Users user) throws Exception {



        Users managedUser = userRepo.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Withdrawal newWithdrawal=new Withdrawal();
        newWithdrawal.setWithdrawalStatus(WithdrawalStatus.PENDING);
        newWithdrawal.setAmount(amount);
        newWithdrawal.setUser(managedUser);
        withdrawalRepo.save(newWithdrawal);

        System.out.println("Withdraw request saved");
        return walletRepo.save(userWallet);
    }


}
