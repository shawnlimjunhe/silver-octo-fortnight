import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase, loadCurrencies } from './setup.js';
import { formatExchangeRateData } from './utils.js'
import { isCollectionEmpty, getMostRecentBatch } from './database/priceConversionAtTime/read.js';
import { fetchAndPersistCurrencyData } from './coinBaseClient.js';
import { validateBaseParam } from './middleware.js';

const app = express();
dotenv.config();

const port = process.env.SERVER_PORT;
const uri = process.env.MONGO_URI;
const currency_path = process.env.CURRENCY_FILEPATH;

// setup functions
await connectToDatabase(uri);
const { crypto, fiat, allCurrencies } = await loadCurrencies(currency_path);

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

app.get('/exchange-rates', validateBaseParam, async (req, res) => {
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

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})