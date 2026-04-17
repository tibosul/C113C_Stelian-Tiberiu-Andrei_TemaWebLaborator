import { useState } from 'react';
import { PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import TopNav from '../components/layout/TopNav';
import PortfolioHeader from '../components/trading/PortfolioHeader';
import PortfolioChart from '../components/trading/PortfolioChart';
import PositionsTable from '../components/trading/PositionsTable';
import SupportModal from '../components/trading/SupportModal';
import DepositModal from '../components/trading/DepositModal';

const allocationData = [
  { name: 'Stocks', value: 65, color: '#00E5FF' },
  { name: 'Crypto', value: 25, color: '#45dfa4' },
  { name: 'Cash', value: 10, color: '#ffffff' },
];

export default function PortfolioPage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-background text-on-background overflow-hidden flex flex-col font-body selection:bg-primary-container/30">
      <TopNav />

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-surface-dim relative">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Summary */}
          <PortfolioHeader />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left: Performance Chart */}
            <div className="xl:col-span-2">
              <PortfolioChart />
            </div>

            {/* Right: Allocation & Insights */}
            <div className="space-y-8">
              {/* Asset Allocation Card */}
              <div className="glass-panel p-8 rounded-[32px] border border-white/5 relative overflow-hidden h-[300px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-manrope font-black text-white tracking-tight">Asset Allocation</h3>
                  <PieIcon size={18} className="text-on-surface-variant" />
                </div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#191f31', border: 'none', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                   {allocationData.map((item) => (
                     <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider">{item.name}</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* Insights Card */}
              <div className="glass-panel p-8 rounded-[32px] border border-white/5 bg-gradient-to-br from-primary-container/10 to-transparent">
                 <div className="flex items-center gap-3 mb-4">
                   <TrendingUp size={20} className="text-primary-container" />
                   <h3 className="text-sm font-black uppercase tracking-widest text-primary-container">Market Insight</h3>
                 </div>
                 <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                   Your portfolio has grown by <span className="text-white font-bold">1.2%</span> over the last 24 hours, outperforming the market (S&P 500: +0.4%). Exposure to <span className="text-white font-bold">Tesla</span> remains the primary growth driver.
                 </p>
                 <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary cursor-pointer hover:gap-3 transition-all">
                    <span>View full analysis</span>
                    <TrendingUp size={14} />
                 </div>
              </div>
            </div>

          </div>

          {/* Positions Table */}
          <div className="pb-12">
            <PositionsTable />
          </div>
        </div>

        {/* Ambient Decorative Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      </main>

      {/* Support Modal */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </div>
  );
}
