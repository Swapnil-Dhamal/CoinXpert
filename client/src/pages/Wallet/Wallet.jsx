import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { CopyIcon, DollarSign, Download, ShuffleIcon, Upload, WalletIcon } from "lucide-react";
import React from "react";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";

const Wallet = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9 relative">
            {/* Left Section: Wallet Icon and Title */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <WalletIcon className="h-6 w-6" />
                <span className="text-lg font-bold">My Wallet</span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <p className="ml-8 text-gray-200 text-sm">#A598ED</p>
                <CopyIcon size={12} className="cursor-pointer hover:text-slate-300" />
              </div>
            </div>

            {/* Right Section: Reload Icon */}
            <div className="absolute top-2 right-2">
              <ReloadIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center">
              <DollarSign/>
              <span className="text-2xl font-semibold">
                45769
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
                  flex flex-col items-center justify-center rounded-md shadow-slate-800">

                    <Upload />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopUpForm/>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
                  flex flex-col items-center justify-center rounded-md shadow-slate-800">

                    <Download />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm/>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
                  flex flex-col items-center justify-center rounded-md shadow-slate-800">

                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Transfer to other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm/>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
