import mongoose from 'mongoose'
import fs from 'fs/promises'

const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const loadCurrencies = async () => {
  const rawData = await fs.readFile(process.env.CURRENCY_FILEPATH, 'utf-8')
  const data = JSON.parse(rawData)

  const { crypto, fiat } = data
  const allCurrencies = [...crypto, ...fiat]

  return { crypto, fiat, allCurrencies }
}

export { connectToDatabase, loadCurrencies }
