"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    member_since: { type: Date, "default": Date.now },
    admin: { type: Boolean, required: true, "default": false }
});
exports["default"] = mongoose.model("User", UserSchema);
