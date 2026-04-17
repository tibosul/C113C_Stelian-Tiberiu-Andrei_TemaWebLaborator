import { Newspaper, Bell } from 'lucide-react';

export default function MarketFeed() {
  const news = [
    { id: 1, title: "Federal Reserve hints at interest rate cuts in Q3", source: "Bloomberg", time: "10m ago" },
    { id: 2, title: "Tesla (TSLA) reports record Q1 delivery numbers", source: "Reuters", time: "45m ago" },
    { id: 3, title: "NVIDIA surges on new AI chip announcement", source: "CNBC", time: "1h ago" },
  ];

  return (
    <div className="flex-1 bg-surface-container-low/40 rounded-3xl p-6 border border-outline-variant/5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-manrope font-bold text-white flex items-center gap-2 tracking-tight">
          <Newspaper size={18} className="text-primary-container" />
          Market News
        </h3>
        <button className="p-2 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant">
          <Bell size={18} />
        </button>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1 gap-4">
              <h4 className="text-sm font-semibold text-white group-hover:text-primary-container transition-colors leading-tight">
                {item.title}
              </h4>
            </div>
            <div className="flex gap-3 items-center text-[10px] text-on-surface-variant">
              <span className="font-bold uppercase tracking-wider text-secondary">{item.source}</span>
              <span className="w-1 h-1 bg-on-surface-variant opacity-30 rounded-full" />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 text-xs font-bold text-on-surface-variant hover:text-white transition-colors">
        SEE ALL NEWS
      </button>
    </div>
  );
}
