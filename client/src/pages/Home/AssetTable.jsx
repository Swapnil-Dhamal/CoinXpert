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
import { useNavigate } from "react-router-dom";

function AssetTable() {
  const navigate = useNavigate();

  return (
    <Table className="mt-15">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Coin</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead>24h</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1,1,1,1,1,1,1,1,1,1].map((item, index) => (
          <TableRow 
            key={index} 
            onClick={() => navigate('/market/bitcoin')}
            className=" transition"
          >
            <TableCell className="font-medium flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin" />
              </Avatar>
              <span>Bitcoin</span>
            </TableCell>
            <TableCell>BTC</TableCell>
            <TableCell>31267529035</TableCell>
            <TableCell>1934047601349</TableCell>
            <TableCell className="text-green-500">+0.76853%</TableCell>
            <TableCell className="text-right">$97523</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AssetTable;
