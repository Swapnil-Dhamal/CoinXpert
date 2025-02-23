import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

const Watchlist = () => {

  const handleRemoveToWatchlist = (value) => {
    console.log(value);
  };

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Watchlist</h1>
      <Table className="mt-15 table-fixed w-full border-collapse">
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="w-[150px] text-center">Coin</TableHead>
            <TableHead className="w-[150px] text-center">Symbol</TableHead>
            <TableHead className="w-[150px] text-center">Volume</TableHead>
            <TableHead className="w-[150px] text-center">Market Cap</TableHead>
            <TableHead className="w-[150px] text-center">24h</TableHead>
            <TableHead className="w-[150px] text-center">Price</TableHead>
            <TableHead className="w-[150px] text-center text-red-600">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="w-[150px] text-center">
                <div className="flex items-center justify-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin" />
                  </Avatar>
                  <span>Bitcoin</span>
                </div>
              </TableCell>
              <TableCell className="w-[150px] text-center">BTC</TableCell>
              <TableCell className="w-[150px] text-center">31,267,529,035</TableCell>
              <TableCell className="w-[150px] text-center">1,934,047,601,349</TableCell>
              <TableCell className="w-[150px] text-center text-green-500">+0.76853%</TableCell>
              <TableCell className="w-[150px] text-center">$97,523</TableCell>
              <TableCell className="w-[150px] text-center">
                <Button 
                  variant="ghost"
                  onClick={() => handleRemoveToWatchlist(item)}
                  size="icon"
                  className="h-10 w-10"
                >
                  <BookmarkFilledIcon className="h-6 w-6"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
