package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.Coin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CoinService {

    List<Coin> getCoinList(int page);

    String getMarketChart(String coinId, int days);

    String getCoinDetails(String coidId);

    Coin findById(String coinId);

    String searchCoin(String keyword);

    String getTpo50CoinsByMarketCap();

    String getTradingCoins();


}
