import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Activity = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Trading History</h1>
      <Table className="mt-15 table-fixed w-full border-collapse">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="w-[180px] text-center">Date & Time</TableHead>
            <TableHead className="w-[180px] text-center">Trading Pair</TableHead>
            <TableHead className="w-[150px] text-center">Buy Price</TableHead>
            <TableHead className="w-[150px] text-center">Sell Price</TableHead>
            <TableHead className="w-[150px] text-center">Profit/Loss</TableHead>
            <TableHead className="w-[150px] text-center">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="w-[180px] text-center">
                <p className="">2025-02-17</p>
                <p className="text-gray-400">12:34:43</p>

              </TableCell>
              <TableCell className="w-[250px] text-center flex items-center justify-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                    alt="Bitcoin"
                  />
                </Avatar>
                <span>BTC/USD</span>
              </TableCell>
              <TableCell className="w-[150px] text-center">$42,000</TableCell>
              <TableCell className="w-[150px] text-center">$43,200</TableCell>
              <TableCell className="w-[150px] text-center text-green-500">+2.85%</TableCell>
              <TableCell className="w-[150px] text-center">$1,200</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
