import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all assets endpoint
router.get("/", async (req, res) => {
  try {
    const { type, sector, exchange, search, page = 1, limit = 50 } = req.query;

    const conditions = ["a.is_active = true"];
    const params = [];
    let paramIndex = 1;

    if (type) {
      conditions.push(`a.asset_type = $${paramIndex++}`);
      params.push(type);
    }

    if (sector) {
      conditions.push(`a.sector = $${paramIndex++}`);
      params.push(sector);
    }
    if (exchange) {
      conditions.push(`a.exchange = $${paramIndex++}`);
      params.push(exchange);
    }
    if (search) {
      conditions.push(
        `(a.symbol ilike $${paramIndex} or a.name ilike $${paramIndex})`,
      );
      params.push(`%${search}%`);
      paramIndex++;
    }

    const offset = (Number.parseInt(page, 10) - 1) * Number.parseInt(limit, 10);
    const whereClause =
      conditions.length > 0 ? "where " + conditions.join(" and ") : "";

    const dataParams = [...params, Number.parseInt(limit, 10), offset];
    const result = await pool.query(
      `select a.id, a.symbol, a.name, a.asset_type, a.exchange, a.country_code,
      a.currency_code, a.sector, a.industry, a.is_fractionable, a.min_order_size, a.finnhub_symbol,
      q.last_price, q.change_pct, q.bid, q.ask, q.volume_today, q.updated_at as quote_updated_at
      from Assets a
      left join Asset_Quotes q on a.id = q.asset_id
      ${whereClause}
      order by a.symbol
      limit $${paramIndex++} offset $${paramIndex++}`,
      dataParams,
    );

    const countResult = await pool.query(
      `select count(*) from Assets a ${whereClause}`,
      params,
    );

    res.json({
      data: result.rows,
      pagination: {
        page: Number.parseInt(page, 10),
        limit: Number.parseInt(limit, 10),
        total: Number.parseInt(countResult.rows[0].count, 10),
        pages: Math.ceil(
          countResult.rows[0].count / Number.parseInt(limit, 10),
        ),
      },
    });
  } catch (err) {
    console.error("Error fetching assets:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/assets/:symbol endpoint
router.get("/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    const result = await pool.query(
      `select a.*, q.last_price, q.prev_close, q.change_pct, q.bid, q.ask,
      q.volume_today, q.market_cap, q.pe_ratio, q.week_52_high, q.week_52_low, q.updated_at as quote_updated_at
      from Assets a
      left join Asset_Quotes q on a.id = q.asset_id
      where a.symbol = $1`,
      [symbol.toUpperCase()],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error("Error fetching asset:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get /api/assets/:symbol/prices endpoint
router.get("/:symbol/prices", async (req, res) => {
  try {
    const { symbol } = req.params;
    const { interval = "1d", from, to, limit = 100 } = req.query;

    const asset = await pool.query(`select id from Assets where symbol = $1`, [
      symbol.toUpperCase(),
    ]);

    if (asset.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    const conditions = ["asset_id = $1", "interval = $2"];
    const params = [asset.rows[0].id, interval];
    let paramIndex = 3;

    if (from) {
      conditions.push(`price_time >= to_timestamp($${paramIndex++})`);
      params.push(from);
    }

    if (to) {
      conditions.push(`price_time <= to_timestamp($${paramIndex++})`);
      params.push(to);
    }

    params.push(Number.parseInt(limit, 10));

    const result = await pool.query(
      `select open, high, low, close, volume, vwap, trade_count, price_time, source
      from Asset_Prices
      where ${conditions.join(" and ")}
      order by price_time desc
      limit $${paramIndex}`,
      params,
    );

    res.json({ data: result.rows.reverse() });
  } catch (err) {
    console.error("Error fetching asset prices:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
