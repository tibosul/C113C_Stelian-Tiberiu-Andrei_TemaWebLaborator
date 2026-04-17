import Alpaca from "@alpacahq/alpaca-trade-api";
import dotenv from "dotenv";
dotenv.config();


const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true, // Use paper trading environment
  usePolygon: false, // Set to true if you want to use Polygon data
});

export default alpaca;
