const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  post : { type: Schema.Types.ObjectId, ref: "Post", required: true },
  community : { type: Schema.Types.ObjectId, ref: "Community", required: true },
  date: {type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model("Comment", CommentSchema);