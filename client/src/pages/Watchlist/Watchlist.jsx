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
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserWatchlist, addItemToWatchlist } from "@/State/Watchlist/Action";

const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userWatchlist, loading, error } = useSelector((store) => store.watchlist);
  const jwt = localStorage.getItem("jwt");

  useEffect((getOr) => {
    if (jwt) {
      dispatch(getUserWatchlist(jwt));
    }
  }, [dispatch, jwt]);

  const handleRemoveFromWatchlist = (coinId) => {
    dispatch(addItemToWatchlist({ coinId, jwt }));
  };

  if (loading) return <p className="text-center p-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500 p-5">Error: {error}</p>;

  const coins = userWatchlist?.coin ?? [];

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Watchlist</h1>

      {coins.length === 0 ? (
        <p className="text-gray-400">Your watchlist is empty.</p>
      ) : (
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
            {coins.map((coin) => (
              <TableRow
                key={coin.id}
                className="h-12 cursor-pointer"
                onClick={() => navigate(`/market/${coin.id}`)}
              >
                <TableCell className="w-[150px] text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Avatar>
                      <AvatarImage src={coin.image} alt={coin.name} />
                    </Avatar>
                    <span>{coin.name}</span>
                  </div>
                </TableCell>
                <TableCell className="w-[150px] text-center uppercase">
                  {coin.symbol}
                </TableCell>
                <TableCell className="w-[150px] text-center">
                  {coin.total_volume?.toLocaleString()}
                </TableCell>
                <TableCell className="w-[150px] text-center">
                  {coin.market_cap?.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`w-[150px] text-center ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell className="w-[150px] text-center">
                  ${coin.current_price?.toFixed(2)}
                </TableCell>
                <TableCell className="w-[150px] text-center">
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row navigation when clicking remove
                      handleRemoveFromWatchlist(coin.id);
                    }}
                    size="icon"
                    className="h-10 w-10"
                  >
                    <BookmarkFilledIcon className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Watchlist;