const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  date: {type: Date, required: true, default: Date.now},
});

export default mongoose.model("Comment", CommentSchema);