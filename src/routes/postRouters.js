const express = require("express");

const router = express.Router();
const {
  fetchPostsController,
  getPostByIdController,
  addPostController,
  patchPostController,
  deletePostController,
} = require("../controllers/postControllers");

const { addPostValidation } = require("../middlwares/validationMiddlware");
const { authMiddlware } = require("../middlwares/authMiddlware");

const { asyncWrapper } = require("../helpers/apiHelpers");

router.use(authMiddlware); //* подключает для всех маршрутов миддлвар, который проверяет токен и декдирует из него id юзера

router.get("/", asyncWrapper(fetchPostsController));
router.get("/:id", asyncWrapper(getPostByIdController));
router.post("/", addPostValidation, asyncWrapper(addPostController));
router.patch("/:id", asyncWrapper(patchPostController));
router.delete("/:id", asyncWrapper(deletePostController));

module.exports = { postRouter: router };
