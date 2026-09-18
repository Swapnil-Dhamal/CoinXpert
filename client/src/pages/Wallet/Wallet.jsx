import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  CopyIcon,
  DollarSign,
  Download,
  ShuffleIcon,
  Upload,
  WalletIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { depositMoney, getUserWallet, getWalletTransactions } from "@/State/Wallet/Action";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Wallet = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.auth.user);
  const walletState = useSelector((store) => store.wallet);
  const userWallet = walletState.userWallet;
  const transactions = walletState.transactions;


  const query = useQuery();
  const navigate = useNavigate();
  const orderId = query.get("orderId");
  const paymentId = query.get("paymentId");
  const razorpayPaymentId = query.get("razorpay_payment_id");

  const handleFetchUserWallet = () => {
  dispatch(getUserWallet(localStorage.getItem("jwt")));
};

const handleFetchWalletTransaction = () => {
  dispatch(getWalletTransactions(localStorage.getItem("jwt")));
};

useEffect(() => {
  handleFetchUserWallet();
  handleFetchWalletTransaction();
}, []);


  useEffect(() => {
    if (orderId && (razorpayPaymentId || paymentId)) {

      console.log("Deposit triggered with:", { orderId, paymentId, razorpayPaymentId });

      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId || paymentId,
          navigate,
        })
      );
    }
  }, [orderId, razorpayPaymentId, paymentId]);

  

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
                <p className="ml-8 text-gray-200 text-sm">
                  {userWallet?.id ?? "-"}
                </p>
                <CopyIcon
                  size={12}
                  className="cursor-pointer hover:text-slate-300"
                />
              </div>
            </div>

            {/* Right Section: Reload Icon */}
            <div className="absolute top-2 right-2">
              <ReloadIcon
                onClick={handleFetchUserWallet}
                className="h-6 w-6 cursor-pointer hover:text-gray-400"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign />
              <span className="text-2xl font-semibold">
                {walletState.walletLoading? "Loading..." : userWallet?.balance}
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              {/* Add Money */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md">
                    <Upload />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up Your Wallet</DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              {/* Withdrawal */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md">
                    <Download />
                    <span className="text-sm mt-2">Withdraw</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              {/* Transfer */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer to Another Wallet</DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon 
            onClick={() => handleFetchWalletTransaction()}
            className="h-6 w-6 cursor-pointer hover:text-gray-400" />
          </div>

          <div className="space-y-5">
            {transactions?.map((item, index) => (
              <div key={index}>
                <Card className="px-5 flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <Avatar>
                      <AvatarFallback>
                        <ShuffleIcon />
                      </AvatarFallback>
                    </Avatar>

                    <div className="p-2">
                      <h1>{item.purpose}</h1>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-green-500">{item.amount}$</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
