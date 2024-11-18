package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Withdrawal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount , Users users);

    Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<Withdrawal> getUsersWithdrawalHistory(Users users);

    List<Withdrawal> getAllWithdrawalRequest();
}
