import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, MessageCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccountSidebar({ onOpenSupport, onOpenDeposit }: { onOpenSupport: () => void, onOpenDeposit: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock transactions for UI demonstration
  const transactions = [
    { id: 1, type: 'Buy', symbol: 'TSLA', amount: '+$420.50', date: 'Wednesday, 14:20', positive: true },
    { id: 2, type: 'Sell', symbol: 'AAPL', amount: '-$120.10', date: 'Yesterday, 09:15', positive: false },
    { id: 3, type: 'Deposit', symbol: 'CASH', amount: '+$1,000.00', date: '12 Apr, 18:30', positive: true },
  ];

  return (
    <div className="w-80 h-full glass-sidebar border-r border-outline-variant/10 flex flex-col p-6 animate-in fade-in slide-in-from-left duration-700">
      {/* Portfolio Summary */}
      <div className="mb-8">
        <h3 className="text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-1">Total Value</h3>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-manrope font-bold text-white tracking-tight">
            ${Number(user?.cash_balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-secondary text-sm font-medium flex items-center gap-0.5">
            <TrendingUp size={14} />
            +2.4%
          </span>
        </div>
        <p className="text-xs text-on-surface-variant">Today's Profit: <span className="text-secondary">+$142.20</span></p>

        {/* Mini Sparkline Mock */}
        <div className="h-16 w-full mt-4 bg-surface-container-low/30 rounded-lg overflow-hidden relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,10 T100,5"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="2"
              className="drop-shadow-[0_0_8px_rgba(69,223,164,0.4)]"
            />
          </svg>
        </div>
      </div>

      {/* Primary Pot / Quick Actions */}
      <div className="mb-8 p-4 bg-surface-container-high/40 border border-outline-variant/10 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-white">Available Funds</span>
          <ArrowUpRight size={18} className="text-on-surface-variant" />
        </div>
        <div className="text-xl font-manrope font-bold text-white mb-1">
           ${Number(user?.buying_power || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-on-surface-variant">Buying Power</div>
      </div>

      {/* Recents */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <h4 className="text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-4">Recent Transactions</h4>
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between group cursor-pointer tonal-transition hover:translate-x-1">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tx.positive ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
                  {tx.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-primary-container tonal-transition">{tx.symbol}</div>
                  <div className="text-[10px] text-on-surface-variant">{tx.date}</div>
                </div>
              </div>
              <div className={`text-sm font-medium ${tx.positive ? 'text-secondary' : 'text-error'}`}>
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-6 pt-6 border-t border-outline-variant/10 space-y-3">
        <button
          onClick={onOpenDeposit}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-primary-container text-on-primary-container font-black text-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all group"
        >
          <span className="flex items-center gap-2">
            <CreditCard size={18} className="group-hover:rotate-12 transition-transform" />
            Deposit Funds
          </span>
          <ArrowUpRight size={16} />
        </button>

        <div className="flex gap-2">
          <button 
            onClick={onOpenSupport}
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-container-high/40 text-on-surface font-medium text-sm hover:bg-surface-container-highest tonal-transition"
          >
            <MessageCircle size={18} />
            Support
          </button>
          <button
            onClick={handleLogout}
            className="p-3 rounded-xl bg-surface-container-high/40 text-error font-medium text-sm hover:bg-error/10 tonal-transition"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
