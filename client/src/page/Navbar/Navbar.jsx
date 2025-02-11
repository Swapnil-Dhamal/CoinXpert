import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CryptoLogo from "../../page/images/logo.png";
import Sidebar from "./Sidebar.jsx";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div
      className="w-screen fixed top-0 left-0 border-b z-50 bg-background bg-opacity-0 
      flex items-center justify-start p-3"
    >
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <div className="rounded-full h-11 w-11 flex items-center justify-center cursor-pointer">
              <FaBars className="h-7 w-7" />
            </div>
          </SheetTrigger>

          <SheetContent
            className="w-72 border-r-0 flex flex-col justify-center"
            side="left"
          >
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1 mt-10 mb-0">
                  <Avatar>
                    <AvatarImage
                      src={CryptoLogo}
                      alt="Logo"
                      className="w-10 h-10 rounded-full"
                    ></AvatarImage>
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-500">Coin</span>
                    <span>Xpert</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <p className="text-sm lg:text-base cursor-pointer">CoinXpert</p>

        <div className="p-0 ml-9">
          <Button variant="outline" className="flex items-center">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </div>
      </div>

      <div className="ml-auto">
        <Avatar className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
          <AvatarFallback className="text-lg font-bold">C</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
