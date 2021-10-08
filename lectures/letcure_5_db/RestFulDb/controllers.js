const fetchPosts = async (req, res) => {
  console.log(req.db);
  // const { connectMongo } = require("./connection");
  // const Posts = await connectMongo();
  // const posts = await Posts.find({}).toArray();

  // res.json({ posts, status: "success" });
};

// const getPostsById = (req, res) => {
//   const post = posts.filter((item) => item.id === req.params.id);
//   res.json({ post, status: "success" });
// };

// const addPost = (req, res) => {
//   const { topic, text } = req.body;

//   posts.push({
//     id: new Date().getTime().toString(),
//     topic,
//     text,
//   });
//   res.json({ status: "success" });
// };

// const putPost = (req, res) => {
//   const { topic, text } = req.body;

//   posts.forEach((post) => {
//     if (post.id === req.params.id) {
//       post.topic = topic;
//       post.text = text;
//     }
//     res.json({ status: "success" });
//   });
// };

// const deletePost = (req, res) => {
//   posts.filter((item) => item.id !== req.params.id);

//   res.json({ status: "success" });
// };

module.exports = {
  fetchPosts /* getPostsById, addPost, putPost, deletePost */,
};
