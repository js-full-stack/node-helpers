const express = require("express");

const router = express.Router();
const middlwareModels = require("./middlewareModels");
// const { addPostValidation } = require("../validationMiddlware");
const { fetchPosts } = require("./controllers");
router.use(middlwareModels);

router.get("/", fetchPosts);
// router.get("/:id", getPostsById);
// router.post("/", addPostValidation, addPost);
// router.put("/:id", putPost);
// router.delete("/:id", deletePost);

module.exports = { router };
