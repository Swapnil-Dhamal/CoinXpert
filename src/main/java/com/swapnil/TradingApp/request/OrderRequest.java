package com.swapnil.TradingApp.request;

import com.swapnil.TradingApp.domain.OrderType;
import lombok.Data;

@Data
public class OrderRequest {

    private String coinId;
    private double quantity;
    private OrderType orderType;
}
