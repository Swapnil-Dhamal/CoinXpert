package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Watchlist;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface WatchlistService {

    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(Users users);

    Optional<Watchlist> findById(String id) throws Exception;

    boolean addItemToWatchlist(Coin coin, Users users);
}
