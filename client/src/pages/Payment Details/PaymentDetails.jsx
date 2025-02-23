import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";

const PaymentDetails = () => {
  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">Payment Details</h1>

      {true ? (
        <Card>
          <CardHeader>
            <CardTitle>Yes Bank</CardTitle>
            <CardDescription>********4546</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C Holder</p>
              <p className="text-gray-400">: John Cena</p>
            </div>

            <div className="flex items-center">
              <p className="w-32">IFSC Code</p>
              <p className="text-gray-400">: IDF847884R</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
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
