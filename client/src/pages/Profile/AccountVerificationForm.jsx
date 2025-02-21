import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const TwoStepVerificationForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("Entered OTP:", value);
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full">
        <div className="flex justify-between items-center w-full">
          <p className="font-medium">Email:</p>
          <p className="text-gray-500">swapnil@gmail.com</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Send OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
              </DialogHeader>

              <div className="py-5 flex gap-5 justify-center items-center">
                <InputOTP
                  value={value}
                  onChange={(val) => setValue(val)}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <DialogClose asChild>
                <div className="flex justify-center ">
                  <Button
                    onClick={handleSubmit}
                    className="w-[10rem] flex items-center justify-center"
                  >
                    Submit
                  </Button>
                </div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TwoStepVerificationForm;
