const express = require("express");

const router = express.Router();
const { addPostValidation } = require("../lecture_4/validationMiddlware");
const {
  fetchPosts,
  getPostById,
  addPost,
  patchPost,
  deletePost,
} = require("../lecture_6_db_mongoose/controllers");

const { asyncWrapper } = require("../letcure_5_db/RestFulDb/asyncWrapper");

router.get("/", asyncWrapper(fetchPosts));
router.get("/:id", asyncWrapper(getPostById));
router.post("/", addPostValidation, asyncWrapper(addPost));
router.patch("/:id", asyncWrapper(patchPost));
router.delete("/:id", asyncWrapper(deletePost));

module.exports = { router };
