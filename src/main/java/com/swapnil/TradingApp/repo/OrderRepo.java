package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

    Order findByUserId(Long userId);
}
