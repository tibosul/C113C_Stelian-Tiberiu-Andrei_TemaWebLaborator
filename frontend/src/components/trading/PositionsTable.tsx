import { ArrowUpRight, ArrowDownRight, MoreVertical, Search, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

const positions = [
  { symbol: 'TSLA', name: 'Tesla, Inc.', quantity: '12.5', price: '$242.45', value: '$3,030.62', change: '+2.45%', trend: 'up', color: 'bg-primary-container' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: '4.2', price: '$485.20', value: '$2,037.84', change: '+5.12%', trend: 'up', color: 'bg-secondary' },
  { symbol: 'AAPL', name: 'Apple Inc.', quantity: '25.0', price: '$189.10', value: '$4,727.50', change: '-0.32%', trend: 'down', color: 'bg-white' },
  { symbol: 'BTC', name: 'Bitcoin', quantity: '0.15', price: '$64,240', value: '$9,636.00', change: '+1.15%', trend: 'up', color: 'bg-orange-500' },
  { symbol: 'ETH', name: 'Ethereum', quantity: '2.4', price: '$3,450', value: '$8,280.00', change: '-2.10%', trend: 'down', color: 'bg-blue-400' },
];

export default function PositionsTable() {
  const navigate = useNavigate();
  return (
    <div className="glass-panel rounded-[32px] p-8 border border-white/5 h-full overflow-hidden flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
           <h3 className="text-xl font-manrope font-black text-white tracking-tight text-center sm:text-left">Active Positions</h3>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-center sm:text-left">Current portfolio management</p>
        </div>
        <div className="flex items-center gap-3 self-center sm:self-auto">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="bg-surface-container-low border-none rounded-2xl py-2 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-primary-container/30 w-48"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-4">
              <th className="pb-4 pl-6">Asset</th>
              <th className="pb-4">Quantity</th>
              <th className="pb-4">Current Price</th>
              <th className="pb-4">Value</th>
              <th className="pb-4">Profit/Loss</th>
              <th className="pb-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, i) => (
              <tr 
                key={i} 
                className="group cursor-pointer"
                onClick={() => navigate(`/asset/${pos.symbol}`)}
              >
                <td className="py-4 pl-6 bg-surface-container-low group-hover:bg-surface-container-high transition-colors rounded-l-2xl">
                  <div className="flex items-center gap-3">
                    <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-black", pos.color)}>
                      {pos.symbol[0]}
                    </div>
                    <div>
                      <div className="text-sm font-black text-white">{pos.symbol}</div>
                      <div className="text-[10px] font-bold text-on-surface-variant">{pos.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 bg-surface-container-low group-hover:bg-surface-container-high transition-colors">
                  <div className="text-sm font-black text-white">{pos.quantity}</div>
                </td>
                <td className="py-4 bg-surface-container-low group-hover:bg-surface-container-high transition-colors">
                  <div className="text-sm font-black text-white">{pos.price}</div>
                </td>
                <td className="py-4 bg-surface-container-low group-hover:bg-surface-container-high transition-colors">
                  <div className="text-sm font-black text-white">{pos.value}</div>
                </td>
                <td className="py-4 bg-surface-container-low group-hover:bg-surface-container-high transition-colors text-center">
                  <div className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    pos.trend === 'up' ? "bg-secondary/10 text-secondary" : "bg-tertiary-container/10 text-tertiary-container"
                  )}>
                    {pos.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {pos.change}
                  </div>
                </td>
                <td className="py-4 pr-6 bg-surface-container-low group-hover:bg-surface-container-high transition-colors rounded-r-2xl text-right">
                  <button className="p-2 rounded-lg text-on-surface-variant hover:text-white transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
