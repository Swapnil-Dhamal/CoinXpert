package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepo extends JpaRepository<WalletTransaction, Long> {

    List<WalletTransaction> findByWallet(Wallet wallet);

}
