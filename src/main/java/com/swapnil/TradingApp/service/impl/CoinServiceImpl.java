package com.swapnil.TradingApp.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.repo.CoinRepo;
import com.swapnil.TradingApp.service.CoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {

    private final CoinRepo coinRepo;
    private final ObjectMapper objectMapper;


    @Override
    public List<Coin> getCoinList(int page) {
        String url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page="+page;

        RestTemplate restTemplate=new RestTemplate();

        return List.of();
    }

    @Override
    public String getMarketChart(String coinId, int days) {
        return "";
    }

    @Override
    public String getCoinDetails(String coidId) {
        return "";
    }

    @Override
    public Coin findById(String coinId) {
        return null;
    }

    @Override
    public String searchCoin(String keyword) {
        return "";
    }

    @Override
    public String getTpo50CoinsByMarketCap() {
        return "";
    }

    @Override
    public String getTradingCoins() {
        return "";
    }
}
