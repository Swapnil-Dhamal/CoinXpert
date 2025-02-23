import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Withdrawal = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
      <Table className="mt-10 table-fixed w-full border-collapse">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="w-[180px] text-center">Date & Time</TableHead>
            <TableHead className="w-[180px] text-center">Method</TableHead>
            <TableHead className="w-[150px] text-center">Amount</TableHead>
            <TableHead className="w-[150px] text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="w-[180px] text-center">
                January 25, 2025 at 10:30
              </TableCell>
              <TableCell className="w-[180px] text-center">Bank Account</TableCell>
              <TableCell className="w-[150px] text-center">$42,000</TableCell>
              <TableCell className="w-[150px] text-center text-green-600 font-semibold">
                Success
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
