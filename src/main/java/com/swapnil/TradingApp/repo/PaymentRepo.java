package com.swapnil.TradingApp.repo;


import com.swapnil.TradingApp.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<PaymentOrder, String> {
}
