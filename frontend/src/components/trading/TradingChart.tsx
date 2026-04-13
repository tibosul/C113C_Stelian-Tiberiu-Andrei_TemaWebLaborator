import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import type { IChartApi, ISeriesApi, Time } from 'lightweight-charts';
import { api } from '../../utils/api';

interface TradingChartProps {
  symbol: string;
}

export default function TradingChart({ symbol }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize Chart
    const chartOptions = {
      layout: {
        textColor: '#cbd5e1', // slate-300
        background: { type: ColorType.Solid, color: 'transparent' },
      },
      grid: {
        vertLines: { color: '#334155' }, // slate-700
        horzLines: { color: '#334155' },
      },
      crosshair: {
        mode: 0, // Normal mode
      },
      rightPriceScale: {
        borderColor: '#334155',
      },
      timeScale: {
        borderColor: '#334155',
        timeVisible: true,
      },
      autoSize: true, // will hook to ResizeObserver natively
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    // @ts-ignore
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981', // emerald-500
      downColor: '#ef4444', // red-500
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });
    seriesRef.current = candlestickSeries;

    const handleResize = () => {
        if(chartContainerRef.current) {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
        }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!symbol || !seriesRef.current) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get(`/assets/${symbol}/prices?interval=1day&limit=300`);
        const data = response.data.data;
        
        // Structure map for lightweight-charts
        const formattedData = data.map((d: any) => ({
          time: (new Date(d.price_time).getTime() / 1000) as Time,
          open: Number(d.open),
          high: Number(d.high),
          low: Number(d.low),
          close: Number(d.close),
        })).sort((a: any, b: any) => a.time - b.time); // ensure chronologic order
        
        seriesRef.current.setData(formattedData);
        chartRef.current?.timeScale().fitContent();
      } catch (err: any) {
        setError(err.response?.data?.error || "Eroare la preluarea prețurilor.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [symbol]);

  return (
    <div className="relative w-full h-full flex flex-col">
       <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-white">{symbol}</h2>
        {loading && <span className="text-sm text-emerald-500 animate-pulse">Loading data...</span>}
        {error && <span className="text-sm text-red-500">{error}</span>}
       </div>
       
       {/* Full size container for the chart */}
       <div ref={chartContainerRef} className="flex-1 w-full" />
    </div>
  );
}
