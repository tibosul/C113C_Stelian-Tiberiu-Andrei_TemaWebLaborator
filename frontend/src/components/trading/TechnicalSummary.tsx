import { Zap } from 'lucide-react';

export default function TechnicalSummary() {
  const label = "Strong Buy";

  return (
    <div className="w-64 bg-surface-container-low/40 rounded-3xl p-6 border border-outline-variant/10 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-6 self-start">
        <Zap size={18} className="text-secondary" />
        <h3 className="text-sm font-manrope font-bold text-white tracking-tight">Technical Summary</h3>
      </div>

      {/* Speedometer Gauge Mock */}
      <div className="relative w-40 h-24 overflow-hidden mb-4">
        {/* Track */}
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <path
            d="M10,45 A40,40 0 0,1 90,45"
            fill="none"
            stroke="var(--color-surface-container-high)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active Gradient Track */}
          <path
            d="M10,45 A40,40 0 0,1 60,11"
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(69,223,164,0.3)]"
          />
          {/* Needle */}
          <line
            x1="50" y1="45" x2="75" y2="15"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="45" r="3" fill="white" />
        </svg>
      </div>

      <div className="text-center">
        <div className="text-lg font-bold text-secondary mb-1">{label}</div>
        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Based on 24 indicators</div>
      </div>

      {/* Mini Indicators */}
      <div className="w-full mt-6 grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
        <div className="p-2 rounded-lg bg-error/10 text-error">Sell (2)</div>
        <div className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant">Neutral (5)</div>
        <div className="p-2 rounded-lg bg-secondary/10 text-secondary">Buy (17)</div>
      </div>
    </div>
  );
}
