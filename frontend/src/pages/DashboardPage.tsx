import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import AccountSidebar from '../components/trading/AccountSidebar';
import TradingChart from '../components/trading/TradingChart';
import OrderPanel from '../components/trading/OrderPanel';
import MarketFeed from '../components/trading/MarketFeed';
import TechnicalSummary from '../components/trading/TechnicalSummary';
import SupportModal from '../components/trading/SupportModal';
import DepositModal from '../components/trading/DepositModal';



export default function DashboardPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('TSLA');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);


  return (
    <div className="h-screen w-screen bg-background text-on-background overflow-hidden flex flex-col font-body selection:bg-primary-container/30">
      {/* Unified Navigation */}
      <TopNav />

      {/* Main Trading Workspace */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 bg-surface-dim">
        
        {/* Left: Account & Performance (Sidebar) */}
        <aside className="h-full hidden lg:block">
          <AccountSidebar 
            onOpenSupport={() => setIsSupportModalOpen(true)} 
            onOpenDeposit={() => setIsDepositModalOpen(true)}
          />
        </aside>

        {/* Center: Trading Console */}
        <section className="flex-1 flex flex-col gap-4 overflow-hidden h-full">
          {/* Top Layer: Main Chart */}
          <div className="flex-[3] relative">
            <TradingChart symbol={selectedSymbol} />
          </div>

          {/* Bottom Layer: Analytics & News */}
          <div className="flex-[1.2] flex gap-4 min-h-[200px]">
            <MarketFeed />
            <TechnicalSummary />
          </div>
        </section>

        {/* Right: Execution Panel */}
        <aside className="h-full hidden xl:block">
           <OrderPanel 
            symbol={selectedSymbol} 
            onSelect={setSelectedSymbol} 
           />
        </aside>

      </main>

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Support Modal (Root Level) */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />

      {/* Deposit Modal (Root Level) */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </div>
  );
}
