package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepo extends JpaRepository<Asset, Long> {


    Asset findByUserId(Long userId);

    Asset findByUserIdAndCoinId(Long userId, String coinId);
}
