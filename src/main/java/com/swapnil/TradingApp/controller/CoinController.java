package com.swapnil.TradingApp.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.service.CoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coins")
@RequiredArgsConstructor
public class CoinController {

    private final ObjectMapper objectMapper;
    private final CoinService coinService;

    @GetMapping
    ResponseEntity<List<Coin>> getCoinList(@RequestParam("page") int page) throws Exception {

        List<Coin> coinList=coinService.getCoinList(page);
        return new ResponseEntity<>(coinList, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{coinId}/chart")
    ResponseEntity<JsonNode> getMarketChart(@PathVariable("coinId") String coinId, @RequestParam("days") int days) throws Exception {

        String marketChart=coinService.getMarketChart(coinId, days);
        JsonNode jsonNode=objectMapper.readTree(marketChart);

        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }

    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode> getCoinDetails(@PathVariable("coinId") String coinId) throws Exception {

        String coinDetail=coinService.getCoinDetails(coinId);
        JsonNode jsonNode=objectMapper.readTree(coinDetail);

        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    ResponseEntity<JsonNode> searchCoin(@RequestParam("keyword") String keyword) throws Exception {

        String coin=coinService.searchCoin(keyword);
        JsonNode jsonNode=objectMapper.readTree(coin);

        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }

    @GetMapping("/top50")
    ResponseEntity<JsonNode> getTop50Coins() throws Exception {

        String coin=coinService.getTop50CoinsByMarketCap();
        JsonNode jsonNode=objectMapper.readTree(coin);

        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }

    @GetMapping("/trending")
    ResponseEntity<JsonNode> trendingCoins() throws Exception {

        String coin=coinService.getTradingCoins();
        JsonNode jsonNode=objectMapper.readTree(coin);

        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }
}
