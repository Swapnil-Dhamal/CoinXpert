package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.OrderStatus;
import com.swapnil.TradingApp.domain.OrderType;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Order;
import com.swapnil.TradingApp.model.OrderItem;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.OrderItemRepo;
import com.swapnil.TradingApp.repo.OrderRepo;
import com.swapnil.TradingApp.service.OrderService;
import com.swapnil.TradingApp.service.WalletService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final WalletService walletService;
    private final OrderItemRepo orderItemRepo;

    @Override
    public Order createOrder(Users user, OrderItem orderItem, OrderType orderType) {

        double price=orderItem.getCoin().getCurrentPrice() * orderItem.getQuantity();

        Order order=new Order();
        order.setPrice(BigDecimal.valueOf(price));
        order.setOrderItem(orderItem);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderType(orderType);
        order.setUsers(user);
        order.setTimeStamp(LocalDateTime.now());

        return orderRepo.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) throws Exception {

            return orderRepo.findById(orderId).orElseThrow(()-> new Exception("Order not found"));

    }

    @Override
    public List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol) {
        return orderRepo.findByUserId(userId);
    }


    private OrderItem createOrderItem(Coin coin, double quantity, double sellPrice, double buyPrice){

        OrderItem orderItem1=new OrderItem();
        orderItem1.setCoin(coin);
        orderItem1.setQuantity(quantity);
        orderItem1.setBuyPrice(buyPrice);
        orderItem1.setSellPrice(sellPrice);
        return orderItemRepo.save(orderItem1);
    }


    @Transactional
    public Order buyAsset(Coin coin, double quantity, Users users) throws Exception {

        if(quantity<=0){
            throw new Exception("Quantity must be > 0");
        }

        double buyPrice= coin.getCurrentPrice();

        OrderItem orderItem=createOrderItem(coin, quantity, 0, buyPrice);

        Order order=createOrder(users, orderItem, OrderType.BUY);
        orderItem.setOrder(order);

        walletService.payOrderPayment(order, users);

        order.setOrderStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY);

        Order savedOrder=orderRepo.save(order);

        // create assets

        return null;
    }


    @Transactional
    public Order sellAsset(Coin coin, double quantity, Users users) throws Exception {

        if(quantity<=0){
            throw new Exception("Quantity must be > 0");
        }

        double sellPrice= coin.getCurrentPrice();

        double buyPrice=assetToSell.getPrice();

        OrderItem orderItem=createOrderItem(coin, quantity, sellPrice,0 );

        Order order=createOrder(users, orderItem, OrderType.SELL);
        orderItem.setOrder(order);

        if(assetToSell.getQuantity() >= quantity){

            order.setOrderStatus(OrderStatus.SUCCESS);
            order.setOrderType(OrderType.SELL);

            Order savedOrder=orderRepo.save(order);

            walletService.payOrderPayment(order, users);

            Asset updatedAsset= assetService.updateAsset(assetToSell.getId(), -quantity);
            if(updatedAsset.getQuantity() * coin.getCurrentPrice() <= 1){
                assetService.deleteAsset(updatedAsset.getId);
            }

            return savedOrder;

        }

        throw new Exception("Insufficient quantity to sell");

    }

    @Override
    @Transactional
    public Order processOrder(Coin coin, double quantity, OrderType orderType, Users users) {

        if(orderType.equals(OrderType.BUY)){
            return buyAsset(coin, quantity, users);
        }
        else if(orderType.equals(OrderType.SELL)){
            return sellAsset(coin, quantity, users);
        }

        throw new Exception("Invalid order type");
    }
}
