import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import clsx from 'clsx';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, TrendingUp, TrendingDown, Star } from 'lucide-react';

interface OrderPanelProps {
  symbol: string;
  onSelect: (symbol: string) => void;
}

export default function OrderPanel({ symbol, onSelect }: OrderPanelProps) {
  const { user } = useAuth();
  const [quote, setQuote] = useState<any>(null);
  const [shares, setShares] = useState('1');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const quickPicks = [
    { symbol: 'TSLA', name: 'Tesla Inc', price: '175.22', change: '+2.4%' },
    { symbol: 'AAPL', name: 'Apple Inc', price: '189.45', change: '-0.8%' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: '890.11', change: '+4.2%' },
    { symbol: 'BTC', name: 'Bitcoin', price: '64,210', change: '+1.5%' },
  ];

  useEffect(() => {
    const fetchQuote = async () => {
      if (!symbol) return;
      try {
        const res = await api.get(`/assets/${symbol}`);
        setQuote(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 10000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shares || Number(shares) <= 0) return;

    setIsSubmitting(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Order executed successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1200);
  };

  const estimatedValue = Number(shares) * Number(quote?.last_price || 0);

  return (
    <div className="w-[380px] h-full glass-sidebar border-l border-outline-variant/10 flex flex-col p-6 animate-in fade-in slide-in-from-right duration-700">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart size={20} className="text-primary-container" />
        <h3 className="text-sm font-manrope font-bold text-white uppercase tracking-widest">Trading</h3>
      </div>

      <div className="flex bg-surface-container-low p-1 rounded-2xl mb-8 border border-outline-variant/10">
        <button
          className={clsx(
            "flex-1 py-3 text-xs font-bold rounded-xl tonal-transition",
            orderType === 'buy' ? "bg-secondary text-on-secondary shadow-lg shadow-secondary/20" : "text-on-surface-variant hover:text-white"
          )}
          onClick={() => setOrderType('buy')}
        >
          BUY
        </button>
        <button
          className={clsx(
            "flex-1 py-3 text-xs font-bold rounded-xl tonal-transition",
            orderType === 'sell' ? "bg-error-container text-on-error-container shadow-lg shadow-error/20" : "text-on-surface-variant hover:text-white"
          )}
          onClick={() => setOrderType('sell')}
        >
          SELL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <div className="p-5 bg-surface-container-high/40 rounded-3xl border border-outline-variant/10">
          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Active Quantity</label>
          <input
            type="number"
            min="0.0001"
            step="0.0001"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="w-full bg-transparent text-white font-manrope font-bold text-3xl focus:outline-none placeholder-on-surface-variant/30"
            placeholder="0.00"
          />
          <div className="mt-4 pt-4 border-t border-outline-variant/5 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
            <span>Estimated Value</span>
            <span className="text-white text-sm font-manrope font-bold">${estimatedValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="flex justify-between items-center px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          <span>Buying Power</span>
          <span className="text-white">${Number(user?.buying_power || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !shares || Number(shares) <= 0}
          className={clsx(
            "w-full py-5 rounded-2xl font-manrope font-black text-sm tracking-widest transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
            orderType === 'buy' ? "bg-secondary text-on-secondary hover:shadow-secondary/30" : "bg-error-container text-white hover:shadow-error/30"
          )}
        >
          {isSubmitting ? "SUBMITTING ORDER..." : "REVIEW ORDER"}
        </button>

        {successMsg && (
          <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-2xl text-secondary text-xs font-bold text-center animate-in zoom-in duration-300">
            {successMsg}
          </div>
        )}
      </form>

      {/* Quick Picks / Watchlist */}
      <div className="mt-8 pt-8 border-t border-outline-variant/10">
        <div className="flex items-center gap-2 mb-6">
          <Star size={16} className="text-primary-teal" />
          <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Quick Picks / Watchlist</h4>
        </div>

        <div className="space-y-4">
          {quickPicks.map((pick) => (
            <div
              key={pick.symbol}
              onClick={() => onSelect(pick.symbol)}
              className="flex items-center justify-between group cursor-pointer tonal-transition hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-[10px] font-black text-white group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  {pick.symbol[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{pick.symbol}</div>
                  <div className="text-[9px] text-on-surface-variant">{pick.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white">${pick.price}</div>
                <div className={clsx(
                  "text-[9px] font-bold flex items-center justify-end gap-0.5",
                  pick.change.startsWith('+') ? "text-secondary" : "text-error"
                )}>
                  {pick.change.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {pick.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
