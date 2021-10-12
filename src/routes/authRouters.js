const express = require("express");
const router = express.Router();
const {
  regController,
  logController,
} = require("../controllers/authControllers");

const { asyncWrapper } = require("../helpers/apiHelpers");

router.post("/registration", asyncWrapper(regController));
router.post("/login", asyncWrapper(logController));

module.exports = { authRouter: router };
