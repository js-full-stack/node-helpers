const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    next(new Error("validation failed!"));
    const shema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().alphanum().min(5).max(300).required(),
    });

    const validationResult = shema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};
