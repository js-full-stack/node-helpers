const {
  fetchPostsService,
  getPostByIdService,
  addPostService,
  patchPostService,
  deletePostService,
} = require("./services");

const fetchPostsController = async (req, res) => {
  const posts = await fetchPostsService();
  res.json({ posts, message: "success" });
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await getPostByIdService(id);
  res.json({ post, message: "success" });
};

const addPostController = async (req, res) => {
  const { topic, text } = req.body;
  await addPostService({ topic, text });

  res.json({ message: "success" });
};

const patchPostController = async (req, res) => {
  const { topic, text } = req.body;
  const { id } = req.params;
  await patchPostService(id, { topic, text });

  res.json({ message: "success" });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  const post = await deletePostService(id);
  if (!post) {
    res.status(400).json({ message: `there is not user with id ${id}` });
  }
  res.json({ message: "success" });
};

module.exports = {
  fetchPostsController,
  getPostByIdController,
  addPostController,
  patchPostController,
  deletePostController,
};
