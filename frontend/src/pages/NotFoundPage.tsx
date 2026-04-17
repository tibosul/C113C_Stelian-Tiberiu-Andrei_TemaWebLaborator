import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, ShieldCheck, Globe, HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-dim text-on-surface flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Background Decorative Element: Grid or dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(var(--color-outline) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-2xl w-full flex flex-col items-center text-center relative z-10">
        {/* Animated 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          <h1 className="text-[180px] sm:text-[220px] font-manrope font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary-container to-surface-dim/0 opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "backOut" }}
              className="w-24 h-24 bg-primary-container/20 rounded-3xl blur-2xl animate-pulse"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-panel p-10 sm:p-14 rounded-[40px] border border-outline-variant/10 shadow-2xl relative"
        >
          <h2 className="text-3xl sm:text-4xl font-manrope font-black text-white mb-4 tracking-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-md mx-auto">
            The trading floor you're looking for doesn't exist or has been moved. Check the URL or return to your portfolio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/dashboard"
              className="px-8 py-4 bg-primary-container text-on-primary-fixed font-black rounded-2xl flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] group"
            >
              <Home size={20} className="group-hover:rotate-12 transition-transform" />
              Back to Dashboard
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-surface-container-high text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-surface-container-highest transition-all border border-outline-variant/10 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant/10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
            <a href="#" className="flex items-center gap-2 hover:text-primary-container transition-colors">
              <ShieldCheck size={14} /> Security Status
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-primary-container transition-colors">
              <Globe size={14} /> Market Protocol
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-primary-container transition-colors">
              <HelpCircle size={14} /> Contact Support
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 blur-[1px] hidden lg:block"
      />
      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-[10%] w-16 h-16 rounded-full bg-primary-container/5 border border-primary-container/20 blur-[2px] hidden lg:block"
      />
    </div>
  );
}
