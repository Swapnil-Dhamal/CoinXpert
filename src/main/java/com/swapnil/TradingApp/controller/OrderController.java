package com.swapnil.TradingApp.controller;

import com.swapnil.TradingApp.domain.OrderType;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Order;
import com.swapnil.TradingApp.model.OrderItem;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.request.OrderRequest;
import com.swapnil.TradingApp.service.CoinService;
import com.swapnil.TradingApp.service.OrderService;
import com.swapnil.TradingApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CoinService coinService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody OrderRequest req
            )

        throws Exception{

        Users user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(req.getCoinId());

        Order order=orderService.processOrder(coin, req.getQuantity() , req.getOrderType(), user);

        return ResponseEntity.ok(order) ;
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<Order> getOrderId(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId
    ) throws Exception{

        Users user=userService.findUserProfileByJwt(jwt);
        Order order=orderService.getOrderById(orderId);

        if(order.getUsers().getId().equals(user.getId())){
            return ResponseEntity.ok(order);
        }
        else {
            throw new Exception("Access denied");
        }

    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String jwt,
            @RequestParam (required = false) OrderType orderType,
            @RequestParam (required = false) String assetSymbol
            ) throws Exception

        {

            Long userId=userService.findUserProfileByJwt(jwt).getId();

            List<Order> orderList=orderService.getAllOrdersOfUser(userId, orderType, assetSymbol);

            return ResponseEntity.ok(orderList);


        }



}
