const pool = require("../config/db").default;
const alpaca = require("../config/alpaca").default;
const finnhub = require("../config/finnhub");

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
          const data = await finnhub.get("/quote", {
            params: { symbol: asset.finnhub_symbol },
          });
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
        console.warn(`Error syncing quote for ${asset.symbol}:`, innerErr);
      }
    }

    console.log("Quotes sync completed.");
  } catch (err) {
    console.error("Error syncing quotes:", err);
  }
}

module.exports = {
  syncAlpacaAssets,
  syncQuotes,
};
