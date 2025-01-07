package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDetailsRepo extends JpaRepository<PaymentDetails, Long> {

    PaymentDetails findByUser_Id(Long userId);
}
