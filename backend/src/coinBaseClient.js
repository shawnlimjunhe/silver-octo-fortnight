import axios from 'axios'
import { savePriceAtTime } from '../database/priceConversionAtTime/create.js'
import { filterAndFormatData } from './utils.js'

const formQueryUrl = (currency) =>
  `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`

const getCoinbaseData = (currency) => axios.get(formQueryUrl(currency))

const extractCoinbaseData = (response) => response.data.data

const fetchAndPersistCurrencyData = async (allCurrencies) => {
  const rawCurrencyResponse = await Promise.all(
    allCurrencies.map((currency) => getCoinbaseData(currency))
  )
  const filteredData = rawCurrencyResponse
    .map((response) => extractCoinbaseData(response))
    .map((unfilteredCurrencyData) =>
      filterAndFormatData(unfilteredCurrencyData, allCurrencies)
    )

  const queryDate = new Date()
  await Promise.all(
    filteredData.map((data) => savePriceAtTime(data, queryDate))
  )

  console.info(`Fetched and persisted currency data at ${queryDate.toString()}`)

  return filteredData
}

export { fetchAndPersistCurrencyData }
