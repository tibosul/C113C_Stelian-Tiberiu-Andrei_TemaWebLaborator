import express from "express";
import pool from "../config/db.js";
import alpaca from "../config/alpaca.js";
import finnhub from "../config/finnhub.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get /api/market/quote/:symbol endpoint
router.get("/quote/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    const assetResult = await pool.query(
      `select id, asset_type, finnhub_symbol from Assets where symbol = $1`,
      [symbol.toUpperCase()],
    );

    if (assetResult.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    const asset = assetResult.rows[0];
    let quote = null;

    if (asset.asset_type === "crypto") {
      const data = await finnhub.get("/quote", {
        params: { symbol: asset.finnhub_symbol },
      });
      quote = {
        symbol,
        last_price: data.c,
        prev_close: data.pc,
        change: data.d,
        change_pct: data.dp,
        high: data.h,
        low: data.l,
        open: data.o,
        source: "finnhub",
        timestamp: new Date(data.t * 1000),
      };
    } else {
      const latestTrade = await alpaca.getLatestTrade(symbol.toUpperCase());
      const latestQuote = await alpaca.getLatestQuote(symbol.toUpperCase());

      quote = {
        symbol,
        last_price: latestTrade.Price,
        bid: latestQuote.BidPrice,
        ask: latestQuote.AskPrice,
        bid_size: latestQuote.BidSize,
        ask_size: latestQuote.AskSize,
        source: "alpaca",
        timestamp: latestQuote.Timestamp,
      };
    }

    await pool.query(
      `insert into Asset_Quotes (asset_id, last_price, bid, ask, change_pct, source, updated_at)
      values ($1, $2, $3, $4, $5, $6, now())
      on conflict (asset_id) do update set
      last_price = excluded.last_price,
      bid = excluded.bid,
      ask = excluded.ask,
      change_pct = excluded.change_pct,
      source = excluded.source,
      updated_at = now()`,
      [
        asset.id,
        quote.last_price,
        quote.bid || null,
        quote.ask || null,
        quote.change_pct || null,
        quote.source,
      ],
    );

    res.json({ data: quote });
  } catch (err) {
    console.error("Error fetching quote:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/market/bars/:symbol endpoint
router.get("/bars/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const { timeframe = "1Day", start, end, limit = 100 } = req.query;

    const bars = await alpaca.getBarsV2(symbol.toUpperCase(), {
      timeframe,
      start:
        start || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // default to last 7 days
      end: end || new Date().toISOString(),
      limit: Number.parseInt(limit, 10),
      adjusment: "raw",
    });

    const result = [];
    for await (let bar of bars) {
      result.push({
        open: bar.OpenPrice,
        high: bar.HighPrice,
        low: bar.LowPrice,
        close: bar.ClosePrice,
        volume: bar.Volume,
        vwap: bar.VWAP,
        trade_count: bar.TradeCount,
        time: bar.Timestamp,
      });
    }

    const assetResult = await pool.query(
      `select id from Assets where symbol = $1`,
      [symbol.toUpperCase()],
    );

    if (assetResult.rows.length > 0) {
      const assetId = assetResult.rows[0].id;
      const intervalMap = {
        "1Min": "1min",
        "5Min": "5min",
        "15Min": "15min",
        "30Min": "30min",
        "1Hour": "1hour",
        "1Day": "1day",
        "1Week": "1week",
        "1Month": "1month",
      };

      const dbInterval = intervalMap[timeframe] || "1day";

      for (const bar of result) {
        await pool.query(
          `insert into Asset_Prices
          (asset_id, interval, open, high, low, close, volume, vwap, trade_count, source, price_time)
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'alpaca', to_timestamp($10))
          on conflict (asset_id, interval, price_time) do nothing`,
          [
            assetId,
            dbInterval,
            bar.open,
            bar.high,
            bar.low,
            bar.close,
            bar.volume,
            bar.vwap,
            bar.trade_count,
            bar.time,
          ],
        );
      }
    }

    res.json({ data: result });
  } catch (err) {
    console.error("Error fetching bars:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/market/profile/:symbol endpoint
router.get("/profile/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const { data } = await finnhub.get("/stock/profile2", {
      params: { symbol: symbol.toUpperCase() },
    });

    if (!data?.name) {
      return res.status(404).json({ error: "Asset profile not found" });
    }

    res.json({ data });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/market/news/:symbol endpoint
router.get("/news/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const from =
      req.query.from ||
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]; // default to last 7 days
    const to = req.query.to || new Date().toISOString().split("T")[0];

    const { data } = await finnhub.get("/company-news", {
      params: { symbol: symbol.toUpperCase(), from, to },
    });

    res.json({ data: data.slice(0, 20) });
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/market/fx endpoint
router.get("/fx", async (req, res) => {
  try {
    const { base = "USD" } = req.query;
    const { data } = await finnhub.get("/forex/rates", { params: { base } });

    if (data?.quote) {
      for (const [quoteCurrency, rate] of Object.entries(data.quote)) {
        const exists = await pool.query(
          `select code from Currencies where code = $1`,
          [quoteCurrency],
        );

        if (exists.rows.length > 0) {
          await pool.query(
            `insert into FX_Rates (base_currency, quote_currency, rate, source, fetched_at)
             values ($1, $2, $3, 'finnhub', now())`,
            [base, quoteCurrency, rate],
          );
        }
      }
    }

    res.json({ data: data.quote, base, timestamp: new Date() });
  } catch (err) {
    console.error("Error fetching FX rates:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/market/alpaca/account endpoint (requires auth)
router.get("/alpaca/account", authMiddleware, async (req, res) => {
  try {
    const account = await alpaca.getAccount();

    res.json({
      status: account.status,
      buying_power: account.buying_power,
      cash: account.cash,
      equity: account.equity,
      portfolio_value: account.portfolio_value,
      day_trade_count: account.daytrade_count,
      account_blocked: account.account_blocked,
      trading_blocked: account.trading_blocked,
    });
  } catch (err) {
    console.error("Error fetching Alpaca account:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
