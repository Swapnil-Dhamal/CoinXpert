package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Wallet;
import com.swapnil.TradingApp.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepo extends JpaRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);

    List<WalletTransaction> findByWallet(Wallet wallet);
}
