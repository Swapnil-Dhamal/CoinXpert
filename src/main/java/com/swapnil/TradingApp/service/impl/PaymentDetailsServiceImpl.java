package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.model.PaymentDetails;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.PaymentDetailsRepo;
import com.swapnil.TradingApp.service.PaymentDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    private final PaymentDetailsRepo paymentDetailsRepo;

    @Override
    public PaymentDetails addUserDetails(String accountNumber,
                                         String accountHolderName,
                                         String ifsc,
                                         String bankName,
                                         Users user) {

        PaymentDetails paymentDetails=new PaymentDetails();

        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setIfsc(ifsc);
        paymentDetails.setBankName(bankName);
        paymentDetails.setUser(user);
        return paymentDetailsRepo.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(Users user) {

        return paymentDetailsRepo.findByUser_Id(user.getId());

    }
}
