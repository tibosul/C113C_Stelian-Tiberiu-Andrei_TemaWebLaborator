import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { time: '09:00', value: 132000 },
  { time: '10:00', value: 132500 },
  { time: '11:00', value: 133200 },
  { time: '12:00', value: 132800 },
  { time: '13:00', value: 134100 },
  { time: '14:00', value: 133900 },
  { time: '15:00', value: 134502 },
];

export default function PortfolioChart() {
  return (
    <div className="w-full h-full min-h-[400px] glass-panel p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10 transition-opacity group-hover:opacity-10" />

      <div className="flex items-center justify-between mb-8">
        <div>
           <h3 className="text-xl font-manrope font-black text-white tracking-tight">Portfolio Performance</h3>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Asset evolution in the last 24 hours</p>
        </div>
        <div className="flex gap-2">
          {['1D', '1W', '1M', 'ALL'].map((range) => (
             <button 
               key={range}
               className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-surface-container-high border border-transparent hover:border-white/5 data-[active=true]:bg-primary-container/20 data-[active=true]:text-primary-container data-[active=true]:border-primary-container/20"
               data-active={range === '1D'}
             >
               {range}
             </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#849396', fontSize: 10, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              hide
              domain={['dataMin - 1000', 'dataMax + 1000']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#191f31', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '900',
                color: '#fff' 
              }}
              itemStyle={{ color: '#00E5FF' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#00E5FF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
