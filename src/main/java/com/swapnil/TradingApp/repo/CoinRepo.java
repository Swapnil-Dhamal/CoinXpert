package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinRepo extends JpaRepository<Coin, String> {
}
