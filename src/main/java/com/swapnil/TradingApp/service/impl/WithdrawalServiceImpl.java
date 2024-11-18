package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.domain.WithdrawalStatus;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.model.Withdrawal;
import com.swapnil.TradingApp.repo.WithdrawalRepo;
import com.swapnil.TradingApp.service.WithdrawalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WithdrawalServiceImpl implements WithdrawalService {

    private  final WithdrawalRepo withdrawalRepo;


    @Override
    public Withdrawal requestWithdrawal(Long amount, Users users) {

        Withdrawal withdrawal=new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setWithdrawalStatus(WithdrawalStatus.PENDING);
        withdrawal.setUsers(users);
        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception {

        Optional<Withdrawal> withdrawal=withdrawalRepo.findById(withdrawalId);
        if(withdrawal.isEmpty()){
            throw new Exception("Withdrawal not present");
        }

        Withdrawal withdrawal1=withdrawal.get();
        withdrawal1.setDate(LocalDateTime.now());

        if(accept){
            withdrawal1.setWithdrawalStatus(WithdrawalStatus.SUCCESS);
        }
        else{
            withdrawal1.setWithdrawalStatus(WithdrawalStatus.PENDING);
        }

        return withdrawalRepo.save(withdrawal1);
    }

    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(Users users) {
        return withdrawalRepo.findByUserId(users.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepo.findAll();
    }
}
