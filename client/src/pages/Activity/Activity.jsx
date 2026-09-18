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
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/State/Order/Action";

const Activity = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order, loading, error } = useSelector((store) => store.order);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllOrdersForUser(jwt));
    }
  }, [dispatch, jwt]);

  if (loading) return <p className="text-center p-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500 p-5">Error: {error}</p>;

  const orders = order ?? [];

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Trading History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No trading activity yet.</p>
      ) : (
        <Table className="mt-15 table-fixed w-full border-collapse">
          <TableHeader>
            <TableRow className="h-12">
              <TableHead className="w-[180px] text-center">Date & Time</TableHead>
              <TableHead className="w-[180px] text-center">Trading Pair</TableHead>
              <TableHead className="w-[150px] text-center">Type</TableHead>
              <TableHead className="w-[150px] text-center">Buy Price</TableHead>
              <TableHead className="w-[150px] text-center">Sell Price</TableHead>
              <TableHead className="w-[150px] text-center">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item) => {
              const coin = item.orderItem?.coin;
              const date = new Date(item.timeStamp);
              const isBuy = item.orderType === "BUY";

              return (
                <TableRow key={item.id} className="h-12">
                  <TableCell className="w-[180px] text-center">
                    <p>{date.toLocaleDateString()}</p>
                    <p className="text-gray-400">{date.toLocaleTimeString()}</p>
                  </TableCell>

                  <TableCell className="w-[250px] text-center flex items-center justify-center gap-2">
                    <Avatar>
                      <AvatarImage src={coin?.image} alt={coin?.name} />
                    </Avatar>
                    <span>{coin?.symbol?.toUpperCase()}/USD</span>
                  </TableCell>

                  <TableCell
                    className={`w-[150px] text-center ${
                      isBuy ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.orderType}
                  </TableCell>

                  <TableCell className="w-[150px] text-center">
                    ${item.orderItem?.buyPrice?.toLocaleString() ?? "-"}
                  </TableCell>

                  <TableCell className="w-[150px] text-center">
                    {item.orderItem?.sellPrice
                      ? `$${item.orderItem.sellPrice.toLocaleString()}`
                      : "-"}
                  </TableCell>

                  

                  <TableCell className="w-[150px] text-center">
                    ${item.price?.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Activity;