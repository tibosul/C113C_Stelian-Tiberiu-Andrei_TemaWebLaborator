import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Asset {
  id: string;
  symbol: string;
  name: string;
  asset_type: string;
  last_price: string;
  change_pct: string;
}

interface AssetListProps {
  onSelect: (symbol: string) => void;
  selectedSymbol: string | null;
}

export default function AssetList({ onSelect, selectedSymbol }: AssetListProps) {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await api.get('/assets', { params: { limit: 100 } });
        setAssets(res.data.data);
        
        // Auto-select first asset if none is selected
        if (res.data.data.length > 0 && !selectedSymbol) {
            onSelect(res.data.data[0].symbol);
        }
      } catch (err) {
        console.error('Failed to fetch assets', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssets();
  }, [onSelect, selectedSymbol]);

  const filteredAssets = assets.filter(a => 
    a.symbol.toLowerCase().includes(search.toLowerCase()) || 
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Investments</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search instrument..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-sm text-white rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-sm text-slate-400 text-center animate-pulse">Loading markets...</div>
        ) : (
          <div className="flex flex-col">
            {filteredAssets.map((asset) => {
              const isPositive = Number(asset.change_pct) >= 0;
              const isSelected = selectedSymbol === asset.symbol;
              
              return (
                <button
                  key={asset.id}
                  onClick={() => {
                    onSelect(asset.symbol);
                    navigate(`/asset/${asset.symbol}`);
                  }}
                  className={clsx(
                    "flex items-center justify-between p-4 border-b border-slate-800/50 hover:bg-slate-800/80 transition-colors text-left w-full",
                    isSelected && "bg-slate-800 border-l-2 border-l-emerald-500"
                  )}
                >
                  <div>
                    <div className="font-semibold text-white">{asset.symbol}</div>
                    <div className="text-xs text-slate-400 truncate max-w-[120px]">{asset.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-white">${Number(asset.last_price || 0).toFixed(2)}</div>
                    <div className={clsx(
                      "text-xs font-medium",
                      isPositive ? "text-emerald-500" : "text-red-500"
                    )}>
                      {isPositive ? "+" : ""}{Number(asset.change_pct || 0).toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
            
            {filteredAssets.length === 0 && (
                <div className="p-6 text-center text-sm text-slate-500">Asset not found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
