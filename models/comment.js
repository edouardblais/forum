"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    username: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
    date: { type: Date, required: true, "default": Date.now }
});
exports["default"] = mongoose.model("Comment", CommentSchema);
