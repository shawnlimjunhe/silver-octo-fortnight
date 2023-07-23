import Joi from 'joi';

const validateExchangeRateQuery = (req, res, next) => {
  const querySchema = Joi.object({
    base: Joi.string().valid('fiat', 'crypto').required()
  })

  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: 'Invalid "base" parameter. It should be either "fiat" or "crypto".' });
  }
  next();
};

const validateHistoricalRateQuery = (req, res, next) => {
  const querySchema = Joi.object({
    base_currency: Joi.string().valid('BTC', 'DOGE', 'ETH', 'USD', 'SGD', 'EUR').required(),
    target_currency: Joi.string().valid('BTC', 'DOGE', 'ETH', 'USD', 'SGD', 'EUR').required(),
    start: Joi.date().timestamp().required(),
    end: Joi.date().timestamp().greater(Joi.ref('start')),
  }).custom((value, helpers) => {
    const { base_currency, target_currency } = value;
    if (target_currency === base_currency) {
      return helpers.error('any.invalid', { reason: 'base_currency and target_currency cannot be the same.'})
    }
    return value;
  })

  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error });
  }
  next();

}

export { validateExchangeRateQuery, validateHistoricalRateQuery };
