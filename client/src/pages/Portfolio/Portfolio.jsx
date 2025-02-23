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

const Portfolio = () => {
  return (
    <div className="p-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
      <Table className="mt-15 table-fixed w-full border-collapse">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="w-[150px] text-center">Asset</TableHead>
            <TableHead className="w-[150px] text-center">Price</TableHead>
            <TableHead className="w-[150px] text-center">Unit</TableHead>
            <TableHead className="w-[150px] text-center">Change</TableHead>
            <TableHead className="w-[150px] text-center">Change (%)</TableHead>
            <TableHead className="w-[150px] text-center">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="w-[150px] text-center">
                <div className="flex items-center justify-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin" />
                  </Avatar>
                  <span>Bitcoin</span>
                </div>
              </TableCell>
              <TableCell className="w-[150px] text-center">$97,523</TableCell>
              <TableCell className="w-[150px] text-center">0.5</TableCell>
              <TableCell className="w-[150px] text-center text-green-500">+0.76853%</TableCell>
              <TableCell className="w-[150px] text-center text-green-500">+1.23%</TableCell>
              <TableCell className="w-[150px] text-center">$48,761</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
