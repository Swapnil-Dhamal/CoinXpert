import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "@/State/Wallet/Action";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const { withdrawalHistory, withdrawalLoading } = useSelector(
    state => state.wallet
  );

  useEffect(() => {
    console.log("token: ", token)
    if (token) {
      dispatch(getWithdrawalHistory(token));
    }
  }, [dispatch, token]);


  const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(",", " at");


};

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>

      <Table className="mt-10 table-fixed w-full border-collapse">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="text-center">Date & Time</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {withdrawalHistory?.map((item) => (
            <TableRow key={item.id} className="h-12">
              <TableCell className="text-center">
                {formatDateTime(item.date)}
              </TableCell>
              <TableCell className="text-center">
                Bank
              </TableCell>
              <TableCell className="text-center">
                ₹{item.amount}
              </TableCell>
              <TableCell
                className={`text-center font-semibold ${
                  item.withdrawalStatus === "SUCCESS"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {item.withdrawalStatus}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {withdrawalLoading && (
        <p className="text-center text-gray-400 mt-5">
          Loading withdrawal history…
        </p>
      )}
    </div>
  );
};


export default Withdrawal;
