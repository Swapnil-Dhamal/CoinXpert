import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { getUserPaymentDetails } from "@/State/PaymentDetails/Action";

const PaymentDetails = () => {

  const dispatch=useDispatch();
  const jwt=useSelector((state)=>state.auth.jwt);
  console.log("JWT from Redux:", jwt);

  const paymentDetails = useSelector(
    (state) => state.paymentDetails.paymentDetails
  );

  useEffect(()=>{
    if(jwt){
      dispatch(getUserPaymentDetails(jwt));

    }
  }, [dispatch, jwt]);

  console.log("Payment Details from Redux:", paymentDetails);



  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">Payment Details</h1>

      {paymentDetails? (
        <Card>
          <CardHeader>
            <CardTitle>{paymentDetails.bankName}</CardTitle>
            <CardDescription className="flex items-center gap-2">
                <span>A/C No:</span>
                <span>********{paymentDetails.accountNumber?.slice(-4)}</span>
            </CardDescription>
         
            
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C Holder</p>
              <p className="text-gray-400">: {paymentDetails.accountHolderName}</p>
            </div>

            <div className="flex items-center">
              <p className="w-32">IFSC Code</p>
              <p className="text-gray-400">: {paymentDetails.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="py-6">Add payment details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
