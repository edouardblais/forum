const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 50},
    username: { type: Schema.Types.ObjectId, ref: "User", required: true },
    community : { type: Schema.Types.ObjectId, ref: "Community", required: true },
    date: {type: Date, required: true, default: Date.now}
});

PostSchema.virtual("url").get(function () {
    return `/post/${this._id}`;
  });

export default mongoose.model("Post", PostSchema);