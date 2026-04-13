import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AssetList from '../components/trading/AssetList';
import TradingChart from '../components/trading/TradingChart';
import OrderPanel from '../components/trading/OrderPanel';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden flex flex-col font-sans">
      {/* Top Navbar Workspace */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">T</div>
            <span className="font-bold text-lg text-white tracking-tight">TradeFlow</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
             <button className="text-emerald-400 border-b-2 border-emerald-500 h-14">Trading</button>
             <button className="hover:text-slate-200 transition-colors">Portofoliu</button>
             <button className="hover:text-slate-200 transition-colors">Istoric</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-4">
            <span className="text-xs text-slate-500 font-medium">Cont Real (Cash)</span>
            <span className="text-sm font-bold text-white">${Number(user?.cash_balance || 0).toFixed(2)}</span>
          </div>
          
          <button className="flex items-center gap-2 hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors text-slate-300">
            <UserIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">{user?.username}</span>
          </button>
          
          <button 
            onClick={handleLogout}
            title="Logout"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Trading Workspace Layout */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Watchlist/Assets (25%) */}
        <aside className="w-80 shrink-0 h-full hidden lg:block">
          <AssetList 
            selectedSymbol={selectedSymbol} 
            onSelect={setSelectedSymbol} 
          />
        </aside>

        {/* Center - Chart (50%) */}
        <section className="flex-1 h-full bg-slate-950 relative border-r border-slate-800">
          {selectedSymbol ? (
            <TradingChart symbol={selectedSymbol} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
               Selectează un instrument din listă pentru a încărca graficul
            </div>
          )}
        </section>

        {/* Right Sidebar - Order Panel (25%) */}
        <aside className="w-[340px] shrink-0 h-full hidden xl:block border-l border-slate-800">
           {selectedSymbol ? (
              <OrderPanel symbol={selectedSymbol} />
           ) : (
             <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 text-sm">
                Așteptare selecție...
             </div>
           )}
        </aside>

      </main>
    </div>
  );
}
