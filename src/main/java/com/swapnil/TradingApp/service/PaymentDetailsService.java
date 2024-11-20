package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.PaymentDetails;
import com.swapnil.TradingApp.model.Users;
import org.springframework.stereotype.Service;


public interface PaymentDetailsService {


    PaymentDetails addUserDetails(String accountNumber,
                                  String accountHolderName,
                                  String ifsc,
                                  String bankName,
                                  Users user);

    PaymentDetails getUserPaymentDetails(Users user);
}
