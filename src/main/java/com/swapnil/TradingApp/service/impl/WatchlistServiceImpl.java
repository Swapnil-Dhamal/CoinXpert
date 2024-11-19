package com.swapnil.TradingApp.service.impl;


import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Watchlist;
import com.swapnil.TradingApp.repo.WatchlistRepo;
import com.swapnil.TradingApp.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepo watchlistRepo;


    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {

        Watchlist watchlist=watchlistRepo.findUserWatchlist(userId);

        if(watchlist== null){
            throw new Exception("Watchlist not found");
        }
        return watchlist;
    }

    @Override
    public Watchlist createWatchlist(Users users) {

        Watchlist watchlist=new Watchlist();
        watchlist.setUsers(users);
        return watchlist;
    }

    @Override
    public Optional<Watchlist> findById(Long id) throws Exception {

        Optional<Watchlist> optionalWatchlist=watchlistRepo.findById(id);

        if(optionalWatchlist.isEmpty()){
            throw  new Exception("Watchlist not found");
        }
        return optionalWatchlist;
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, Users users) {

        Watchlist watchlist=watchlistRepo.findUserWatchlist(users.getId());

        if(watchlist.getCoin().contains(coin)){
            watchlist.getCoin().remove(coin);
        }
        else{
            watchlist.getCoin().add(coin);
        }
        watchlistRepo.save(watchlist);
        return coin;
    }
}
