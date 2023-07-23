import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase, loadCurrencies } from './setup.js';
import { formatExchangeRateData, formatHistorialData } from './utils.js'
import { isCollectionEmpty, getMostRecentBatch, getCurrencyBetweenDates } from './database/priceConversionAtTime/read.js';
import { fetchAndPersistCurrencyData } from './coinBaseClient.js';
import { validateExchangeRateQuery, validateHistoricalRateQuery } from './middleware.js';

const app = express();
dotenv.config();

const port = process.env.SERVER_PORT;
const uri = process.env.MONGO_URI;

// setup functions
await connectToDatabase(uri);
const { crypto, fiat, allCurrencies } = await loadCurrencies();

const currencyMapping = {
  fiat: {
    baseCurrencies: fiat,
    targetCurrencies: crypto
  },
  crypto: {
      baseCurrencies: crypto,
      targetCurrencies: fiat
  }
};

setInterval(() => fetchAndPersistCurrencyData(allCurrencies), 100000);  // 100000 ms = 100 s

app.get('/exchange-rates', validateExchangeRateQuery, async (req, res) => {
  const { base } = req.query;

  try {
    const collectionIsEmpty = await isCollectionEmpty();
    if (collectionIsEmpty) {
      await fetchAndPersistCurrencyData(allCurrencies);
    }

    const currencyData = await getMostRecentBatch();
    const { baseCurrencies, targetCurrencies } = currencyMapping[base];
    const formattedData = formatExchangeRateData(currencyData, baseCurrencies, targetCurrencies);

   res.json(formattedData);
  } catch (error) {
    res.status(500).json({error});
  }
})

app.get('/historical-rates', validateHistoricalRateQuery, async (req, res) => {
  const { 
    base_currency: baseCurrency,
    target_currency: targetCurrency,
    start: startTimestamp,
  } = req.query;

  const endTimeStamp = req.query.end ? req.query.end : new Date();

  const documents = await getCurrencyBetweenDates(startTimestamp, endTimeStamp, baseCurrency);
  if (documents.length === 0) {
    return res.json({
      results: [],
    })
  }

  const results = documents.map((priceConversionAtTime) => formatHistorialData(priceConversionAtTime, targetCurrency))

  return res.json({results: results});
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})