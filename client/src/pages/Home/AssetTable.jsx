import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";

function AssetTable({ coin, category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (

    <Table className="mt-15">
      <ScrollArea className={`${category=="all"?"h-[74vh]":"h-[82vh]"}`}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Coin</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead>24h</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  {coin.map((item) => (
    <TableRow
      key={item.id}
      onClick={() => navigate(`/market/${item.id}`)}
      className="transition"
    >
      <TableCell className="font-medium flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={item.image} alt={item.name} />
        </Avatar>
        <span>{item.name}</span>
      </TableCell>

      <TableCell>{item.symbol}</TableCell>

      <TableCell>{item.total_volume.toLocaleString()}</TableCell>

      <TableCell>{item.market_cap.toLocaleString()}</TableCell>

      <TableCell
        className={
          item.price_change_percentage_24h >= 0
            ? "text-green-500"
            : "text-red-500"
        }
      >
        {item.price_change_percentage_24h >= 0
          ? `+${item.price_change_percentage_24h.toFixed(2)}%`
          : `${item.price_change_percentage_24h.toFixed(2)}%`}
      </TableCell>

      <TableCell>${item.current_price.toFixed(2)}</TableCell>

    </TableRow>
  ))}
</TableBody>

</ScrollArea>


    </Table>
  );
}

export default AssetTable;
