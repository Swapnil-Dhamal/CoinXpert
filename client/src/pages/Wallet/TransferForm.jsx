import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { transferMoney } from "@/State/Wallet/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TransferForm = () => {

  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);
  const [formData, setFormData] = React.useState({ amount: "", walletId: "", purpose:"" });

  const handleSubmit = () => {
    dispatch(transferMoney({
      jwt:localStorage.getItem("jwt"),
      walletId:formData.walletId,
      reqData:{
        amount:formData.amount,
        purpose:formData.purpose
      }
    }))
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1 font-bold">Enter Amount</h1>
        <Input
          name="amount"
          type="number"
          onChange={handleChange}
          value={formData.amount}
          className="py-5 w-full text-lg"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <h1 className="pb-1 font-bold">Wallet ID</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-5 w-full text-lg"
          placeholder="Enter Wallet ID"
        />
      </div>

         <div>
        <h1 className="pb-1 font-bold">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-5 w-full text-lg"
          placeholder="Enter purpose (e.g., Payment, Refund)"
        />
      </div>

      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full font-bold text-xl">
          Transfer
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
