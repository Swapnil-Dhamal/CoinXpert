import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import Razorpay from "../../pages/images/razorpay.png";
import Stripe from "../../pages/images/stripe.png";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

const TopUpForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  const handlePaymentMethod = (value) => {
    setPaymentMethod(value);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handlesubmit = () => {
    console.log(amount, paymentMethod);
  };
  return (
    <div className="pt-10 space-y-10">
      <div>
        <h1 className="pb-1">Enter amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg"
          placeholder="$85965"
        />
      </div>

      <div>
        <h1 className="pb-1">Select payment method</h1>
        <RadioGroup
          onValueChange={(value) => handlePaymentMethod(value)}
          className="flex"
          defaultValue="RAZORPAY"
        >
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6"
              value="RAZORPAY"
              id="r1"
            />

            <Label htmlFor="r1">
              <div>
                <img className="h-8 w-25" src={Razorpay} alt="" />
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-6 w-6"
              value="STRIPE"
              id="r2"
            />

            <Label htmlFor="r2">
              <div>
                <img className="h-8 w-30" src={Stripe} alt="" />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <DialogClose className="w-full">
        <Button onClick={handlesubmit} className="w-full font-bold text-xl">
          Pay
        </Button>
      </DialogClose>
    </div>
  );
};

export default TopUpForm;
