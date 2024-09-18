const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  many: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

const showModel = mongoose.model("Show", showSchema);
module.exports = showModel;
