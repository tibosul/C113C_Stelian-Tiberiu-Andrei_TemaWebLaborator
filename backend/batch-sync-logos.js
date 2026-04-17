import finnhub from './src/config/finnhub.js';
import pool from './src/config/db.js';

async function batchSync() {
  try {
    const result = await pool.query("select id, symbol, finnhub_symbol from Assets where logo_url is null or logo_url = ''");
    const assets = result.rows;
    console.log(`Found ${assets.length} assets to sync.`);

    for (const asset of assets) {
      const lookupSymbol = asset.finnhub_symbol || asset.symbol;
      console.log(`Syncing ${lookupSymbol}...`);
      
      try {
        const { data } = await finnhub.get('/stock/profile2', {
          params: { symbol: lookupSymbol.toUpperCase() }
        });

        if (data && data.logo) {
          await pool.query("update Assets set logo_url = $1, name = coalesce($2, name) where id = $3", [data.logo, data.name, asset.id]);
          console.log(`✅ ${lookupSymbol}: Updated logo and name.`);
        } else {
          console.log(`⚠️ ${lookupSymbol}: No logo found.`);
        }
      } catch (err) {
        console.error(`❌ ${lookupSymbol}: Profile fetch failed - ${err.message}`);
      }

      // Respect Finnhub rate limits (60 requests per minute)
      await new Promise(resolve => setTimeout(resolve, 1100));
    }

    console.log('Batch sync complete.');
  } catch (err) {
    console.error('Batch sync error:', err.message);
  } finally {
    process.exit();
  }
}

batchSync();
