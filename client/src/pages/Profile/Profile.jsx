import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerifiedIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccountVerificationForm from "./AccountVerificationForm";

const Profile = () => {
  const [isTwoStepEnabled, setIsTwoStepEnabled] = useState(false);

  const handleEnableTwoStepVerification = () => {
    console.log("Two-step verification enabled");
    setIsTwoStepEnabled(true); // Toggle state after verification
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                {[
                  { label: "Email", value: "swapnil@gmail.com" },
                  { label: "Full Name", value: "Swapnil Dhamal" },
                  { label: "Date of Birth", value: "02/12/2004" },
                  { label: "Nationality", value: "Indian" },
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <p className="w-[9rem]">{item.label} :</p>
                    <p className="text-gray-500">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-7">
                {[
                  { label: "Address", value: "Narhegaon" },
                  { label: "City", value: "Pune" },
                  { label: "Postcode", value: "411 034" },
                  { label: "Country", value: "India" },
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <p className="w-[9rem]">{item.label} :</p>
                    <p className="text-gray-500">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2-Step Verification</CardTitle>
                <Badge className={`flex items-center gap-2 text-white ${isTwoStepEnabled ? "bg-green-600" : "bg-orange-500"}`}>
                  {isTwoStepEnabled && <VerifiedIcon size={16} />}
                  <span>{isTwoStepEnabled ? "Enabled" : "Disabled"}</span>
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <Dialog>
                <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {isTwoStepEnabled ? "Disable Two-Step Verification" : "Enable Two-Step Verification"}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Verify Your Account</DialogTitle>
                  </DialogHeader>
                  <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification} />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
