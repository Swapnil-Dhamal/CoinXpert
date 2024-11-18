package com.swapnil.TradingApp.service;

import com.swapnil.TradingApp.model.Asset;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Users;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AssetService {

    Asset createAsset(Users users, Coin coin, double quantity);

    Asset getAssetById(Long assetId) throws Exception;

    Asset getAssetByUserIdAndId(Long userId, Long assetId);

    List<Asset> getUsersAssets(Long userID);

    Asset updateAsset(Long assetId, double quantity) throws Exception;

    Asset findAssetByUserIDAndCoinId(Long userId, String coinId);

    void deleteAsset(Long assetId);


}
