import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { clsx } from 'clsx';

export default function PortfolioHeader() {
  const metrics = [
    {
      label: 'Total Balance',
      value: '$134,502.50',
      change: '+$1,240.20',
      changePercent: '0.92%',
      trend: 'up',
      icon: <DollarSign size={20} className="text-primary-container" />,
      glowColor: 'bg-primary-container'
    },
    {
      label: 'Daily P&L',
      value: '$2,450.80',
      change: '+1.85%',
      trend: 'up',
      icon: <TrendingUp size={20} className="text-secondary" />,
      glowColor: 'bg-secondary'
    },
    {
      label: 'Total Realized',
      value: '$12,340.00',
      change: '+$520.10',
      trend: 'up',
      icon: <Activity size={20} className="text-primary-container" />,
      glowColor: 'bg-primary-container'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, i) => (
        <div 
          key={i} 
          className="glass-panel group relative overflow-hidden p-6 hover:bg-surface-container-high transition-all duration-500 rounded-[32px] border border-white/5"
        >
          {/* Ambient Glow */}
          <div className={clsx(
            "absolute -top-12 -right-12 w-24 h-24 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity",
            metric.glowColor
          )} />
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-surface-container-highest flex items-center justify-center border border-white/5">
              {metric.icon}
            </div>
            <div className={clsx(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
              metric.trend === 'up' ? "bg-secondary/10 text-secondary" : "bg-tertiary-container/10 text-tertiary-container"
            )}>
              {metric.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {metric.change}
            </div>
          </div>

          <div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">{metric.label}</p>
             <h2 className="text-4xl font-manrope font-black text-white tracking-tighter">{metric.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
