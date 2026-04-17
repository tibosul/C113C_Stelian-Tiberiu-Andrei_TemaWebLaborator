import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


const finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: process.env.FINNHUB_API_KEY
  },
  timeout: 5000
});

export default finnhub;
