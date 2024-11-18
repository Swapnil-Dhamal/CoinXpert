package com.swapnil.TradingApp.service.impl;

import com.swapnil.TradingApp.model.Asset;
import com.swapnil.TradingApp.model.Coin;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.repo.AssetRepo;
import com.swapnil.TradingApp.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepo assetRepo;


    @Override
    public Asset createAsset(Users users, Coin coin, double quantity) {

        Asset asset=new Asset();
        asset.setUsers(users);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice());

        return assetRepo.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetId) throws Exception {

        return assetRepo.findById(assetId)
                .orElseThrow(()-> new Exception("Asset not found"));
    }

    @Override
    public Asset getAssetByUserIdAndId(Long userId, Long assetId) {
        return assetRepo.findByUserIdAndAssetId(userId, assetId);
    }

    @Override
    public List<Asset> getUsersAssets(Long userID) {
        return (List<Asset>) assetRepo.findByUserId(userID);
    }

    @Override
    public Asset updateAsset(Long assetId, double quantity) throws Exception {

        Asset oldAsset=getAssetById(assetId);
        oldAsset.setQuantity(quantity + oldAsset.getQuantity());
        return assetRepo.save(oldAsset);
    }

    @Override
    public Asset findAssetByUserIDAndCoinId(Long userId, String coinId) {
        return assetRepo.findByUserIdAndCoinId(userId, coinId);
    }

    @Override
    public void deleteAsset(Long assetId) {

        assetRepo.deleteById(assetId);

    }
}
