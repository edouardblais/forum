"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 50 },
    username: { type: Schema.Types.ObjectId, ref: "User", required: true },
    community: { type: Schema.Types.ObjectId, ref: "Community", required: true },
    date: { type: Date, required: true, "default": Date.now }
});
PostSchema.virtual("url").get(function () {
    return "/post/".concat(this._id);
});
exports["default"] = mongoose.model("Post", PostSchema);
