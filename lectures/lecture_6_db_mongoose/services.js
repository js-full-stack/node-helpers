const { Post } = require("./shema");
const { CustomError } = require("./errors");
const fetchPostsService = async () => {
  const posts = await Post.find({});
  return posts;
};

const getPostByIdService = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new CustomError(400, "there is no post with entered id");
  }
  return post;
};

const addPostService = async ({ topic, text }) => {
  const post = await Post.create({ topic, text });
  if (!post) {
    throw new CustomError(400, "post creation error");
  }
  //* аналогичная запись
  //   const post = new Post({ topic, text });
  //     await post.save();
  return post;
};

const patchPostService = async (id, { topic, text }) => {
  await Post.findByIdAndUpdate(id, { $set: { topic, text } });
};

const deletePostService = async (id) => {
  const post = await Post.findByIdAndRemove(id);

  return post;
};

module.exports = {
  fetchPostsService,
  getPostByIdService,
  addPostService,
  deletePostService,
  patchPostService,
};
