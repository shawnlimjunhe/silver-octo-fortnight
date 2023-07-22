import { PriceConversionAtTime } from "./priceConversionAtTime.js";

const savePriceAtTime = async (data, queryDate) => {
  const {baseCurrency, rates} = data

  const targetCurrencies = Object.entries(rates).map(([currencyName, currencyPrice]) => ({
    currencyName,
    currencyPrice,
  }));

  const priceAtTime = new PriceConversionAtTime({
    baseCurrency,
    targetCurrencies,
    timestamp: queryDate,
  });

  await priceAtTime.save();
}

export { savePriceAtTime }