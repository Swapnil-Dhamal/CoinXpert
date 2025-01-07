package com.swapnil.TradingApp.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.repo.CoinRepo;
import com.swapnil.TradingApp.service.CoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@Service
@RequestMapping("/api")
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {

    private final CoinRepo coinRepo;
    private final ObjectMapper objectMapper;


    @Override
    public List<Coin> getCoinList(int page) throws Exception {
        String url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page="+page;

        RestTemplate restTemplate=new RestTemplate();

        try {

            HttpHeaders headers=new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            List<Coin> coinList=objectMapper.readValue(response.getBody(),
                    new TypeReference<List<Coin>>() {});

            return coinList;
        }
        catch(HttpClientErrorException | HttpServerErrorException e){
            throw new Exception(e.getMessage());
        }

    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {
        // Base URL with placeholders for coinId and days
        String url = "https://api.coingecko.com/api/v3/coins/{coinId}/market_chart?vs_currency=usd&days={days}";

        RestTemplate restTemplate = new RestTemplate();

        try {
            // Create headers (if needed)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON); // Ensure the request expects JSON

            // Prepare HTTP entity (no body in GET request)
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Use UriComponentsBuilder to set the values for coinId and days
            UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url)
                    .buildAndExpand(coinId, days); // Replace placeholders with actual values

            // Make the API request using the final URI string
            ResponseEntity<String> response = restTemplate.exchange(
                    uriComponents.toUriString(), // Convert UriComponents to URI String
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            // Return the response body (market chart data)
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // Handle HTTP errors
            throw new Exception("Error response from CoinGecko API: " + e.getMessage(), e);
        } catch (Exception e) {
            // Handle other unexpected errors
            throw new Exception("Unexpected error occurred while fetching market chart", e);
        }
    }



    @Override
    public String getCoinDetails(String coinId) throws Exception {
        String url="https://api.coingecko.com/api/v3/coins/"+coinId;

        RestTemplate restTemplate=new RestTemplate();

        try {

            HttpHeaders headers=new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            JsonNode jsonNode=objectMapper.readTree(response.getBody());

            Coin coin=new Coin();

            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());
            coin.setImage(jsonNode.get("image").get("large").asText());

            JsonNode marketData=jsonNode.get("market_data");

            coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("usd").asLong());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());
            coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("usd").asDouble());
            coin.setPriceChange24h(marketData.get("price_change_24h").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_24h").asDouble());
            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asLong());
            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h").asLong());
            coin.setTotalSupply(marketData.get("total_supply").asLong());

            coinRepo.save(coin);
            return response.getBody();

        }
        catch(HttpClientErrorException | HttpServerErrorException e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Coin findById(String coinId) throws Exception {

        Optional<Coin> coin=coinRepo.findById(coinId);

        System.out.println("request from watchlist for: "+coinId);
        System.out.println("Coin : "+coin);
        if(coin.isEmpty()) throw new Exception("Coin not found");
        return coin.get();
    }

    @Override
    public String searchCoin(String keyword) throws Exception {


        String url="https://api.coingecko.com/api/v3/search?query="+keyword;

        RestTemplate restTemplate=new RestTemplate();

        try {

            HttpHeaders headers=new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();

        }
        catch(HttpClientErrorException | HttpServerErrorException e){
            throw new Exception(e.getMessage());
        }
        }

    @Override
    public String getTop50CoinsByMarketCap() throws Exception {
        String url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";

        RestTemplate restTemplate=new RestTemplate();

        try {

            HttpHeaders headers=new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();

        }
        catch(HttpClientErrorException | HttpServerErrorException e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTradingCoins() throws Exception {
        String url="https://api.coingecko.com/api/v3/search/trending";

        RestTemplate restTemplate=new RestTemplate();

        try {

            HttpHeaders headers=new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

            ResponseEntity<String> response=restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();

        }
        catch(HttpClientErrorException | HttpServerErrorException e){
            throw new Exception(e.getMessage());
        }
    }
}
