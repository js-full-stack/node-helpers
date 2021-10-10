const express = require("express");

const router = express.Router();
const {
  fetchPostsController,
  getPostByIdController,
  addPostController,
  patchPostController,
  deletePostController,
} = require("../lecture_6_db_mongoose/controllers");

const { addPostValidation } = require("./validationMiddlware");
const { asyncWrapper } = require("./apiHelpers");

router.get("/", asyncWrapper(fetchPostsController));
router.get("/:id", asyncWrapper(getPostByIdController));
router.post("/", addPostValidation, asyncWrapper(addPostController));
router.patch("/:id", asyncWrapper(patchPostController));
router.delete("/:id", asyncWrapper(deletePostController));

module.exports = { router };
