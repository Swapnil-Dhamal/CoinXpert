package com.swapnil.TradingApp.controller;


import com.swapnil.TradingApp.model.Asset;
import com.swapnil.TradingApp.model.Users;
import com.swapnil.TradingApp.service.AssetService;
import com.swapnil.TradingApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;
    private final UserService userService;


    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception {

        Asset asset=assetService.getAssetById(assetId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCo0iId(
            @PathVariable String coinId,
            @RequestHeader("Authorization") String jwt
    )
    {
        Users users=userService.findUserProfileByJwt(jwt);
        Asset asset=assetService.findAssetByUserIDAndCoinId(users.getId(),  coinId);
        return ResponseEntity.ok().body(asset);

    }

    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetsForUser(
            @RequestHeader("Authorization") String jwt
    )
    {
        Users users=userService.findUserProfileByJwt(jwt);
        List<Asset> assetList=assetService.getUsersAssets(users.getId());
        return ResponseEntity.ok().body(assetList);
    }

}
