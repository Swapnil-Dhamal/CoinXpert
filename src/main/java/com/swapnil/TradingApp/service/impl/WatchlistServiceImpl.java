package com.swapnil.TradingApp.service.impl;


import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Watchlist;
import com.swapnil.TradingApp.repo.WatchlistRepo;
import com.swapnil.TradingApp.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepo watchlistRepo;


    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {

        Watchlist watchlist=watchlistRepo.findByUser_id(userId);

        if(watchlist== null){
            throw new Exception("Watchlist not found");
        }
        return watchlist;
    }

    @Override
    public Watchlist createWatchlist(Users users) {

        Watchlist watchlist=new Watchlist();
        watchlist.setUser(users);
        watchlistRepo.save(watchlist);
        return watchlist;
    }

    @Override
    public Optional<Watchlist> findById(String id) throws Exception {

        Optional<Watchlist> optionalWatchlist=watchlistRepo.findById(id);

        if(optionalWatchlist.isEmpty()){
            throw  new Exception("Watchlist not found");
        }
        return optionalWatchlist;
    }

    @Override
    public boolean addItemToWatchlist(Coin coin, Users users) {

        Watchlist watchlist=watchlistRepo.findByUser_id(users.getId());

        if(watchlist==null){
            watchlist=new Watchlist();
            watchlist.setUser(users);
            watchlist.setCoin(new ArrayList<>());
        }

        List<Coin> coins=watchlist.getCoin();
        if(coins.contains(coin)){
            coins.remove(coin);
            watchlistRepo.save(watchlist);
            return false;
        }
        else{
            coins.add(coin);
            watchlistRepo.save(watchlist);
            return true;
        }
    }
}
