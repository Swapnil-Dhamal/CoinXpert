import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TradingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

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
              {amount || "87459"}
            </p>
          </div>
        </div>

        {false && (
          <h1 className="text-red-500 text-center pt-4">
            Insufficient wallet balance to buy
          </h1>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage
            src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
            alt="Bitcoin"
          />
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <p>BTC</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">Bitcoin</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">$50,698</p>
            <p className="text-red-600">
              <span>-78,436.935</span>
              <span>(-0.5378%)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>
          {orderType === "BUY" ? "Available Balance" : "Available Quantity"}
        </p>
        <p>{orderType === "BUY" ? "$8700" : 588043098509}</p>
      </div>

      <div>
        <Button
          className={`w-full py-6 font-bold ${
            orderType === "SELL" ? "bg-red-500 text-white" : ""
          }`}
        >
          {orderType}
        </Button>

        <Button
          variant="link"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          className="w-full font-bold mt-5 text-gray-500 hover:text-gray-500"
        >
          {orderType === "BUY" ? "Or SELL" : "Or BUY"}
        </Button>
      </div>
    </div>
  );
};

export default TradingForm;
