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

const getCoinbaseDataForCurrency = (currency) =>  axios.get(formQueryUrl(currency));

const extractDataFromCoinbaseResponse = (response) => response.data.data;

const formatRate = (rate) => {
  return rate
}

const filterAndFormatData = (currencyData, targetCurrencies) => {
  const {rates, currency: baseCurrency} = currencyData;
  const filteredRates = targetCurrencies.reduce((obj, targetCurrency) => {

    obj[targetCurrency] = formatRate(rates[targetCurrency]);
    return obj
  }, {});

  targetRates = {}
  targetRates[baseCurrency] = filteredRates
  return targetRates
}



app.get('/exchange-rates', async (req, res) => {
  try {
    const { base } = req.query;

    const baseCurrencies = baseCurrencyOptions[base]
    const targetCurrencies = base === "fiat" ? crypto : fiat;

    const rawCurrencyResponse =  await Promise.all(baseCurrencies.map((currency) => getCoinbaseDataForCurrency(currency)));
  
    const unfilteredData = rawCurrencyResponse.map((response) => extractDataFromCoinbaseResponse(response));
  
    const filteredData = unfilteredData.map((currencyData) => filterAndFormatData(currencyData, targetCurrencies))

    const flattenedData = Object.assign({}, ...filteredData);
  
    res.json(flattenedData);
  } catch (error) {
    res.status(500).json({error});
  }
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})