const mongoose = require("mongoose");
const { Schema } = mongoose;

const postShema = new Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

// * После создания схемы ее нужно скомпилировать в модель
const Post = mongoose.model("Post", postShema);

module.exports = { Post };
