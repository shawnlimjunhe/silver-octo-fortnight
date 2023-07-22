import axios from 'axios';

const formQueryUrl = (currency) => `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`;

const getCoinbaseDataForCurrency = (currency) =>  axios.get(formQueryUrl(currency));

const extractDataFromCoinbaseResponse = (response) => response.data.data;

const formatRate = (rate) => {
  const numberValue = parseFloat(rate);
  if (numberValue < 1) {
    // numbers to be formatted to 2 most significant digits e.g. 0.0034
    return Number(numberValue.toPrecision(2)).toString();
  }
  // numbers to be rounded to 2 decimal places e.g. 1.23
  return numberValue.toFixed(2).toString();
}

const filterAndFormatData = (currencyData, targetCurrencies) => {
  const {rates, currency: baseCurrency} = currencyData;
  const filteredRates = targetCurrencies.reduce((obj, targetCurrency) => {

    obj[targetCurrency] = formatRate(rates[targetCurrency]);
    return obj;
  }, {});
  
  return {
    baseCurrency,
    rates: filteredRates
  }
  // const targetRates = {};
  // targetRates[baseCurrency] = filteredRates;
  // return targetRates;
}

export {
  getCoinbaseDataForCurrency, extractDataFromCoinbaseResponse, filterAndFormatData
};
