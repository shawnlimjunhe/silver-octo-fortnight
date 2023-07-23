import Joi from 'joi'

const validateExchangeRateQuery = (req, res, next) => {
  const querySchema = Joi.object({
    base: Joi.string().valid('fiat', 'crypto').required()
  })

  const { error } = querySchema.validate(req.query)
  if (error) {
    return res.status(400).json({
      error: 'Invalid "base" parameter. It should be either "fiat" or "crypto".'
    })
  }
  next()
}

const validateHistoricalRateQuery = (allCurrencies) => (req, res, next) => {
  const querySchema = Joi.object({
    base_currency: Joi.string()
      .valid(...allCurrencies)
      .required(),
    target_currency: Joi.string()
      .valid(...allCurrencies)
      .required(),
    start: Joi.date().timestamp().required(),
    end: Joi.date().timestamp().greater(Joi.ref('start'))
  }).custom((value, helpers) => {
    // eslint-disable-next-line camelcase
    const { base_currency: baseCurrency, target_currency: targetCurrency } =
      value
    if (targetCurrency === baseCurrency) {
      return helpers.error('any.invalid', {
        reason: 'base_currency and target_currency cannot be the same.'
      })
    }
    return value
  })

  const { error } = querySchema.validate(req.query)
  if (error) {
    return res.status(400).json({ error })
  }
  next()
}

export { validateExchangeRateQuery, validateHistoricalRateQuery }
