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
import { useSelector, useDispatch } from "react-redux";
import { getAssetForUser } from "@/State/Asset/Action";




const Portfolio = () => {

  const dispatch=useDispatch();
  const { userAssets, loading, error } = useSelector(store => store.asset);
  const jwt = localStorage.getItem("jwt");

  useEffect(()=>{
    if(jwt){
      dispatch(getAssetForUser({jwt}))
    }
    
  }, [dispatch, jwt]);

  console.log("assets: ", userAssets);

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
          {userAssets?.map((item, index) => {
            const {coin, quantity}=item;
            const currentValue=coin.current_price*quantity;
            const isPositive=coin.price_change_24h >= 0;
            const changeColor=isPositive ? "text-green-500":"text-red-500";
            const sign=isPositive? "+":"";

            return(
              <TableRow key={index} className="h-12">
                <TableCell className="w-[50px] text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Avatar>
                      <AvatarImage src={coin.image} alt={coin.name} />

                    </Avatar>
                    <span>{coin.name}</span>

                  </div>
                </TableCell>

                <TableCell className="w-[150px] text-center">
                  ${coin.current_price.toLocaleString()}
                </TableCell>

                <TableCell className="w-[150px] text-center">
                  {quantity}
                </TableCell>

                <TableCell className={`w-[150px] text-center ${changeColor}`}>
                  {sign}
                  {coin.price_change_24h.toFixed(2)}
                </TableCell>

                <TableCell className={`w-[150px] text-center ${changeColor}`}>
                  {sign}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>

                <TableCell className="w-[150px] text-center">
                  ${currentValue.toLocaleString(undefined, {maximumFractionDigits:2})}
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
