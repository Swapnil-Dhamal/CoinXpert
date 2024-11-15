package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepo extends JpaRepository<Wallet, Long> {

    Wallet findUserById(Long userId);
}
