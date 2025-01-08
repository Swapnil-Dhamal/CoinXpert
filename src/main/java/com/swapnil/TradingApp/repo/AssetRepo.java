package com.swapnil.TradingApp.repo;

import com.swapnil.TradingApp.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepo extends JpaRepository<Asset, Long> {


    List<Asset> findByUser_Id(Long userId);

    Asset findByUser_IdAndCoin_Id(Long userId, String coinId);

    Asset findByUser_IdAndId(Long userId, Long assetId);
}
