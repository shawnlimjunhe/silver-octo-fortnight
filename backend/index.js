const express = require('express');
const axios = require('axios');


const app = express();
const port = 8000;
const targetUrl = "https://api.coinbase.com/v2/exchange-rates";

const crypto = ['BTC', 'DOGE', 'ETH'];
const fiat = ['USD', 'SGD', 'EUR'];
const baseCurrencyOptions = {
  crypto, 
  fiat
}

const formQueryUrl = (currency) => `${targetUrl}?currency=${currency}`;

app.get('/exchange-rates', async (req, res) => {
  const { base } = req.query;

  const baseCurrencies = baseCurrencyOptions[base]

  const rawCurrencyResponse =  await Promise.all(baseCurrencies.map((currency) => axios.get(formQueryUrl(currency))));

  console.log(rawCurrencyResponse);

  res.json({'queryParam': base});
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})