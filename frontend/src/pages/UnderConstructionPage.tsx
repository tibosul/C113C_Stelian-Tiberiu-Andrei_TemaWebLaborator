import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Construction, 
  ChevronLeft, 
  Bell, 
  Settings,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

export default function UnderConstructionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract custom content from router state or use defaults
  const { 
    title = "Module Under Construction", 
    moduleName = "Feature",
    description = "We're currently engineering this high-frequency module to meet our institutional standards of precision and performance."
  } = (location.state as any) || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-container/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full animate-pulse" />
      
      {/* Central Glass Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full glass-panel p-12 md:p-20 rounded-[48px] border border-white/10 shadow-2xl relative z-10 text-center"
      >
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-primary-container to-secondary rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg shadow-primary-container/20"
        >
            <Construction size={48} className="text-on-primary-container" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 italic">
          {title}
        </h1>
        
        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          {description}
        </p>

        {/* Generic Feature Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
            <Feature teaserIcon={<Settings size={20} />} label="Optimization" />
            <Feature teaserIcon={<Zap size={20} />} label="Syncing" />
            <Feature teaserIcon={<Layers size={20} />} label="Protocol" />
        </div>

        <div className="flex justify-center">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-primary-container text-on-primary-container font-black tracking-tight shadow-xl shadow-primary-container/20 hover:scale-105 transition-all group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Return
            </button>
        </div>

        {/* Status indicator */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center gap-8">
            <StatusItem icon={<Shield size={16} />} label="Secure" />
            <StatusItem icon={<Zap size={16} />} label="Fast" />
        </div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight 
                }}
                animate={{ 
                    y: [null, Math.random() * -100, null],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                    duration: 5 + Math.random() * 10, 
                    repeat: Infinity 
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
              />
          ))}
      </div>
    </div>
  );
}

function Feature({ teaserIcon, label }: { teaserIcon: React.ReactNode, label: string }) {
    return (
        <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-primary-container">
                {teaserIcon}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
                {label}
            </span>
        </div>
    )
}

function StatusItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-2 text-on-surface-variant">
            <div className="p-1.5 rounded-lg bg-white/5">
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">
                {label}
            </span>
        </div>
    )
}
