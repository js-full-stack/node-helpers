const mongoose = require("mongoose");
const { Schema } = mongoose;

const postShema = new Schema(
  {
    topic: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, "Topic is required"],
    },
    text: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: [true, "Text is required"],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Post = mongoose.model("Post", postShema);

module.exports = { Post };
