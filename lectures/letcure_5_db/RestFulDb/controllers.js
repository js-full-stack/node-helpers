const { ObjectId } = require("mongodb"); //* ObjectId используется для правильной обработки id со стороны MongoDB

const fetchPosts = async (req, res) => {
  const posts = await req.db.Posts.find({}).toArray(); //* нужно преобразовать к массиву, т.к find вернет курсор
  res.json({ posts, status: "success" });
};

const getPostById = async (req, res) => {
  const post = await req.db.Posts.findOne({ _id: new ObjectId(req.params.id) });
  res.json({ post, status: "success" });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body;
  await req.db.Posts.insertOne({ topic, text });

  res.json({ status: "success" });
};

const patchPost = async (req, res) => {
  const { topic, text } = req.body;

  await req.db.Posts.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { topic, text } }
  );
  res.json({ status: "success" });
};

const deletePost = async (req, res) => {
  await req.db.Posts.deleteOne({ _id: new ObjectId(req.params.id) });

  res.json({ status: "success" });
};

module.exports = {
  fetchPosts,
  getPostById,
  addPost,
  patchPost,
  deletePost,
};
