import mongoose from 'mongoose';

const priceConversionAtTimeSchema = new mongoose.Schema({
  baseCurrency: String,
  targetCurrencies: [
    { 
      currencyName: String, 
      currencyPrice: Number
    }
  ],
  timestamp: Date
});

const PriceConversionAtTime = mongoose.model('PriceConversionAtTime', priceConversionAtTimeSchema)

export { PriceConversionAtTime }