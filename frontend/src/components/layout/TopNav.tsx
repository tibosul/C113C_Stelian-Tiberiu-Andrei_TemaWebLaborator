import { Search, Bell, Settings, User, LayoutGrid, PieChart, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useState } from 'react';

export default function TopNav() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/asset/${searchValue.trim().toUpperCase()}`);
      setSearchValue('');
    }
  };

  return (
    <header className="h-20 glass-panel border-b border-outline-variant/10 flex items-center justify-between px-8 z-50">
      {/* Left: Branding & Search */}
      <div className="flex items-center gap-12">
        <Link to="/dashboard" className="flex items-center gap-3 group cursor-pointer focus:outline-none">
          <img 
            src="/trading_logo.png" 
            alt="TradeFlow Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-2xl shadow-cyan-400/20 ring-1 ring-cyan-400/20 group-hover:scale-110 transition-transform duration-300" 
          />
          <span className="font-manrope font-black text-xl text-white tracking-tighter">TradeFlow</span>
        </Link>

        <div className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant/10 rounded-2xl px-4 py-2 w-80 group focus-within:border-primary-container/50 transition-all">
          <Search size={18} className="text-on-surface-variant group-focus-within:text-primary-container transition-colors" />
          <input 
            type="text" 
            placeholder="Type symbol (e.g. AAPL) and Enter..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none text-sm text-white focus:outline-none ml-3 w-full placeholder-on-surface-variant/50"
          />
        </div>
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden xl:flex items-center gap-2">
        <NavLink to="/dashboard" icon={<LayoutGrid size={18} />} label="Dashboard" active={location.pathname === '/dashboard'} />
        <NavLink to="/portfolio" icon={<PieChart size={18} />} label="Portfolio" active={location.pathname === '/portfolio'} />
        <NavLink 
          to="/history" 
          icon={<Briefcase size={18} />} 
          label="History" 
          active={location.pathname === '/history'}
        />
        {user?.is_admin && (
          <NavLink to="/admin" icon={<Settings size={18} />} label="Admin" active={location.pathname === '/admin'} />
        )}
      </nav>

      {/* Right: User Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
           <button className="p-2.5 rounded-xl hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-all relative">
             <Bell size={20} />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-container rounded-full border-2 border-surface-dim" />
           </button>
           <Link to="/profile" className="p-2.5 rounded-xl hover:bg-surface-container-high text-on-surface-variant hover:text-white transition-all">
             <Settings size={20} />
           </Link>
        </div>

        <div className="h-8 w-px bg-outline-variant/20 mx-2" />

        <Link to="/profile" className="flex items-center gap-3 pl-2 cursor-pointer group focus:outline-none">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white group-hover:text-primary-container transition-colors">{user?.username}</div>
            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">{user?.email.split('@')[0]}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center text-primary-container overflow-hidden group-hover:border-primary-container/50 transition-all">
             <User size={20} />
          </div>
        </Link>
      </div>
    </header>
  );
}

function NavLink({ to, icon, label, active = false, state }: { to: string, icon: React.ReactNode, label: string, active?: boolean, state?: any }) {
  return (
    <Link to={to} state={state} className={clsx(
      "flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-bold tracking-tight transition-all relative",
      active 
        ? "bg-primary-container/10 text-primary-container shadow-[inset_0_0_12px_rgba(0,229,255,0.05)]" 
        : "text-on-surface-variant hover:text-white"
    )}>
      {icon}
      {label}
    </Link>
  );
}

