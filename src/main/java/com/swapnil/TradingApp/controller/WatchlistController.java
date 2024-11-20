package com.swapnil.TradingApp.controller;


import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Watchlist;
import com.swapnil.TradingApp.service.CoinService;
import com.swapnil.TradingApp.service.UserService;
import com.swapnil.TradingApp.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private  final WatchlistService watchlistService;
    private final UserService userService;
    private final CoinService coinService;


    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        Users user=userService.findUserProfileByJwt(jwt);
        Watchlist watchlist=watchlistService.findUserWatchlist(user.getId());
        return ResponseEntity.ok(watchlist);
    }

    @PostMapping("/create")
    public ResponseEntity<Watchlist> createWatchlist(
            @RequestHeader("Authorization") String jwt
    )
    {

        Users user=userService.findUserProfileByJwt(jwt);
        Watchlist watchlist=watchlistService.createWatchlist(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(watchlist);

    }

    @GetMapping("/{watchlistId")
    public ResponseEntity<Optional<Watchlist>> getWatchlistById(
            @PathVariable Long watchlistId
    ) throws Exception {

        Optional<Watchlist> watchlist=watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId
    ) throws Exception {

        Users user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(coinId);
        Coin addedCoin=watchlistService.addItemToWatchlist(coin, user);
        return ResponseEntity.ok(addedCoin);
    }

}
