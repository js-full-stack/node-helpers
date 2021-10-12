const Joi = require("joi");

const { CustomError } = require("../helpers/errors");

module.exports = {
  addPostValidation: (req, res, next) => {
    const shema = Joi.object({
      topic: Joi.string().min(3).max(30).required(),
      text: Joi.string().min(5).max(300).required(),
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
