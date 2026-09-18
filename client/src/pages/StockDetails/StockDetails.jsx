import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarkIcon, DotIcon } from "lucide-react";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { addItemToWatchlist } from "@/State/Watchlist/Action";

const StockDetails = () => {
  const { coinDetails, loading, error } = useSelector((state) => state.coin);
  const { userWatchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (id && jwt) {
      dispatch(fetchCoinDetails(id, jwt));
    }
  }, [id, jwt, dispatch]);

  const isInWatchlist = userWatchlist?.coin?.some(
    (item) => item.id === id
  );

  const handleWatchlistToggle = () => {
    dispatch(addItemToWatchlist({ coinId: id, jwt }));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!coinDetails) return <p className="text-center">No data available</p>;

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage
              src={coinDetails?.image?.large || "/placeholder.png"}
              alt={coinDetails?.name || "Coin Image"}
            />
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <p className="uppercase">{coinDetails?.symbol}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coinDetails?.market_data?.current_price?.usd || "N/A"}
              </p>
              <p
                className={
                  coinDetails?.market_data?.price_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                <span>
                  {coinDetails?.market_data?.price_change_24h?.toFixed(2) ||
                    "0.00"}
                </span>
                <span>
                  (
                  {coinDetails?.market_data?.price_change_percentage_24h?.toFixed(
                    2
                  ) || "0.00"}
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleWatchlistToggle} variant="outline" size="icon">
            {isInWatchlist ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-5">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;