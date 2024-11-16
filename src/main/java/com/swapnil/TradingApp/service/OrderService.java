package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.domain.OrderType;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Order;
import com.swapnil.TradingApp.model.OrderItem;
import com.swapnil.TradingApp.model.Users;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderService {

    Order createOrder(Users user, OrderItem item, OrderType type);

    Order getOrderById(Long orderId);

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, Users users);
}
