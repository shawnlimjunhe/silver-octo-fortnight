import express from 'express';
import mongoose from 'mongoose';

import { getCoinbaseDataForCurrency, filterAndFormatData, extractDataFromCoinbaseResponse } from './utils.js'
import { savePriceAtTime } from './database/priceConversionAtTime/create.js'
import { isCollectionEmpty, getMostRecentBatch } from './database/priceConversionAtTime/read.js';

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
  return filteredData
}

await connectToDatabase();

setInterval(() => fetchCurrencyData(allCurrencies), 100000);  // 100000 ms = 100 s

app.get('/exchange-rates', async (req, res) => {
  try {
    const collectionIsEmpty = await isCollectionEmpty();
    if (collectionIsEmpty) {
      await fetchCurrencyData(allCurrencies);
    }

    const currencyData = await getMostRecentBatch();
    const { base } = req.query;
    const baseCurrencies = baseCurrencyOptions[base]
    const targetCurrencies = base === "fiat" ? crypto : fiat;

    const baseCurrencyData = currencyData.filter((data) => baseCurrencies.includes(data.baseCurrency))
      .map((data) => {
        const { baseCurrency, targetCurrencies: targetPrice } = data;
        const filteredTargetPrices = targetPrice.filter((targetData) => targetCurrencies.includes(targetData.currencyName))
          .map((targetData) => {
            const {currencyName, currencyPrice} = targetData;
            return {
              [currencyName]: currencyPrice
            }
          });
        const flattenTargetPrices = Object.assign({}, ...filteredTargetPrices);
        return {
          [baseCurrency]: flattenTargetPrices
        }
      })
    
    const flattenedBaseCurrencyData = Object.assign({}, ...baseCurrencyData)
    res.json(flattenedBaseCurrencyData);
  } catch (error) {
    res.status(500).json({error});
  }
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})