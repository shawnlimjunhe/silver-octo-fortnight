import Joi from 'joi';


const validateBaseParam = (req, res, next) => {
  const baseSchema = Joi.object({
    base: Joi.string().valid('fiat', 'crypto').required()
  })

  const { error } = baseSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: 'Invalid "base" parameter. It should be either "fiat" or "crypto".' });
  }
  next();
};

export { validateBaseParam };
