const Joi = require("joi");

const { CustomError } = require("./errors");

module.exports = {
  addPostValidation: (req, res, next) => {
    const shema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().alphanum().min(5).max(300).required(),
    });

    const validationResult = shema.validate(req.body);
    if (validationResult.error) {
      next(
        new CustomError(
          400,
          validationResult.error.details[0].message.replace(/"/g, "")
        )
      );
    }
    next();
  },
};
