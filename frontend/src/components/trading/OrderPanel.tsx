import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import clsx from 'clsx';
import { useAuth } from '../../contexts/AuthContext';

interface OrderPanelProps {
  symbol: string;
}

export default function OrderPanel({ symbol }: OrderPanelProps) {
  const { user } = useAuth();
  const [quote, setQuote] = useState<any>(null);
  const [shares, setShares] = useState('1');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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
    // In a real app we would use WebSockets here for live fast updates
    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shares || Number(shares) <= 0) return;
    
    setIsSubmitting(true);
    setSuccessMsg('');
    
    // MOCK ORDER EFFECT
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Succes! Ordin ${orderType.toUpperCase()} executat pentru ${shares} buc. ${symbol}`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  if (!quote) {
    return <div className="p-6 text-slate-400">Încărcare preț...</div>;
  }

  const estimatedValue = Number(shares) * Number(quote.last_price || 0);

  return (
    <div className="bg-slate-900 border-l border-slate-800 w-full h-full flex flex-col">
      <div className="p-6 border-b border-slate-800">
         <h3 className="text-xl font-bold text-white mb-1">{symbol}</h3>
         <div className="text-3xl font-light text-white">${Number(quote.last_price || 0).toFixed(2)}</div>
         <div className={clsx(
           "text-sm font-medium mt-1",
           Number(quote.change_pct) >= 0 ? "text-emerald-500" : "text-red-500"
         )}>
           {Number(quote.change_pct) >= 0 ? "+" : ""}{Number(quote.change_pct || 0).toFixed(2)}% Astăzi
         </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex bg-slate-800 p-1 rounded-lg mb-6">
          <button 
            className={clsx(
              "flex-1 py-2 text-sm font-semibold rounded-md transition-all",
              orderType === 'buy' ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"
            )}
            onClick={() => setOrderType('buy')}
          >
            CUMPĂRĂ
          </button>
          <button 
            className={clsx(
              "flex-1 py-2 text-sm font-semibold rounded-md transition-all",
              orderType === 'sell' ? "bg-red-600 text-white shadow" : "text-slate-400 hover:text-white"
            )}
            onClick={() => setOrderType('sell')}
          >
            VINDE
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
           <div className="space-y-4">
               <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Cantitate (Actiuni)</label>
                  <input 
                    type="number"
                    min="0.0001"
                    step="0.0001"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-500 text-lg"
                    placeholder="0"
                  />
               </div>
               
               <div className="bg-slate-800/50 rounded-lg p-4 flex justify-between items-center border border-slate-700/50">
                  <span className="text-sm text-slate-400">Valoare estimată</span>
                  <span className="text-lg font-semibold text-white">${estimatedValue.toFixed(2)}</span>
               </div>
               
               <div className="flex justify-between items-center p-2">
                 <span className="text-xs text-slate-400">Putere de cumpărare:</span>
                 <span className="text-xs font-semibold text-white">${Number(user?.buying_power || 0).toFixed(2)}</span>
               </div>
           </div>

           <div className="mt-auto pt-6">
               <button 
                 type="submit" 
                 disabled={isSubmitting || !shares || Number(shares) <= 0}
                 className={clsx(
                   "w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                   orderType === 'buy' ? "bg-emerald-600 hover:bg-emerald-500" : "bg-red-600 hover:bg-red-500"
                 )}
               >
                 {isSubmitting ? "SE PROCESEAZĂ..." : `PLASEAZĂ ORDIN ${orderType.toUpperCase()}`}
               </button>
               
               {successMsg && (
                 <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 text-sm font-medium text-center">
                    {successMsg}
                 </div>
               )}
           </div>
        </form>
      </div>
    </div>
  );
}
