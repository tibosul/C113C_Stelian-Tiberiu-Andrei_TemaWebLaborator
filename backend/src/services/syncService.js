import pool from "../config/db.js";
import alpaca from "../config/alpaca.js";
import finnhub from "../config/finnhub.js";

async function syncAlpacaAssets() {
  console.log("Starting Alpaca assets sync...");
  try {
    const assets = await alpaca.getAssets({
      status: "active",
      asset_class: "us_equity",
    });
    let updated = 0;

    for (const asset of assets) {
      if (!asset.tradable) continue;
      await pool.query(
        `update Assets set
        alpaca_aseset_id = $1,
        is_tradable = $2,
        is_fractionable = $3,
        updated_at = now()
        where symbol = $4`,
        [asset.id, asset.tradable, asset.fractionable, asset.symbol],
      );
      updated++;
    }

    console.log(`Alpaca assets sync completed. Updated ${updated} assets.`);
  } catch (err) {
    console.error("Error syncing Alpaca assets:", err);
  }
}

async function syncQuotes(limit = 50) {
  console.log("Starting quotes sync...");
  try {
    const assets = await pool.query(
      `select symbol, id, asset_type, finnhub_symbol
        from Assets where is_active = true and is_tradable = true
        order by symbol limit $1`,
      [limit],
    );

    for (const asset of assets.rows) {
      try {
        if (asset.asset_type === "crypto") {
          const res = await finnhub.get("/quote", {
            params: { symbol: asset.finnhub_symbol || asset.symbol },
          });
          const data = res.data;
          if (!data.c) continue;

          await pool.query(
            `insert into Asset_Quotes (asset_id, last_price, prev_close, change_pct, source, updated_at)
             values ($1, $2, $3, $4, 'finnhub', now())
             on conflict (asset_id) do update set
               last_price = excluded.last_price,
               prev_close = excluded.prev_close,
               change_pct = excluded.change_pct,
               source     = excluded.source,
               updated_at = now()`,
            [asset.id, data.c, data.pc, data.dp],
          );
        } else {
          const trade = await alpaca.getLatestTrade(asset.symbol);
          if (!trade?.Price) continue;

          await pool.query(
            `insert into Asset_Quotes (asset_id, last_price, source, updated_at)
             values ($1, $2, 'alpaca', now())
             on conflict (asset_id) do update set
               last_price = excluded.last_price,
               source     = excluded.source,
               updated_at = now()`,
            [asset.id, trade.Price],
          );
        }
      } catch (innerErr) {
        console.warn(`Error syncing quote for ${asset.symbol}:`, innerErr.message);
      }
    }

    console.log("Quotes sync completed.");
  } catch (err) {
    console.error("Error syncing quotes:", err);
  }
}

async function syncHistoricalPrices(symbol, interval = '1day', limit = 100) {
  console.log(`Fetching historical prices for ${symbol} (${interval})...`);
  try {
    const assetResult = await pool.query(
      `select id, asset_type, symbol from Assets where symbol = $1`,
      [symbol.toUpperCase()]
    );

    if (assetResult.rows.length === 0) {
       console.error(`Asset ${symbol} not found in database.`);
       return;
    }

    const asset = assetResult.rows[0];
    let bars = [];

    // Map internal interval to Alpaca/Finnhub resolutions
    const resolutionMap = {
      '1min': { alpaca: '1Min', finnhub: '1', days: 1 },
      '5min': { alpaca: '5Min', finnhub: '5', days: 7 },
      '15min': { alpaca: '15Min', finnhub: '15', days: 14 },
      '30min': { alpaca: '30Min', finnhub: '30', days: 30 },
      '1hour': { alpaca: '1Hour', finnhub: '60', days: 30 },
      '1day': { alpaca: '1Day', finnhub: 'D', days: 365 },
      '1week': { alpaca: '1Week', finnhub: 'W', days: 730 },
      '1month': { alpaca: '1Month', finnhub: 'M', days: 1825 },
    };

    const config = resolutionMap[interval] || resolutionMap['1day'];
    const daysToFetch = config.days;

    if (asset.asset_type === 'crypto') {
      const resolution = config.finnhub;
      const to = Math.floor(Date.now() / 1000);
      const from = to - (60 * 60 * 24 * daysToFetch);

      const res = await finnhub.get('/stock/candle', {
        params: {
          symbol: symbol.toUpperCase(),
          resolution: resolution,
          from: from,
          to: to
        }
      });
      
      const data = res.data;
      if (data.s === 'ok') {
        bars = data.t.map((timestamp, index) => ({
          time: new Date(timestamp * 1000),
          open: data.o[index],
          high: data.h[index],
          low: data.l[index],
          close: data.c[index],
          volume: data.v[index]
        }));
      }
    } else {
      // Alpaca for stocks
      const barsResponse = alpaca.getBarsV2(
        symbol.toUpperCase(),
        {
          start: new Date(Date.now() - daysToFetch * 24 * 60 * 60 * 1000).toISOString(),
          timeframe: config.alpaca,
        }
      );

      for await (const bar of barsResponse) {
        bars.push({
          time: new Date(bar.Timestamp),
          open: bar.OpenPrice,
          high: bar.HighPrice,
          low: bar.LowPrice,
          close: bar.ClosePrice,
          volume: bar.Volume
        });
      }
    }

    if (bars.length === 0) {
      console.log(`No historical data found for ${symbol} with interval ${interval}`);
      return;
    }

    // Insert into DB
    for (const bar of bars) {
      await pool.query(
        `insert into Asset_Prices (asset_id, interval, open, high, low, close, volume, source, price_time)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         on conflict (asset_id, interval, price_time) do update set
           open = excluded.open,
           high = excluded.high,
           low = excluded.low,
           close = excluded.close,
           volume = excluded.volume,
           source = excluded.source`,
        [
          asset.id, 
          interval, 
          bar.open, 
          bar.high, 
          bar.low, 
          bar.close, 
          bar.volume, 
          asset.asset_type === 'crypto' ? 'finnhub' : 'alpaca',
          bar.time
        ]
      );
    }

    console.log(`Synced ${bars.length} historical bars for ${symbol} (${interval}).`);
    return bars.length;
  } catch (err) {
    console.error(`Error syncing historical prices for ${symbol}:`, err.message);
  }
}

export {
  syncAlpacaAssets,
  syncQuotes,
  syncHistoricalPrices
};
