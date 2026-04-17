import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import TopNav from '../components/layout/TopNav';
import TradingChart from '../components/trading/TradingChart';
import OrderPanel from '../components/trading/OrderPanel';
import { 
  TrendingUp, TrendingDown, Globe, Building2, 
  BarChart3, Clock, Newspaper, ChevronLeft, ExternalLink,
  DollarSign, PieChart, Activity
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function AssetDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, quoteRes, newsRes] = await Promise.all([
          api.get(`/market/profile/${symbol}`),
          api.get(`/market/quote/${symbol}`),
          api.get(`/market/news/${symbol}`)
        ]);

        setProfile(profileRes.data.data);
        setQuote(quoteRes.data.data);
        setNews(newsRes.data.data || []);
      } catch (err: any) {
        console.error("Failed to fetch asset details:", err);
        setError("Unable to retrieve asset data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white">
        <TopNav />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></div>
            <p className="font-headline font-black uppercase tracking-widest text-xs animate-pulse">Analyzing Asset Data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background text-white">
        <TopNav />
        <div className="max-w-screen-xl mx-auto p-12 text-center">
          <div className="p-12 glass-panel border border-error/20 inline-block rounded-[32px]">
            <h2 className="text-3xl font-headline font-black mb-4">Transmission Error</h2>
            <p className="text-on-surface-variant mb-8">{error || "Asset not found in our database."}</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Return to Base
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = Number(quote?.change_pct || 0) >= 0;

  return (
    <div className="min-h-screen bg-background text-white pb-24 selection:bg-primary-teal/30">
      <TopNav />
      
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary-container/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-container-low border border-outline-variant/10 flex items-center justify-center group-hover:bg-primary-container/20 group-hover:text-primary-container transition-all">
            <ChevronLeft size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight">Market Overview</span>
        </button>

        {/* Global Asset Header */}
        <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-[32px] bg-white p-4 shadow-2xl shadow-primary-container/10 border border-outline-variant/10 flex items-center justify-center overflow-hidden">
              {profile.logo ? (
                <img src={profile.logo} alt={profile.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-4xl font-black text-slate-900">{symbol?.[0]}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-headline font-black tracking-tighter leading-none italic">{profile.name}</h1>
                <span className="px-3 py-1 rounded-lg bg-surface-container-low border border-outline-variant/20 text-xs font-black text-on-surface-variant uppercase tracking-widest whitespace-nowrap self-start mt-1">
                  {symbol} : {profile.exchange?.split(' ')[0]}
                </span>
              </div>
              <p className="text-on-surface-variant font-medium flex items-center gap-2">
                <Building2 size={16} /> {profile.finnhubIndustry} • {profile.country}
              </p>
            </div>
          </div>

          <div className="lg:text-right">
            <div className="flex lg:flex-col lg:items-end items-center gap-4 lg:gap-1">
              <span className="text-5xl font-headline font-black tracking-tighter text-white">
                ${Number(quote?.last_price || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <div className={clsx(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-black tracking-tight",
                isPositive ? "text-secondary bg-secondary/10" : "text-error bg-error/10"
              )}>
                {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {isPositive ? "+" : ""}{Number(quote?.change_pct || 0).toFixed(2)}%
                <span className="text-[10px] opacity-70 ml-1">Today</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Main Visual Data (Chart & Profile) */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Extended Chart Container */}
            <div className="h-[600px] glass-panel rounded-[40px] border border-outline-variant/10 overflow-hidden">
              <TradingChart symbol={symbol || ''} />
            </div>

            {/* In-Depth Analytics Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="glass-panel p-6 rounded-3xl border border-outline-variant/5">
                  <div className="flex items-center gap-3 mb-4 text-primary-container">
                    <BarChart3 size={20} />
                    <h3 className="text-xs font-black uppercase tracking-widest">Valuation</h3>
                  </div>
                  <div className="space-y-4">
                    <StatRow label="Market Cap" value={`$${(profile.marketCapitalization / 1000).toFixed(2)}B`} />
                    <StatRow label="Shares Out." value={`${(profile.shareOutstanding / 100).toFixed(2)}M`} />
                  </div>
               </div>

               <div className="glass-panel p-6 rounded-3xl border border-outline-variant/5">
                  <div className="flex items-center gap-3 mb-4 text-secondary">
                    <Activity size={20} />
                    <h3 className="text-xs font-black uppercase tracking-widest">Day Range</h3>
                  </div>
                  <div className="space-y-4">
                    <StatRow label="High" value={`$${Number(quote?.high || 0).toFixed(2)}`} />
                    <StatRow label="Low" value={`$${Number(quote?.low || 0).toFixed(2)}`} />
                  </div>
               </div>

               <div className="glass-panel p-6 rounded-3xl border border-outline-variant/5">
                  <div className="flex items-center gap-3 mb-4 text-primary-teal">
                    <Clock size={20} />
                    <h3 className="text-xs font-black uppercase tracking-widest">Previous</h3>
                  </div>
                  <div className="space-y-4">
                    <StatRow label="Close" value={`$${Number(quote?.prev_close || 0).toFixed(2)}`} />
                    <StatRow label="Open" value={`$${Number(quote?.open || 0).toFixed(2)}`} />
                  </div>
               </div>
            </div>

            {/* About Section */}
            <section className="glass-panel p-10 rounded-[40px] border border-outline-variant/10">
              <h3 className="text-2xl font-headline font-black mb-6 tracking-tight italic">Corporate Intelligence</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg mb-8 font-medium">
                {profile.name} is a leading player in the {profile.finnhubIndustry} sector, primarily operating within {profile.country}. 
                As a constituent of the {profile.exchange}, it continues to redefine market standards through innovation and strategic positioning.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={profile.weburl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high hover:bg-white/10 transition-all font-bold text-sm border border-outline-variant/10"
                >
                  <Globe size={18} className="text-primary-container" />
                  Official Website
                  <ExternalLink size={14} className="opacity-50" />
                </a>
              </div>
            </section>

            {/* News Feed */}
            <section>
              <div className="flex items-center justify-between mb-8 px-4">
                <h3 className="text-2xl font-headline font-black tracking-tight italic">Market Context</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Live updates for {symbol}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.length > 0 ? (
                  news.map((item, idx) => (
                    <motion.a 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel p-6 rounded-3xl border border-outline-variant/5 hover:border-primary-container/20 group transition-all"
                    >
                      <div className="mb-4 aspect-video rounded-2xl overflow-hidden bg-surface-container relative">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                             <Newspaper size={32} className="text-on-surface-variant opacity-20" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                           <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest">
                             {item.source}
                           </span>
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary-container transition-colors">
                        {item.headline}
                      </h4>
                      <div className="flex items-center justify-between mt-auto pt-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1 group-hover:text-white transition-colors">Read Intel <ExternalLink size={10} /></span>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center text-on-surface-variant font-medium">
                    No recent intelligence reports available for this asset.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right: Trading Console & Stats */}
          <div className="space-y-8">
            {/* Execution Panel */}
            <div className="sticky top-24">
              <OrderPanel symbol={symbol || ''} onSelect={(s) => navigate(`/asset/${s}`)} />
              
              {/* Desktop Key Performance Indicators */}
              <div className="mt-8 space-y-4">
                <div className="glass-panel p-6 rounded-3xl border border-outline-variant/5">
                   <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6 px-1">Global Sentiment</h4>
                   <div className="space-y-4">
                      <KPIRow icon={<DollarSign size={16} />} label="NAV" value={`$${Number(quote?.last_price || 0).toFixed(2)}`} color="text-secondary" />
                      <KPIRow icon={<PieChart size={16} />} label="Holdings" value="Institutional" color="text-primary-container" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center group/row">
      <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{label}</span>
      <span className="text-sm font-manrope font-black text-white group-hover/row:text-primary-container transition-colors">{value}</span>
    </div>
  );
}

function KPIRow({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/30 border border-outline-variant/5">
       <div className="flex items-center gap-3">
          <div className={clsx("w-8 h-8 rounded-xl bg-surface-dim border border-outline-variant/10 flex items-center justify-center", color)}>
             {icon}
          </div>
          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-sm font-manrope font-black text-white">{value}</span>
    </div>
  );
}
