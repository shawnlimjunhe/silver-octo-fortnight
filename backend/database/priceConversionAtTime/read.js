import { PriceConversionAtTime } from "./schemas/priceConversionAtTime.js";

const isCollectionEmpty = async () => {
    const count = await PriceConversionAtTime.countDocuments();
    return count === 0;
}

const getMostRecentBatch = async () => {
  const mostRecentBTCDoc = await PriceConversionAtTime.findOne({ baseCurrency: 'BTC' })
            .sort({ timestamp: -1 })
            .limit(1)
            .exec();

  if (!mostRecentBTCDoc) {
    throw new Error('No data found');
  }

  const mostRecentTimeStamp = mostRecentBTCDoc.timestamp;

  // Fetch all records with same timestamp
  return PriceConversionAtTime.find({ timestamp: mostRecentTimeStamp })
            .exec(); 
}

export { isCollectionEmpty, getMostRecentBatch };