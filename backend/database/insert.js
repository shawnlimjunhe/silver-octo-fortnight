import { PriceConversionAtTime } from "./priceConversionAtTime.js";

const savePriceAtTime = async (data) => {
  const {baseCurrency, rates} = data

  const targetCurrencies = Object.entries(rates).map(([currencyName, currencyPrice]) => ({
    currencyName,
    currencyPrice,
  }))

  const priceAtTime = new PriceConversionAtTime({
    baseCurrency,
    targetCurrencies,
  })

  console.log(priceAtTime)
}

export { savePriceAtTime }