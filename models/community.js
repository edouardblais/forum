"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommunitySchema = new Schema({
    name: { type: String, required: true, maxLength: 50 }
});
CommunitySchema.virtual("url").get(function () {
    return "/community/".concat(this.name, "/").concat(this._id);
});
exports["default"] = mongoose.model("Community", CommunitySchema);
