import express from 'express';
import mongoose from 'mongoose';

import { getCoinbaseDataForCurrency, filterAndFormatData, extractDataFromCoinbaseResponse } from './utils.js'
import { savePriceAtTime } from './database/insert.js'

const app = express();
const port = 8000;

const uri = 'mongodb://localhost:27017/currency_data';

const crypto = ['BTC', 'DOGE', 'ETH'];
const fiat = ['USD', 'SGD', 'EUR'];
const allCurrencies = ['BTC', 'DOGE', 'ETH', 'USD', 'SGD', 'EUR']
const baseCurrencyOptions = {
  crypto, 
  fiat
}

async function connectToDatabase() {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

const fetchCurrencyData = async (allCurrencies) => {
  const rawCurrencyResponse =  await Promise.all(allCurrencies.map((currency) => getCoinbaseDataForCurrency(currency)));
  const filteredData = rawCurrencyResponse.map((response) => extractDataFromCoinbaseResponse(response))
                          .map((unfilteredCurrencyData) => filterAndFormatData(unfilteredCurrencyData, allCurrencies))
  
  const queryDate = new Date();
  await Promise.all(filteredData.map((data) => savePriceAtTime(data, queryDate)));
  // const flattenedData = Object.assign({}, ...filteredData);
  return filteredData
}

await connectToDatabase();

setInterval(() => fetchCurrencyData(allCurrencies), 100000);  // 100000 ms = 100 s

app.get('/exchange-rates', async (req, res) => {
  try {
    const { base } = req.query;
    // const baseCurrencies = baseCurrencyOptions[base]
    // const targetCurrencies = base === "fiat" ? crypto : fiat;
    const currencyData = await fetchCurrencyData(allCurrencies);
    res.json(currencyData);
  } catch (error) {
    res.status(500).json({error});
  }
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})