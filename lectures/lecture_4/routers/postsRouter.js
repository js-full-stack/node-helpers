const express = require("express");

const router = express.Router();
const { addPostValidation } = require("../validationMiddlware");
const {
  getPosts,
  getPostsById,
  addPost,
  putPost,
  deletePost,
} = require("../postsControllers");

router.get("/", getPosts);
router.get("/:id", getPostsById);
router.post("/", addPostValidation, addPost);
router.put("/:id", putPost);
router.delete("/:id", deletePost);

module.exports = { postsRouter: router };
