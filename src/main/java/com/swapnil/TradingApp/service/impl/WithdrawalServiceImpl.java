package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.WalletTransactionType;
import com.swapnil.TradingApp.domain.WithdrawalStatus;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.model.WalletTransaction;
import com.swapnil.TradingApp.model.Withdrawal;
import com.swapnil.TradingApp.repo.UserRepo;
import com.swapnil.TradingApp.repo.WalletTransactionRepo;
import com.swapnil.TradingApp.repo.WithdrawalRepo;
import com.swapnil.TradingApp.service.WithdrawalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WithdrawalServiceImpl implements WithdrawalService {

    private  final WithdrawalRepo withdrawalRepo;
    private final UserRepo userRepo;
    private final WalletTransactionRepo walletTransactionRepo;


    @Override
    public Withdrawal requestWithdrawal(Long amount, Users user) throws Exception {

        Wallet wallet = user.getWallet();

        if (wallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new Exception("Insufficient balance");
        }

        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setWithdrawalStatus(WithdrawalStatus.PENDING);
        withdrawal.setUser(user);

        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception {

        Withdrawal withdrawal = withdrawalRepo.findById(withdrawalId)
                .orElseThrow(() -> new Exception("Withdrawal not found"));

        if (withdrawal.getWithdrawalStatus() != WithdrawalStatus.PENDING) {
            throw new Exception("Withdrawal already processed");
        }

        Users user = withdrawal.getUser();
        Wallet wallet = user.getWallet();

        if (accept) {
            BigDecimal amount = BigDecimal.valueOf(withdrawal.getAmount());

            if (wallet.getBalance().compareTo(amount) < 0) {
                throw new Exception("Insufficient balance at approval time");
            }

            // Deduct balance ONLY here
            wallet.setBalance(wallet.getBalance().subtract(amount));

            WalletTransaction txn = new WalletTransaction();
            txn.setWallet(wallet);
            txn.setType(WalletTransactionType.WITHDRAWAL);
            txn.setAmount(withdrawal.getAmount());
            txn.setPurpose("Withdrawal approved");
            txn.setTransferId(UUID.randomUUID().toString());
            txn.setDate(LocalDate.now());

            walletTransactionRepo.save(txn);

            withdrawal.setWithdrawalStatus(WithdrawalStatus.SUCCESS);
        } else {
            withdrawal.setWithdrawalStatus(WithdrawalStatus.DECLINED);
        }

        withdrawal.setDate(LocalDateTime.now());

        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(Users users) {
        return withdrawalRepo.findByUser_Id(users.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepo.findAll();
    }
}
