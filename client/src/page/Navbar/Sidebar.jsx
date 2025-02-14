import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  HomeIcon, 
  DashboardIcon, 
  BookmarkIcon, 
  ActivityLogIcon, 
  PersonIcon,
  ExitIcon
} from '@radix-ui/react-icons';
import { CreditCard as CreditCardIcon, Landmark, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { SheetClose } from '@/components/ui/sheet';

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6" /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
  { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-6 w-6" /> },
  { name: "Wallet", path: "/wallet", icon: <Wallet className="h-6 w-6" /> }, 
  { name: "Payment Details", path: "/payment-details", icon: <Landmark className="h-6 w-6" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Profile", path: "/profile", icon: <PersonIcon className="h-6 w-6" /> },
  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> }
];

const Sidebar = () => {
  return (
    <div className="mt-10 space-y-5">
      {menu.map((item) => (
        <div key={item.name}>
          <Link to={item.path}> 
          <SheetClose className='w-full'>
            <Button 
              variant="outline" 
              className="flex items-center gap-5 py-6 w-full">
              <span className="w-8">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
            </SheetClose>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
