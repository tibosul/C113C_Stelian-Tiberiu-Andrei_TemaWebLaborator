import finnhub from './src/config/finnhub.js';
import pool from './src/config/db.js';

async function testSync() {
  try {
    const symbol = 'AAPL';
    console.log(`Syncing ${symbol}...`);
    const { data } = await finnhub.get('/stock/profile2', {
      params: { symbol: symbol }
    });
    console.log('Finnhub response:', data);
    
    if (data && data.logo) {
      await pool.query("update Assets set logo_url = $1 where symbol = $2", [data.logo, symbol]);
      console.log('Updated DB with logo:', data.logo);
    } else {
      console.log('No logo found for', symbol);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit();
  }
}

testSync();
