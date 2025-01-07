package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistRepo extends JpaRepository<Watchlist,String> {

    Watchlist findByUser_id(Long userId);
}
