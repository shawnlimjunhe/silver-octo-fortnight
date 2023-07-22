import express from 'express';

import { getCoinbaseDataForCurrency, filterAndFormatData, extractDataFromCoinbaseResponse } from './utils.js'

const app = express();
const port = 8000;

const crypto = ['BTC', 'DOGE', 'ETH'];
const fiat = ['USD', 'SGD', 'EUR'];
const baseCurrencyOptions = {
  crypto, 
  fiat
}



app.get('/exchange-rates', async (req, res) => {
  try {
    const { base } = req.query;

    const baseCurrencies = baseCurrencyOptions[base]
    const targetCurrencies = base === "fiat" ? crypto : fiat;

    const rawCurrencyResponse =  await Promise.all(baseCurrencies.map((currency) => getCoinbaseDataForCurrency(currency)));
    const filteredData = rawCurrencyResponse.map((response) => extractDataFromCoinbaseResponse(response))
                            .map((unfilteredCurrencyData) => filterAndFormatData(unfilteredCurrencyData, targetCurrencies))
    
    const flattenedData = Object.assign({}, ...filteredData);

    res.json(flattenedData);
  } catch (error) {
    res.status(500).json({error});
  }
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})