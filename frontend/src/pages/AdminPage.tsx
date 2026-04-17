import { useState, useEffect } from 'react';
import TopNav from '../components/layout/TopNav';
import { Users, Package, ShieldCheck, UserMinus, UserCheck, Plus, Edit2, X, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { api } from '../utils/api';

interface AdminUser {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  tier: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  last_login_at: string | null;
}

interface AdminAsset {
  id: string;
  symbol: string;
  name: string;
  asset_type: string;
  exchange: string;
  country_code: string;
  currency_code: string;
  sector: string | null;
  industry: string | null;
  is_fractionable: boolean;
  min_order_size: string;
  finnhub_symbol: string;
  logo_url: string | null;
  is_active: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'assets'>('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [assets, setAssets] = useState<AdminAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Asset Form State
  const [isEditingAsset, setIsEditingAsset] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<Partial<AdminAsset> | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === 'users' ? '/admin/users' : '/admin/assets';
      const response = await api.get(endpoint);
      const result = response.data;
      
      if (activeTab === 'users') {
        setUsers(result.data);
      } else {
        setAssets(result.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await api.put(`/admin/users/${userId}/status`, { 
        is_active: !currentStatus 
      });
      
      if (response.status === 200) {
        setUsers(users.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u));
      }
    } catch (err) {
      console.error('Failed to update user status');
    }
  };

  const handleSaveAsset = async () => {
    if (!currentAsset) return;
    
    try {
      const isNew = !currentAsset.id;
      const url = isNew ? '/admin/assets' : `/admin/assets/${currentAsset.id}`;
      const method = isNew ? 'post' : 'put';
      
      const response = await (api as any)[method](url, currentAsset);
      
      if (response.status === 200 || response.status === 201) {
        setIsEditingAsset(false);
        fetchData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save asset');
    }
  };

  const handleSyncAsset = async () => {
    if (!currentAsset?.id) return;
    
    try {
      setLoading(true);
      const response = await api.post(`/admin/assets/${currentAsset.id}/sync`);
      if (response.status === 200) {
        setCurrentAsset(response.data.data);
        fetchData();
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to sync with Finnhub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="max-w-screen-2xl mx-auto p-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-4xl font-black font-headline tracking-tighter text-white">Central Command</h1>
            </div>
            <p className="text-on-surface-variant font-medium">Manage user access and global market availability.</p>
          </div>

          <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10">
            <button 
              onClick={() => setActiveTab('users')}
              className={clsx(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'users' ? "bg-primary-container text-on-primary-container shadow-lg" : "text-on-surface-variant hover:text-white"
              )}
            >
              <Users size={18} />
              Users
            </button>
            <button 
              onClick={() => setActiveTab('assets')}
              className={clsx(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === 'assets' ? "bg-primary-container text-on-primary-container shadow-lg" : "text-on-surface-variant hover:text-white"
              )}
            >
              <Package size={18} />
              Assets
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-error/10 border border-error/20 flex items-center gap-4 text-error font-bold">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="glass-panel border border-outline-variant/10 rounded-[32px] p-8 min-h-[600px] relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10 text-primary-container">
              <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-black uppercase tracking-widest text-xs">Syncing Database...</p>
            </div>
          ) : null}

          {activeTab === 'users' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    <th className="pb-4 pl-4">Identification</th>
                    <th className="pb-4">Clearance</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Last Sync</th>
                    <th className="pb-4 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="group">
                      <td className="py-4 pl-4 bg-surface-container-low/50 group-hover:bg-surface-container-high/50 rounded-l-2xl border-y border-l border-outline-variant/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface">
                            {u.username[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-black text-white">{u.username}</div>
                            <div className="text-[10px] text-on-surface-variant">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 bg-surface-container-low/50 group-hover:bg-surface-container-high/50 border-y border-outline-variant/5 transition-colors">
                        <span className={clsx(
                          "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
                          u.is_admin ? "bg-secondary/10 border-secondary/20 text-secondary" : "bg-primary-container/10 border-primary-container/20 text-primary-container"
                        )}>
                          {u.is_admin ? 'Admin' : u.tier}
                        </span>
                      </td>
                      <td className="py-4 bg-surface-container-low/50 group-hover:bg-surface-container-high/50 border-y border-outline-variant/5 transition-colors">
                        <div className="flex items-center gap-2">
                           <div className={clsx("w-2 h-2 rounded-full", u.is_active ? "bg-secondary animate-pulse" : "bg-error")} />
                           <span className="text-xs font-bold text-white">{u.is_active ? 'Active' : 'Blacklisted'}</span>
                        </div>
                      </td>
                      <td className="py-4 bg-surface-container-low/50 group-hover:bg-surface-container-high/50 border-y border-outline-variant/5 transition-colors">
                         <div className="text-xs text-on-surface-variant">{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : 'Never'}</div>
                      </td>
                      <td className="py-4 pr-4 bg-surface-container-low/50 group-hover:bg-surface-container-high/50 rounded-r-2xl border-y border-r border-outline-variant/5 transition-colors text-right">
                        <button 
                          disabled={u.is_admin} // Don't allow blocking admins (self-protection)
                          onClick={() => toggleUserStatus(u.id, u.is_active)}
                          className={clsx(
                            "p-2 rounded-lg transition-all",
                            u.is_active ? "text-error hover:bg-error/10" : "text-secondary hover:bg-secondary/10",
                            u.is_admin && "opacity-20 cursor-not-allowed"
                          )}
                          title={u.is_active ? "Block User" : "Unblock User"}
                        >
                          {u.is_active ? <UserMinus size={20} /> : <UserCheck size={20} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white">Global Asset Directory</h3>
                <button 
                  onClick={() => {
                    setCurrentAsset({
                      symbol: '', name: '', asset_type: 'stock', exchange: 'NASDAQ',
                      country_code: 'US', currency_code: 'USD', is_fractionable: true,
                      min_order_size: '0.0001', finnhub_symbol: ''
                    });
                    setIsEditingAsset(true);
                  }}
                  className="bg-primary-container text-on-primary-container px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
                >
                  <Plus size={16} /> Add New Listing
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assets.map(asset => (
                  <div key={asset.id} className="p-6 bg-surface-container-low/50 rounded-3xl border border-outline-variant/5 hover:border-primary-container/20 group transition-all">
                    <div className="flex justify-between items-start mb-4">
                      {asset.logo_url ? (
                        <div className="w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center overflow-hidden border border-outline-variant/10 shadow-lg group-hover:shadow-primary-container/10 transition-all">
                          <img 
                            src={asset.logo_url} 
                            alt={asset.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${asset.symbol}&background=00E5FF&color=000&bold=true`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-xl font-black text-primary-container">
                          {asset.symbol[0]}
                        </div>
                      )}
                      <button 
                        onClick={() => {
                          setCurrentAsset(asset);
                          setIsEditingAsset(true);
                        }}
                        className="p-2 opacity-0 group-hover:opacity-100 transition-all text-on-surface-variant hover:text-white"
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white leading-tight">{asset.symbol}</h4>
                      <p className="text-xs text-on-surface-variant font-bold mb-4">{asset.name}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black uppercase text-on-surface-variant">{asset.asset_type}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black uppercase text-on-surface-variant">{asset.exchange}</span>
                        <span className={clsx(
                          "px-2 py-0.5 rounded-md text-[10px] font-black uppercase",
                          asset.is_active ? "bg-secondary/10 text-secondary" : "bg-error/10 text-error"
                        )}>
                          {asset.is_active ? 'Active' : 'Suspended'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Asset Edit Modal */}
      {isEditingAsset && currentAsset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsEditingAsset(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-surface-dim border border-outline-variant/20 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container/50">
              <h2 className="text-2xl font-black text-white tracking-tighter">
                {currentAsset.id ? 'Modify Listing' : 'Protocol: New Listing'}
              </h2>
              <button 
                onClick={() => setIsEditingAsset(false)}
                className="p-2 rounded-xl text-on-surface-variant hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Symbol (Primary Key)</label>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={currentAsset.symbol} 
                    onChange={e => setCurrentAsset({...currentAsset, symbol: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Official Name</label>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={currentAsset.name} 
                    onChange={e => setCurrentAsset({...currentAsset, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Asset Category</label>
                  <select 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={currentAsset.asset_type} 
                    onChange={e => setCurrentAsset({...currentAsset, asset_type: e.target.value})}
                  >
                    <option value="stock">Stock / Equity</option>
                    <option value="crypto">Cryptocurrency</option>
                    <option value="etf">ETF</option>
                    <option value="forex">Forex</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Exchange</label>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={currentAsset.exchange} 
                    onChange={e => setCurrentAsset({...currentAsset, exchange: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={currentAsset.finnhub_symbol} 
                    onChange={e => setCurrentAsset({...currentAsset, finnhub_symbol: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between pl-1">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Logo URL</label>
                    {currentAsset.id && (
                      <button 
                        onClick={handleSyncAsset}
                        className="text-[10px] font-black text-secondary uppercase tracking-widest hover:underline flex items-center gap-1"
                      >
                         Sync Finnhub
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <input 
                      className="flex-1 bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                      value={currentAsset.logo_url || ''} 
                      onChange={e => setCurrentAsset({...currentAsset, logo_url: e.target.value})}
                      placeholder="https://..."
                    />
                    {currentAsset.logo_url && (
                      <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-outline-variant/20">
                         <img src={currentAsset.logo_url} className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Minimum Allocation</label>
                   <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={currentAsset.min_order_size} 
                    onChange={e => setCurrentAsset({...currentAsset, min_order_size: e.target.value})}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-8 py-4 px-2 bg-surface-container/30 rounded-2xl border border-outline-variant/10 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md border-outline-variant/20 bg-surface-container checked:bg-secondary transition-all"
                      checked={currentAsset.is_active} 
                      onChange={e => setCurrentAsset({...currentAsset, is_active: e.target.checked})}
                    />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Active for Trading</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md border-outline-variant/20 bg-surface-container checked:bg-secondary transition-all"
                      checked={currentAsset.is_fractionable} 
                      onChange={e => setCurrentAsset({...currentAsset, is_fractionable: e.target.checked})}
                    />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Fractional Enabled</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-surface-container/50 border-t border-outline-variant/10 flex justify-end gap-3">
               <button 
                onClick={() => setIsEditingAsset(false)}
                className="px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-all"
               >
                 Cancel
               </button>
               <button 
                onClick={handleSaveAsset}
                className="px-12 py-3 rounded-xl bg-primary-container text-on-primary-container font-black text-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
               >
                 Acknowledge & Save
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
