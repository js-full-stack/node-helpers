const { Post } = require("../db/postShema");
const { CustomError } = require("../helpers/errors");
//* в userId - свойство из коллекции postShema.js

const fetchPostsService = async (userId) => {
  //* находим посты пользователя поле userId которого === переданному
  const posts = await Post.find({ userId });
  return posts;
};

const getPostByIdService = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId, userId });
  if (!post) {
    throw new CustomError(400, `there is no post with id ${postId}`);
  }
  return post;
};

//* 2-м параметром передается id юзера
const addPostService = async ({ topic, text }, userId) => {
  const post = new Post({ topic, text, userId });

  if (!post) {
    throw new CustomError(400, "post creation error");
  }
  await post.save();
  return post;
};

const patchPostService = async (postId, { topic, text }, userId) => {
  await Post.findOneAndUpdate({ postId, userId }, { $set: { topic, text } });
};

const deletePostService = async (postId, userId) => {
  const post = await Post.findOneAndRemove({ postId, userId });

  return post;
};

module.exports = {
  fetchPostsService,
  getPostByIdService,
  addPostService,
  deletePostService,
  patchPostService,
};
