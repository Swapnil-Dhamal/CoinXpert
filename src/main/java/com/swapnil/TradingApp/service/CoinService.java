package com.swapnil.TradingApp.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.swapnil.TradingApp.model.Coin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CoinService {

    List<Coin> getCoinList(int page) throws Exception;

    String getMarketChart(String coinId, int days) throws Exception;

    String getCoinDetails(String coidId) throws Exception;

    Coin findById(String coinId) throws Exception;

    String searchCoin(String keyword) throws Exception;

    String getTop50CoinsByMarketCap() throws Exception;

    String getTradingCoins() throws Exception;


}
