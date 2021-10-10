const mongoose = require("mongoose");
const { Schema } = mongoose;

const postShema = new Schema(
  {
    topic: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, "Topic is required"],
      unique: true,
    },
    text: {
      type: String,
      required: [true, "Text is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

// * После создания схемы ее нужно скомпилировать в модель
const Post = mongoose.model("Post", postShema);

module.exports = { Post };
