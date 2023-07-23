import mongoose from 'mongoose'

const priceConversionAtTimeSchema = new mongoose.Schema({
  baseCurrency: {
    type: String,
    required: true
  },
  targetCurrencies: [
    {
      currencyName: {
        type: String,
        required: true
      },
      currencyPrice: {
        type: Number,
        required: true
      }
    }
  ],
  timestamp: {
    type: Date,
    required: true
  }
})

const PriceConversionAtTime = mongoose.model(
  'PriceConversionAtTime',
  priceConversionAtTimeSchema
)

export { PriceConversionAtTime }
