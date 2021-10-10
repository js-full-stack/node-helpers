sslet posts = [
  { id: "1", topic: "test-1", text: "topic text-1" },
  { id: "2", topic: "test-2", text: "topic text-2" },
  { id: "3", topic: "test-3", text: "topic text-3" },
];

const getPosts = (req, res) => {
  console.log(req.db);
  // res.json({ posts, status: "success" });
};

// const getPostsById = (req, res) => {
//   console.log(req.db);
//   const post = posts.filter((item) => item.id === req.params.id);
//   res.json({ post, status: "success" });
// };

const addPost = (req, res) => {
  const { topic, text } = req.body;

  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });
  res.json({ status: "success" });
};

const putPost = (req, res) => {
  const { topic, text } = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
    res.json({ status: "success" });
  });
};

const deletePost = (req, res) => {
  posts.filter((item) => item.id !== req.params.id);

  res.json({ status: "success" });
};

module.exports = { getPosts, getPostsById, addPost, putPost, deletePost };
