import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar"; 
import Portfolio from "./pages/Portfolio/Portfolio";
import Activity from "./pages/Activity/Activity";
import Wallet from "./pages/Wallet/Wallet";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import PaymentDetails from "./pages/Payment Details/PaymentDetails";
import StockDetails from "./pages/StockDetails/StockDetails";
import Watchlist from "./pages/Watchlist/Watchlist";
import Profile from "./pages/Profile/Profile";
import SearchCoin from "./pages/Search/SearchCoin";
import NotFound from "./pages/Not Found/NotFound";
import Auth from './pages/Auth/Auth';

export default function App() {
  return (
    <>
      <Auth/>
      {false && <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
         <Route path="/portfolio" element={<Portfolio/>} />
        
        <Route path="/activity" element={<Activity/>} />
        <Route path="/wallet" element ={<Wallet/>} />
        <Route path="/withdrawal" element={<Withdrawal/>} />
        <Route path="/payment-details" element={<PaymentDetails/>} />
        <Route path="/market/:id" element={<StockDetails/>} />
        <Route path="/watchlist" element={<Watchlist/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/search" element={<SearchCoin/>} />
        <Route path="*" element={<NotFound/>} />


      </Routes>

      </div>}
    
    </>
  );
}
