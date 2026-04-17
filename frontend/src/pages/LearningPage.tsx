import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen, TrendingUp, Shield, Zap, Globe, Cpu, BarChart3, ChevronRight } from "lucide-react";
import LegalModal from "../components/LegalModal";

export default function LearningPage() {
  const [legalType, setLegalType] = useState<null | "privacy" | "support" | "terms">(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-surface-dim text-on-surface selection:bg-primary-container selection:text-on-primary-container flex flex-col scroll-smooth overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Simplified Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center h-20 px-8">
          <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-cyan-400 font-headline group">
            <img src="/trading_logo.png" alt="TradeFlow Logo" className="w-10 h-10 rounded-xl object-cover shadow-2xl shadow-cyan-400/20 ring-1 ring-cyan-400/20 group-hover:scale-110 transition-transform duration-300" />
            TradeFlow
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/login" className="px-6 py-2.5 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2.5 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-secondary-container/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-screen-xl mx-auto px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 mb-8">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Trading Academy</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white leading-none mb-8">
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">Markets</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
                Transition from a spectator to a strategist. Our institutional-grade curriculum is designed to help you navigate global financial landscapes with clinical precision.
              </p>
              <div className="flex justify-center gap-4">
                 <button onClick={() => document.getElementById('fundamentals')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all group">
                   Start Learning
                   <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fundamentals Section */}
        <section id="fundamentals" className="py-24 relative">
          <div className="max-w-screen-xl mx-auto px-8">
             <div className="mb-16">
                <h2 className="text-4xl font-black font-headline tracking-tight text-white mb-4">The Mechanics of Exchange</h2>
                <p className="text-on-surface-variant text-lg">Fundamental concepts every professional trader must master.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Buy & Sell Logic",
                    desc: "Trading is the simultaneous purchase of one asset and sale of another. Profit is generated from the spread or price delta over a specific timeframe.",
                    icon: <TrendingUp className="w-8 h-8 text-secondary" />,
                    color: "secondary"
                  },
                  {
                    title: "Order Types",
                    desc: "Market Orders execute instantly at current price. Limit Orders wait for your specific target, ensuring entry precision and execution control.",
                    icon: <BarChart3 className="w-8 h-8 text-primary-container" />,
                    color: "primary-container"
                  },
                  {
                    title: "Market Volatility",
                    desc: "Volatility measures price fluctuations. High volatility offers greater profit potential but requires advanced risk management protocols.",
                    icon: <Zap className="w-8 h-8 text-yellow-400" />,
                    color: "yellow-400"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="glass-panel p-8 rounded-[2rem] border border-white/5 hover:border-cyan-400/20 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-6 shadow-2xl">
                       {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Assets Section */}
        <section className="py-24 bg-surface-container-low/30 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-cyan-400/5 blur-[150px] rounded-full pointer-events-none"></div>
           
           <div className="max-w-screen-xl mx-auto px-8 relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-black font-headline tracking-tight text-white mb-4">Multi-Asset Ecosystem</h2>
                 <p className="text-on-surface-variant text-lg">Access diverse liquidity pools from a single institutional-grade interface.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {[
                   {
                     title: "Global Equities",
                     type: "Stocks & ETFs",
                     desc: "Own pieces of the world's most innovative companies. From blue chips to emerging tech, access 5,000+ global stocks with real-time settlement.",
                     icon: <Globe className="w-12 h-12 text-cyan-400" />,
                     stats: ["Zero Commissions", "Fractional Shares", "Instant Liquidity"]
                   },
                   {
                     title: "Digital Assets",
                     type: "Cryptocurrencies",
                     desc: "Trade the future of finance. Access liquid markets for Bitcoin, Ethereum, and leading DeFi protocols with cold-storage security.",
                     icon: <Cpu className="w-12 h-12 text-secondary" />,
                     stats: ["24/7 Market Access", "Direct Ledger Proof", "Institutional Custody"]
                   }
                 ].map((asset, i) => (
                   <div key={i} className="glass-panel p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start hover:shadow-[0_0_50px_rgba(0,229,255,0.05)] transition-shadow">
                      <div className="p-5 rounded-3xl bg-surface-container-highest border border-white/5 shadow-inner">
                         {asset.icon}
                      </div>
                      <div className="flex-grow">
                         <span className="text-[10px] uppercase tracking-[0.2em] font-black text-cyan-400 mb-2 block">{asset.type}</span>
                         <h3 className="text-3xl font-black text-white mb-4 leading-tight">{asset.title}</h3>
                         <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">{asset.desc}</p>
                         <div className="flex flex-wrap gap-2">
                            {asset.stats.map((stat, j) => (
                              <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-white/50">{stat}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Anatomy of a Trade */}
        <section className="py-24">
           <div className="max-w-screen-xl mx-auto px-8">
              <div className="glass-panel p-12 md:p-20 rounded-[3.5rem] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-5xl font-black font-headline tracking-tighter text-white mb-8">Anatomy of a Trade</h2>
                        <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                          Technical analysis isn't guessing—it's reading the language of the market. Our platform provides the high-fidelity tools needed to identify patterns before they unfold.
                        </p>
                        <ul className="space-y-6">
                           {[
                             { t: "Technical Indicators", d: "RSI, MACD, and Bollinger Bands integrated directly into your view." },
                             { t: "Order Flow Analysis", d: "See where the institutional volume is moving in real-time." },
                             { t: "Execution Precision", d: "One-click execution from chart with 15ms average latency." }
                           ].map((item, i) => (
                             <li key={i} className="flex gap-4">
                                <div className="mt-1 w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0">
                                   <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                </div>
                                <div>
                                   <h4 className="font-bold text-white text-sm uppercase tracking-wider">{item.t}</h4>
                                   <p className="text-on-surface-variant text-sm mt-1">{item.d}</p>
                                </div>
                             </li>
                           ))}
                        </ul>
                    </div>
                    <div className="relative">
                       <div className="aspect-video bg-surface-container-highest rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                          {/* Decorative Chart UI Mockup */}
                          <div className="absolute inset-0 p-4">
                             <div className="w-full h-full flex items-end gap-1">
                                {[40, 60, 45, 70, 55, 80, 75, 90, 85, 95, 80, 85, 70, 75, 60, 65, 50].map((h, i) => (
                                  <div key={i} className="flex-grow bg-cyan-400/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                             </div>
                             <div className="absolute top-1/2 left-0 right-0 h-px bg-secondary/30"></div>
                             <div className="absolute top-1/4 right-4 bg-primary-container px-2 py-1 rounded text-[8px] font-black text-on-primary-container uppercase">Buy Order @ $142.50</div>
                          </div>
                       </div>
                       {/* Floating UI segments */}
                       <div className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl shadow-2xl border border-white/10 animate-bounce">
                          <Zap className="w-5 h-5 text-cyan-400" />
                       </div>
                       <div className="absolute -bottom-6 -left-6 glass-panel px-6 py-4 rounded-2xl shadow-2xl border border-white/10">
                          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Efficiency Rating</span>
                          <div className="text-xl font-black text-secondary">99.8%</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* The Lumina Edge */}
        <section className="py-24 relative overflow-hidden">
           <div className="max-w-screen-xl mx-auto px-8 text-center relative z-10">
              <h2 className="text-4xl font-black font-headline tracking-tight text-white mb-12">The TradeFlow Advantage</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { icon: <Zap className="w-6 h-6" />, title: "Lightning Execution", desc: "15ms average execution speed. In the world of trading, milliseconds matter." },
                   { icon: <Shield className="w-6 h-6" />, title: "Institutional Security", desc: "AES-256 encryption and cold storage for all assets. Your capital is fortified." },
                   { icon: <Globe className="w-6 h-6" />, title: "Global Reach", desc: "Access 50+ global exchanges from a single unified trading workspace." }
                 ].map((feat, i) => (
                   <div key={i} className="p-8 rounded-3xl bg-surface-container-high/50 border border-white/5 hover:bg-surface-container-high transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mx-auto mb-6">
                         {feat.icon}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3">{feat.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{feat.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-t from-primary-container/10 to-transparent">
           <div className="max-w-screen-xl mx-auto px-8 text-center">
              <h2 className="text-5xl font-black font-headline tracking-tighter text-white mb-8">Ready to Apply Your Knowledge?</h2>
              <Link to="/register" className="px-12 py-5 bg-gradient-to-br from-primary-container to-surface-tint text-on-primary-container text-xl font-bold rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-cyan-400/20 active:scale-95 inline-block">
                 Open Your Institutional Account
              </Link>
           </div>
        </section>
      </main>

      <footer className="py-12 bg-slate-950 border-t border-outline-variant/10 text-center">
        <div className="max-w-screen-xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3 group">
             <img 
               src="/trading_logo.png" 
               alt="Logo" 
               className="w-10 h-10 rounded-xl object-cover shadow-2xl shadow-cyan-400/20 ring-1 ring-cyan-400/20 group-hover:scale-110 transition-transform duration-300" 
             />
             <span className="font-headline font-black text-lg text-white">TradeFlow</span>
           </div>
           <nav className="flex flex-wrap gap-8 justify-center">
              <button onClick={() => setLegalType('privacy')} className="text-xs text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest font-black">Privacy Protocol</button>
              <button onClick={() => setLegalType('terms')} className="text-xs text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest font-black">Terms of Access</button>
              <button onClick={() => setLegalType('support')} className="text-xs text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest font-black">Risk Disclosure</button>
           </nav>
           <p className="text-xs text-on-surface-variant font-medium opacity-50">© 2026 TradeFlow Institutional. All rights reserved.</p>
        </div>
      </footer>

      <LegalModal type={legalType} isOpen={!!legalType} onClose={() => setLegalType(null)} />
    </div>
  );
}
