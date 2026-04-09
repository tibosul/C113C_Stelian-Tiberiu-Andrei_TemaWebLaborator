require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const Alpaca = require('@alpacahq/alpaca-trade-api');

const app = express();
app.use(cors());
app.use(express.json());

// Postgres Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test DB connection
pool.on('connect', () => console.log('Conexiune DB stabilită'));
pool.on('error', (err) => console.error('Eroare DB:', err));

// Alpaca Init
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true,
});

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'Online' }));

app.get('/api/db/status', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ connected: true, status: 'Conectat' });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

app.get('/api/alpaca/status', async (req, res) => {
  try {
    const account = await alpaca.getAccount();
    res.json({
      connected: true,
      accountStatus: account.account_blocked,
      buyingPower: account.buying_power,
      cash: account.cash
    });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend pe portul ${PORT}`));

module.exports = app;