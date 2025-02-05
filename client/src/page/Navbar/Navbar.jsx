import React from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { FaBars } from 'react-icons/fa';  
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import CryptoLogo from "../../page/images/logo.png";
import { Spa } from "@mui/icons-material";

export const Navbar = () => {
  return (
    <div
      className="w-screen fixed top-0 left-0 border-b z-50 bg-background bg-opacity-0 
      flex items-center justify-start p-3"
    >
      {/* Hamburger icon positioned at the extreme left */}
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <div className="rounded-full h-11 w-11 flex items-center justify-center cursor-pointer">
              <FaBars className="h-7 w-7"/>
            </div>
          </SheetTrigger>

          <SheetContent className="w-72 border-r-0 flex flex-col justify-center"
          side='left'>
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1">
                  <Avatar>
                    <AvatarImage src={CryptoLogo} alt="Logo" className="w-10 h-10 rounded-full"></AvatarImage>
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-500">Coin</span>
                    <span>Xpert</span>

                  </div>
                </div>
              </SheetTitle>
              
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
