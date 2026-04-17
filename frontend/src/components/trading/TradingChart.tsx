import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import type { IChartApi, ISeriesApi, Time } from 'lightweight-charts';
import { api } from '../../utils/api';
import clsx from 'clsx';
import { ChevronDown, Share2, Maximize2 } from 'lucide-react';

interface TradingChartProps {
  symbol: string;
}

export default function TradingChart({ symbol }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assetInfo, setAssetInfo] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('1D');

  const timeframes = ['1D', '1W', '1M', '1Y', 'ALL'];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        textColor: '#849396', // outline
        background: { type: ColorType.Solid, color: 'transparent' },
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { color: 'rgba(59, 73, 76, 0.1)' }, // outline-variant opacity
        horzLines: { color: 'rgba(59, 73, 76, 0.1)' },
      },
      crosshair: {
        mode: 0,
        vertLine: { color: 'var(--color-primary-container)', width: 1 as any, style: 2 as any },
        horzLine: { color: 'var(--color-primary-container)', width: 1 as any, style: 2 as any },
      },
      rightPriceScale: {
        borderColor: 'rgba(59, 73, 76, 0.2)',
        visible: true,
      },
      timeScale: {
        borderColor: 'rgba(59, 73, 76, 0.2)',
        timeVisible: true,
        secondsVisible: false,
      },
      autoSize: true,
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#45dfa4', // secondary
      downColor: '#ffb4ab', // error
      borderVisible: false,
      wickUpColor: '#45dfa4',
      wickDownColor: '#ffb4ab',
    });
    seriesRef.current = candlestickSeries;

    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!symbol || !seriesRef.current) return;
  
      setLoading(true);
      setError(null);
  
      try {
        // Fetch asset info for the header
        const infoRes = await api.get(`/assets/${symbol}`);
        setAssetInfo(infoRes.data.data);
  
        // Map UI timeframe to backend interval
        const timeframeMap: Record<string, string> = {
          '1D': '15min',
          '1W': '1hour',
          '1M': '1day',
          '1Y': '1day',
          'ALL': '1day'
        };
  
        const interval = timeframeMap[timeframe] || '1day';
  
        // Fetch price data using the mapped interval
        const response = await api.get(`/assets/${symbol}/prices?interval=${interval}&limit=1000`);
        const data = response.data.data;
  
        if (!data || data.length === 0) {
          setError(`No ${timeframe} data available for this asset.`);
          return;
        }
  
        const formattedData = data.map((d: any) => ({
          time: (new Date(d.price_time).getTime() / 1000) as Time,
          open: Number(d.open),
          high: Number(d.high),
          low: Number(d.low),
          close: Number(d.close),
        })).sort((a: any, b: any) => a.time - b.time);
  
        // Remove duplicate timestamps if any
        const uniqueData = formattedData.filter((val: any, index: number, self: any[]) =>
          index === self.findIndex((t: any) => t.time === val.time)
        );
  
        if (seriesRef.current) {
          seriesRef.current.setData(uniqueData);

          // Adjust visible range based on timeframe
          if (timeframe === '1D') {
             // Show only last 24h if possible, or everything if less than 24h
             chartRef.current?.timeScale().fitContent();
          } else {
             chartRef.current?.timeScale().fitContent();
          }
        }
      } catch (err: any) {
        console.error("Chart loading error:", err);
        setError(err.response?.data?.error || "Connection error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [symbol, timeframe]);

  return (
    <div className="relative w-full h-full flex flex-col bg-surface-container-low/20 rounded-3xl overflow-hidden border border-outline-variant/5">
      {/* Chart Header */}
      <div className="p-6 flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-manrope font-bold text-white tracking-tight">{symbol}</h2>
            <div className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
              NASDAQ <ChevronDown size={10} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-manrope font-bold text-white">
               ${Number(assetInfo?.last_price || 0).toFixed(2)}
            </span>
            <span className={clsx(
              "text-sm font-bold",
              Number(assetInfo?.change_pct || 0) >= 0 ? "text-secondary" : "text-error"
            )}>
              {Number(assetInfo?.change_pct) >= 0 ? "+" : ""}{Number(assetInfo?.change_pct || 0).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timeframe Selectors */}
          <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/10">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={clsx(
                  "px-3 py-1.5 text-[10px] font-bold rounded-lg tonal-transition",
                  timeframe === tf ? "bg-primary-container text-on-primary-container shadow-lg" : "text-on-surface-variant hover:text-white"
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-white transition-colors">
              <Share2 size={16} />
            </button>
            <button className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Performance Message / Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-dim/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
             <div className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin" />
             <span className="text-sm font-medium text-primary-container">Analyzing markets...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-dim/40 backdrop-blur-sm">
          <div className="text-error font-medium p-4 bg-error/10 rounded-2xl border border-error/20">
            {error}
          </div>
        </div>
      )}

      {/* Chart Container */}
      <div ref={chartContainerRef} className="flex-1 w-full mx-2 mb-2" />
    </div>
  );
}
