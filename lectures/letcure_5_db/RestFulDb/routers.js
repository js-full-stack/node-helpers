const express = require("express");

const router = express.Router();
const middlwareModels = require("./middlewareModels");
const { addPostValidation } = require("../../lecture_4/validationMiddlware");
const {
  fetchPosts,
  getPostById,
  addPost,
  patchPost,
  deletePost,
} = require("./controllers");

const { asyncWrapper } = require("./asyncWrapper");

router.use(middlwareModels);

router.get("/", asyncWrapper(fetchPosts));
router.get("/:id", asyncWrapper(getPostById));
router.post("/", asyncWrapper(addPostValidation), addPost);
router.patch("/:id", asyncWrapper(patchPost));
router.delete("/:id", asyncWrapper(deletePost));

module.exports = { router };
