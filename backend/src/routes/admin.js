import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import finnhub from "../config/finnhub.js";

const router = express.Router();

// All routes in this file require authentication and admin privileges
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * USERS MANAGEMENT
 */

// Get all users
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      `select id, email, username, first_name, last_name, tier, is_active, is_admin, created_at, last_login_at
       from Users order by created_at desc`
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error("Admin fetch users error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Toggle user active status
router.put("/users/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const result = await pool.query(
      "update Users set is_active = $1 where id = $2 returning id, username, is_active",
      [is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: `User status updated successfully`, data: result.rows[0] });
  } catch (err) {
    console.error("Admin update user status error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * ASSETS MANAGEMENT
 */

// Get all assets (including inactive)
router.get("/assets", async (req, res) => {
  try {
    const result = await pool.query(
      "select * from Assets order by symbol"
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error("Admin fetch assets error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new asset
router.post("/assets", async (req, res) => {
  try {
    const { 
      symbol, name, asset_type, exchange, country_code, 
      currency_code, sector, industry, is_fractionable, 
      min_order_size, finnhub_symbol, logo_url 
    } = req.body;

    const result = await pool.query(
      `insert into Assets (
        symbol, name, asset_type, exchange, country_code, 
        currency_code, sector, industry, is_fractionable, 
        min_order_size, finnhub_symbol, logo_url, is_active
      ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
      returning *`,
      [
        symbol.toUpperCase(), name, asset_type, exchange, country_code,
        currency_code, sector, industry, is_fractionable,
        min_order_size, finnhub_symbol, logo_url
      ]
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (err) {
    console.error("Admin create asset error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update asset
router.put("/assets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Build update query dynamically
    const columns = Object.keys(updates);
    const values = Object.values(updates);
    
    if (columns.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(", ");
    const query = `update Assets set ${setClause} where id = $${columns.length + 1} returning *`;
    
    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error("Admin update asset error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sync asset metadata (logo) from Finnhub
router.post("/assets/:id/sync", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get current asset info
    const assetResult = await pool.query("select symbol, finnhub_symbol from Assets where id = $1", [id]);
    if (assetResult.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }

    const asset = assetResult.rows[0];
    const lookupSymbol = asset.finnhub_symbol || asset.symbol;

    // 2. Fetch profile from Finnhub
    const { data } = await finnhub.get("/stock/profile2", {
      params: { symbol: lookupSymbol.toUpperCase() }
    });

    if (!data || !data.logo) {
      return res.status(404).json({ error: `Finnhub did not return a logo for ${lookupSymbol}` });
    }

    // 3. Update DB
    const updateResult = await pool.query(
      "update Assets set logo_url = $1, name = coalesce($2, name) where id = $3 returning *",
      [data.logo, data.name, id]
    );

    res.json({ message: "Sync successful", data: updateResult.rows[0] });
  } catch (err) {
    console.error("Admin sync asset error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
