const { Post } = require("./shema");

const fetchPosts = async (req, res) => {
  const posts = await Post.find({}); //* преобразовывать в массив не нужно, mongoose сделает это сам
  res.json({ posts, status: "success" });
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json({ post, status: "success" });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body;

  await Post.create({ topic, text });

  //* аналогичная запись
  //   const post = new Post({ topic, text });
  //     await post.save();
  res.json({ status: "success" });
};

const patchPost = async (req, res) => {
  const { topic, text } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { $set: { topic, text } });
  res.json({ status: "success" });
};

const deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.json({ status: "success" });
};

module.exports = {
  fetchPosts,
  getPostById,
  addPost,
  patchPost,
  deletePost,
};
