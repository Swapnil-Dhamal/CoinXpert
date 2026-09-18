import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { payOrderPayment } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { getAssetForUser } from "@/State/Asset/Action";

const TradingForm = () => {
  const dispatch = useDispatch();

  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(0);

  const { coin } = useSelector((store) => store);
  const walletState = useSelector((store) => store.wallet);
  const userWallet = walletState.userWallet;
  const assetState = useSelector((store) => store.asset);
  const assets = assetState.userAssets;

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUserWallet(jwt));
      dispatch(getAssetForUser({ jwt }));
    }
  }, [orderType, coin?.coinDetails?.id]);

  const price = coin?.coinDetails?.market_data?.current_price?.usd || 0;

  const userCoinAsset = assets?.find(
    (asset) => asset.coin?.id === coin?.coinDetails?.id
  );



  const userCoinQuantity = userCoinAsset?.quantity || 0;
  const currentValue = userCoinQuantity * (userCoinAsset?.coin?.current_price ?? price);

  const formattedQuantity =
    userCoinQuantity > 0 ? Number(userCoinQuantity).toFixed(6) : "0";

  const calculateBuyCost = (amount, price) => {
    const volume = amount / price;
    const decimalPlaces = Math.max(2, price.toString().split(".")[0]?.length || 2);
    return volume.toFixed(decimalPlaces);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && price) {
      setQuantity(calculateBuyCost(Number(value), price));
    } else {
      setQuantity(0);
    }
  };

  const handleSubmit = async () => {
    const orderData = {
      coinId: coin?.coinDetails?.id,
      quantity: Number(quantity),
      orderType,
    };

    dispatch(payOrderPayment({ jwt, order: orderData }));
    dispatch(getUserWallet(jwt));
    dispatch(getAssetForUser({ jwt }));

    setAmount("");
    setQuantity(0);
  };

  const numericAmount = Number(amount);

  const isInsufficient =
    (orderType === "BUY" && numericAmount > (userWallet?.balance || 0)) ||
    (orderType === "SELL" && Number(quantity) > userCoinQuantity);

  return (
    <div className="space-y-10 p-5">

      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-4 px-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount..."
            onChange={handleChange}
            type="number"
            name="amount"
            value={amount}
          />
          <div>
            <p className="border flex justify-center text-2xl items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>

        {isInsufficient && (
          <p className="text-red-500 text-center pt-4">
            {orderType === "BUY"
              ? "Insufficient wallet balance"
              : "Insufficient coin quantity"}
          </p>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage
            src={coin?.coinDetails?.image?.large || "https://cryptologos.cc/logos/bitcoin-btc-logo.png"}
            alt={coin?.coinDetails?.name}
          />
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <p className="uppercase">{coin?.coinDetails?.symbol}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coin?.coinDetails?.name}</p>
          </div>

          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">${price.toLocaleString()}</p>
            <p
              className={
                coin?.coinDetails?.market_data?.price_change_percentage_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              <span>{coin?.coinDetails?.market_data?.price_change_24h?.toFixed(2)}</span>
              <span> ({coin?.coinDetails?.market_data?.price_change_percentage_24h?.toFixed(2)}%)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Balance" : "Available Quantity"}</p>

        <div className="text-right">
          <p>
            {orderType === "BUY"
              ? `$${userWallet?.balance?.toLocaleString() || 0}`
              : formattedQuantity}
          </p>
          {orderType === "SELL" && userCoinQuantity > 0 && (
            <p className="text-sm text-gray-400">≈ ${currentValue.toFixed(2)}</p>
          )}
        </div>
      </div>

      <div>
        <Button
          onClick={handleSubmit}
          disabled={isInsufficient || !amount}
          className={`w-full py-6 font-bold ${
            orderType === "SELL" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {orderType}
        </Button>

        <Button
          variant="link"
          onClick={() => {
            const newType=orderType==="BUY" ? "SELL" : "BUY";

            setOrderType(newType);
            setAmount("");
            setQuantity(0);
          }}
          className="w-full font-bold mt-5 text-gray-500 hover:text-gray-500"
        >
          {orderType === "BUY" ? "Or SELL" : "Or BUY"}
        </Button>
      </div>

    </div>
  );
};

export default TradingForm;