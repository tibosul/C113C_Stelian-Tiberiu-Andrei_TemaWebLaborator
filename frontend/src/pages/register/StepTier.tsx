export default function StepTier({ onSelectTier, onBack, isRegistering }: any) {
  return (
    <div className="w-full max-w-7xl">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">Choose Your Tier</h2>
        <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">Select the precision level that matches your trading velocity. All tiers include institutional-grade execution as standard.</p>
      </div>

      {/* Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Basic Card */}
        <div className="glass-panel rounded-xl p-6 flex flex-col transition-all duration-300 hover:bg-surface-container-highest/30 group cursor-pointer border border-outline-variant/15">
          <div className="mb-6">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface-variant block mb-1 font-semibold">Entry Level</span>
            <h3 className="font-headline text-xl font-bold text-white">Basic</h3>
          </div>
          <div className="mb-6 space-y-3 flex-grow">
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Standard 0.1% Trading Fees</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Community Support</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Core Market Data</p>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/10">
            <div className="flex items-baseline space-x-1 mb-4">
              <span className="text-2xl font-headline font-bold text-white">$0</span>
              <span className="text-[9px] uppercase tracking-widest text-on-surface-variant">/mo</span>
            </div>
            <button 
              disabled={isRegistering}
              className="w-full py-3 px-3 rounded-lg font-label text-[10px] uppercase tracking-[0.2em] font-bold bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-all disabled:opacity-50"
              onClick={() => onSelectTier('basic')}
            >
              Select Basic
            </button>
          </div>
        </div>

        {/* Standard Card */}
        <div className="glass-panel rounded-xl p-6 flex flex-col transition-all duration-300 hover:bg-surface-container-highest/30 group cursor-pointer border border-outline-variant/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <span className="bg-secondary-container/10 text-secondary text-[8px] font-bold tracking-widest px-2 py-1 rounded-full uppercase">Popular</span>
          </div>
          <div className="mb-6">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface-variant block mb-1 font-semibold">Optimized</span>
            <h3 className="font-headline text-xl font-bold text-white">Standard</h3>
          </div>
          <div className="mb-6 space-y-3 flex-grow">
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Reduced 0.05% Fees</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Priority Email Support</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Advanced Analytics</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">API Access (Basic)</p>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/10">
            <div className="flex items-baseline space-x-1 mb-4">
              <span className="text-2xl font-headline font-bold text-white">$49</span>
              <span className="text-[9px] uppercase tracking-widest text-on-surface-variant">/mo</span>
            </div>
            <button 
              disabled={isRegistering}
              className="w-full py-3 px-3 rounded-lg font-label text-[10px] uppercase tracking-[0.2em] font-bold border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all disabled:opacity-50"
              onClick={() => onSelectTier('standard')}
            >
              Select Standard
            </button>
          </div>
        </div>

        {/* Premium Card */}
        <div className="glass-panel rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.05)] group cursor-pointer border-2 border-cyan-400/30 relative shadow-2xl bg-surface-container-high/40">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-br from-[#00e5ff] to-[#00daf3]"></div>
          <div className="mb-6">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-cyan-400 font-bold block mb-1">High Velocity</span>
            <h3 className="font-headline text-xl font-bold text-white">Premium</h3>
          </div>
          <div className="mb-6 space-y-3 flex-grow">
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">verified</span>
              <p className="font-body text-[11px] text-on-surface leading-tight">Ultra-Low 0.02% Fees</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">verified</span>
              <p className="font-body text-[11px] text-on-surface leading-tight">24/7 Dedicated Support</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">verified</span>
              <p className="font-body text-[11px] text-on-surface leading-tight">Level 2 Order Book</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400 text-[16px] mt-0.5">verified</span>
              <p className="font-body text-[11px] text-on-surface leading-tight">Algorithm Builder</p>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/20">
            <div className="flex items-baseline space-x-1 mb-4">
              <span className="text-2xl font-headline font-bold text-white">$199</span>
              <span className="text-[9px] uppercase tracking-widest text-on-surface-variant">/mo</span>
            </div>
            <button 
              disabled={isRegistering}
              className="w-full py-3 px-3 rounded-lg font-label text-[10px] uppercase tracking-[0.2em] font-black bg-gradient-to-br from-[#00e5ff] to-[#00daf3] text-on-primary-fixed shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:brightness-110 transition-all disabled:opacity-50"
              onClick={() => onSelectTier('premium')}
            >
              Upgrade Premium
            </button>
          </div>
        </div>

        {/* VIP Card */}
        <div className="glass-panel rounded-xl p-6 flex flex-col transition-all duration-300 hover:bg-slate-900/40 cursor-pointer border-dashed border-2 border-outline-variant/30">
          <div className="mb-6">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-on-surface-variant block mb-1 font-semibold">Institutional</span>
            <h3 className="font-headline text-xl font-bold text-white">VIP</h3>
          </div>
          <div className="mb-6 space-y-3 flex-grow">
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400/60 text-[16px] mt-0.5">diamond</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Zero Maker Fees</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400/60 text-[16px] mt-0.5">diamond</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Personal Manager</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400/60 text-[16px] mt-0.5">diamond</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Full API Master Access</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="material-symbols-outlined text-cyan-400/60 text-[16px] mt-0.5">diamond</span>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Exclusive Insights</p>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/10">
            <div className="flex flex-col mb-4">
              <span className="text-lg font-headline font-bold text-white">Custom Pricing</span>
              <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-medium">Annual Billing Only</span>
            </div>
            <button 
              disabled={isRegistering}
              className="w-full py-3 px-3 rounded-lg font-label text-[10px] uppercase tracking-[0.2em] font-bold border border-outline-variant hover:bg-surface-container-highest transition-all disabled:opacity-50"
              onClick={() => onSelectTier('vip')}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 opacity-50">
        <span className="material-symbols-outlined text-[12px] text-cyan-400">lock</span>
        <span className="font-label text-[8px] uppercase tracking-[0.2em] text-on-surface-variant">256-Bit Encrypted Data Environment</span>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 w-full flex flex-col md:flex-row justify-between items-center py-6 border-t border-outline-variant/10">
        <button 
          className="flex items-center space-x-2 text-on-surface-variant hover:text-cyan-400 transition-colors mb-4 md:mb-0 group disabled:opacity-50"
          onClick={onBack}
          disabled={isRegistering}
        >
          <span className="material-symbols-outlined text-xs group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label text-[9px] uppercase tracking-[0.2em] font-bold">Back to Profile</span>
        </button>
        <div className="text-center md:text-right">
          <p className="font-body text-[9px] text-on-surface-variant mb-1 tracking-wide">By continuing, you agree to our <a className="text-cyan-400 hover:underline" href="#">Subscription Terms</a>.</p>
          <div className="flex items-center justify-center md:justify-end gap-2 opacity-40">
            <span className="font-label text-[8px] uppercase tracking-[0.2em] text-on-surface-variant">TradeFlow Institutional Grade Precision • 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
