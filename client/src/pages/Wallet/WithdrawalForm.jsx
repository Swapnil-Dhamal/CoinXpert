import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Bank from "../images/bank.png";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

const WithdrawalForm = () => {
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    console.log(amount);
  };

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p>Available balance</p>
        <p>$4366</p>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bold">Enter withdrawal amount</h1>

        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            placeholder="Enter amount"
            type="number"
            className="withdrawalInput mt-5 h-10 w-64 border-none outline-none 
            focus:outline-none px-0 font-bold text-2xl text-center"
          />
        </div>
      </div>

      <div>
        <p className="pb-2 ">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img className="h-8 w-8" src={Bank} alt="" />

          <div>
            <p className="text-xl font-bold ">Yes Bank</p>
            <p className="text-xs">********3409</p>
          </div>
        </div>
      </div>

      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full font-bold text-xl">
          Withdraw
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
