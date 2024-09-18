const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    names: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: "User",
    },
    lover: {
      type: mongoose.Types.ObjectId,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("POSTER", postSchema);
module.exports = postModel;
