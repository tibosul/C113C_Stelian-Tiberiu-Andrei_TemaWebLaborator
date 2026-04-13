import { useState } from "react";
import AccountBar from "@/components/trading/AccountBar";
import Watchlist from "@/components/trading/Watchlist";
import TradingChart from "@/components/trading/TradingChart";
import OrderPanel from "@/components/trading/OrderPanel";

const Index = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AccountBar />
      <div className="flex flex-1 overflow-hidden">
        <Watchlist selectedSymbol={selectedSymbol} onSelectSymbol={setSelectedSymbol} />
        <TradingChart symbol={selectedSymbol} />
        <OrderPanel symbol={selectedSymbol} />
      </div>
    </div>
  );
};

export default Index;
