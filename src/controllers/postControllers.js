const {
  fetchPostsService,
  getPostByIdService,
  addPostService,
  patchPostService,
  deletePostService,
} = require("../services/postServices");

const fetchPostsController = async (req, res) => {
  //* достаем _id пользователя из миддлвара и переименовываем на userId
  const { _id: userId } = req.user;

  //* получаем посты юзера с переданным userId
  const posts = await fetchPostsService(userId);

  res.json({ posts, message: "success" });
};

const getPostByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: postId } = req.params;
  const post = await getPostByIdService(postId, userId);
  res.json({ post, message: "success" });
};

const addPostController = async (req, res) => {
  const { _id: userId } = req.user;

  const { topic, text } = req.body;
  await addPostService({ topic, text }, userId);

  res.json({ message: "success" });
};

const patchPostController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: postId } = req.params;
  const { topic, text } = req.body;
  await patchPostService(postId, { topic, text }, userId);

  res.json({ message: "success" });
};

const deletePostController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: postId } = req.params;
  const post = await deletePostService(postId, userId);
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
