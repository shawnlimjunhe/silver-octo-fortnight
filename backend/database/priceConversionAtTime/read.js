import { PriceConversionAtTime } from "./schemas/priceConversionAtTime.js";

const isCollectionEmpty = async () => {
    const count = await PriceConversionAtTime.countDocuments();
    return count === 0;
}

export { isCollectionEmpty };