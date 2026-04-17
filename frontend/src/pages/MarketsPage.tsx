import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Quote,
  Coins,
  Layers,
  Settings,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon?: any }) => (
  <motion.div variants={fadeIn} className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-['Manrope']">{title}</h2>
    </div>
    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
  </motion.div>
);

const AssetCard = ({ title, description, icon: Icon, items }: { title: string, description: string, icon: any, items: string[] }) => (
  <motion.div 
    variants={fadeIn}
    whileHover={{ y: -8 }}
    className="relative group h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative h-full p-8 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-cyan-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center md:text-left">
    <p className="text-4xl font-black text-cyan-400 font-['Manrope'] mb-1">{value}</p>
    <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">{label}</p>
  </div>
);

const ExpertQuote = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <motion.div 
    variants={fadeIn}
    className="p-8 rounded-3xl bg-slate-800/20 border border-white/5 relative overflow-hidden group"
  >
    <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-cyan-500/10 transition-colors" />
    <p className="text-lg text-slate-300 italic mb-6 relative z-10 leading-relaxed">"{quote}"</p>
    <div>
      <p className="font-bold text-white">{author}</p>
      <p className="text-xs uppercase tracking-widest text-cyan-500 font-bold">{role}</p>
    </div>
  </motion.div>
);

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-[#060b19] text-slate-300 selection:bg-cyan-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#060b19]/80 backdrop-blur-md border-bottom border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-[900] tracking-tighter text-white font-['Manrope']">
              TRADE<span className="text-cyan-400">FLOW</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link to="/register" className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#060b19] font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-cyan-400">The Ultimate Financial Blueprint</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white font-['Manrope'] leading-[1.05] mb-8">
              Markets & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Assets Guide</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Master the mechanics of global finance through our high-fidelity educational framework. 
              From liquidity pools to equity derivatives, we decode the complexity of the kinetic trade.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[
              { label: 'Overview', icon: Globe },
              { label: 'Stocks', icon: BarChart3 },
              { label: 'Crypto', icon: Coins },
              { label: 'ETFs', icon: Layers },
              { label: 'Glossary', icon: BookOpen }
            ].map((item, i) => (
              <motion.button
                key={i}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 flex flex-col items-center gap-3 transition-colors group"
              >
                <item.icon className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                title="Introduction to Trading" 
                subtitle="Financial markets are the circulatory system of the global economy. They serve as the central venue where capital is allocated, risks are transferred, and price discovery occurs in real-time."
              />
              <div className="space-y-8">
                <div className="flex gap-6 p-6 rounded-3xl bg-slate-800/20 border border-white/5">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Liquidity Dynamics</h4>
                    <p className="text-slate-400 leading-relaxed italic">
                      "Understanding markets begins with Liquidity—the ease with which an asset can be converted into cash without affecting its market price."
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-8 py-4">
                  <StatItem value="1.2M+" label="Active Traders" />
                  <StatItem value="15+" label="Global Exchanges" />
                  <StatItem value="0.0s" label="Execution Time" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1611974717482-98287e07663e?q=80&w=2070&auto=format&fit=crop" 
                alt="Market Dynamics"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-x-8 bottom-8 p-8 rounded-[2rem] bg-[#060b19]/80 backdrop-blur-xl border border-white/10 z-20">
                <p className="text-cyan-400 font-black mb-2 tracking-widest text-xs uppercase">Pro Tip</p>
                <h4 className="text-white font-bold text-lg mb-2">Market Depth Perception</h4>
                <p className="text-slate-400 text-sm">Visualize the volume of pending orders at various price levels via the Order Book to understand momentum.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Market Sectors Explorer */}
        <section className="bg-slate-900/20 py-32 mb-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              title="Market Sectors Explorer" 
              subtitle="Navigating the diverse landscape of tradable instruments across the kinetic lens."
            />
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <AssetCard 
                title="Stocks & Equities"
                icon={BarChart3}
                description="Representing fractional ownership in a corporation, equities allow you to participate in global growth."
                items={['Nasdaq-100 Tech Leaders', 'S&P 500 Blue Chips', 'Fractional Shares Available']}
              />
              <AssetCard 
                title="Digital Assets"
                icon={Coins}
                description="The frontier of Decentralized Finance (DeFi). 24/7 trading on global blockchain networks."
                items={['Bitcoin (Market Hedge)', 'Ethereum (Smart Contracts)', 'Stablecoins & DeFi Tokens']}
              />
              <AssetCard 
                title="ETFs & Funds"
                icon={Layers}
                description="Diversified exposure to entire sectors or indices through a single, liquid instrument."
                items={['Sector-Specific Exposure', 'Inverse & Leveraged ETFs', 'Lower Risk Management']}
              />
            </motion.div>
          </div>
        </section>

        {/* Analysis Frameworks */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3rem] bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-cyan-500/10"
            >
              <h3 className="text-3xl font-black text-white mb-6">Technical Analysis</h3>
              <p className="text-slate-400 mb-10 leading-relaxed italic">
                "Study charts and mathematical indicators to predict future price direction based on human psychology and supply zones."
              </p>
              <div className="space-y-6">
                {[
                  { id: '01', title: 'Price Discounts Everything', desc: 'All known info is already baked into the current market price.' },
                  { id: '02', title: 'Price Moves in Trends', desc: 'Once established, trends tend to continue until inertia breaks.' },
                  { id: '03', title: 'History Repeats', desc: 'Consistent human behavior creates recognizable chart patterns.' }
                ].map((point, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-4xl font-black text-cyan-500/20 group-hover:text-cyan-400/40 transition-colors uppercase font-['Manrope']">{point.id}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">{point.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fundamental Analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3rem] bg-gradient-to-br from-slate-800/20 to-slate-900/40 border border-white/5"
            >
              <h3 className="text-3xl font-black text-white mb-6">Fundamental Analysis</h3>
              <p className="text-slate-400 mb-10 leading-relaxed italic">
                "Look at the intrinsic value of an asset through earnings reports, macro data, and balance sheets."
              </p>
              <div className="space-y-6">
                {[
                  { id: '01', title: 'Intrinsic Value', desc: 'Calculating the real worth vs current market speculation.' },
                  { id: '02', title: 'Long-term Strategic View', desc: 'Markets eventually align with the core value of the instrument.' },
                  { id: '03', title: 'Economic Health', desc: 'Interest rates and fiscal policy impacts on sector performance.' }
                ].map((point, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-4xl font-black text-white/10 group-hover:text-cyan-400/40 transition-colors uppercase font-['Manrope']">{point.id}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">{point.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mechanics Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <SectionHeader 
            title="Interactive Market Mechanics" 
            subtitle="The internal clockwork of every transaction. Mastery of these concepts is the first line of defense."
            icon={Settings}
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'The Bid-Ask Spread', desc: 'The cost of entry. The difference between the highest buy price and lowest sell price.', detail: 'Paid to market makers for liquidity.' },
              { title: 'Dynamic Leverage', desc: 'Control a large position with minimal capital. Amplifies both gains and total risk.', detail: 'Up to 1:30 for retail, 1:500 for pros.' },
              { title: 'Margin Requirements', desc: 'The collateral required to maintain your open positions. Avoid the Margin Call.', detail: 'Real-time equity/margin tracking.' }
            ].map((mech, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-slate-900/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                <h4 className="text-xl font-bold text-white mb-3">{mech.title}</h4>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{mech.desc}</p>
                <div className="pt-4 border-t border-white/5 mt-auto">
                  <p className="text-xs font-black uppercase text-cyan-500 tracking-widest">{mech.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Insights */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <SectionHeader 
            title="Expert Insights" 
            subtitle="Wisdom from the front lines of high-stakes market research."
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <ExpertQuote 
              quote="Risk management is not about avoiding losses, but about ensuring you survive to take the next trade."
              author="Marcus Chen"
              role="Head Strategist"
            />
            <ExpertQuote 
              quote="The market is a device for transferring money from the impatient to the patient."
              author="Sarah Vance"
              role="Quant Researcher"
            />
            <ExpertQuote 
              quote="Don't trade what you think; trade what you see. The tape never lies."
              author="David Roth"
              role="Senior Trader"
            />
            <ExpertQuote 
              quote="In the age of AI, the biggest edge a trader has is emotional intelligence."
              author="Elena Moretti"
              role="Fintech Analyst"
            />
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-cyan-500 to-blue-600 overflow-hidden shadow-2xl shadow-cyan-500/20 group">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[20s]">
              <Globe className="w-full h-full text-white" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white font-['Manrope'] tracking-tight mb-8">Ready to master the mechanics?</h2>
              <p className="text-cyan-50 text-xl mb-12 leading-relaxed opacity-90">
                Join over 1.2M traders applying these insights in real-time. Setup your institutional-grade account in less than 3 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="px-10 py-5 bg-white text-blue-600 text-lg font-black rounded-2xl hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 text-lg font-black rounded-2xl hover:bg-white/20 transition-colors flex items-center justify-center">
                  Login Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#060b19]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-[900] tracking-tighter text-white font-['Manrope']">
                  TRADE<span className="text-cyan-400">FLOW</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Precision Market Intelligence. Engineered for high-stakes trading environments across global asset classes.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h5 className="text-sm font-black text-white uppercase tracking-widest">Platform</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/markets" className="hover:text-cyan-400 transition-colors">Markets</Link></li>
                  <li><Link to="/markets" className="hover:text-cyan-400 transition-colors">Assets</Link></li>
                  <li><Link to="/learn" className="hover:text-cyan-400 transition-colors">Academy</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-black text-white uppercase tracking-widest">Legal</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Risk Disclosure</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-black text-white uppercase tracking-widest">Safety</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    FCA Regulated
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    AES-256 Security
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
            <p>© 2024 TradeFlow Markets. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Risk Warning</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
