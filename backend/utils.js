import axios from 'axios';

const formQueryUrl = (currency) => `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`;

const getCoinbaseDataForCurrency = (currency) =>  axios.get(formQueryUrl(currency));

const extractDataFromCoinbaseResponse = (response) => response.data.data;

const flattenObject = (data) => Object.assign({}, ...data);

const formatRate = (rate) => {
  const numberValue = parseFloat(rate);
  if (numberValue < 1) {
    // numbers to be formatted to 2 most significant digits e.g. 0.0034
    return Number(numberValue.toPrecision(2)).toString();
  }
  // numbers to be rounded to 2 decimal places e.g. 1.23
  return numberValue.toFixed(2).toString();
}

const filterAndFormatData = (currencyData, allCurrencies) => {
  const {rates, currency: baseCurrency} = currencyData;
  // save needed currencies
  const targetCurrencies = allCurrencies.filter((currency) => currency !== baseCurrency);
  const filteredRates = targetCurrencies.reduce((obj, targetCurrency) => {
    obj[targetCurrency] = formatRate(rates[targetCurrency]);
    return obj;
  }, {});

  return {
    baseCurrency,
    rates: filteredRates
  }
}

const reshapeTargetPrices = (targetPrice, targetCurrencies) => {
  const filteredTargetPrices = targetPrice.filter((targetData) => targetCurrencies.includes(targetData.currencyName))
      .map((targetData) => {
        const {currencyName, currencyPrice} = targetData;
        return {
          [currencyName]: currencyPrice
        }
      });
  return flattenObject(filteredTargetPrices);
}

const formatExchangeRateData = (currencyData, baseCurrencies, targetCurrencies) => {
  const baseCurrencyData = currencyData.filter((data) => baseCurrencies.includes(data.baseCurrency))
  .map((data) => {
    const { baseCurrency, targetCurrencies: targetPrice } = data;
     
    const formattedTargetPrices = reshapeTargetPrices(targetPrice, targetCurrencies);
    return {
      [baseCurrency]: formattedTargetPrices
    }
  })

 return flattenObject(baseCurrencyData);

}

export {
  getCoinbaseDataForCurrency, extractDataFromCoinbaseResponse,
  filterAndFormatData, formatExchangeRateData
};
