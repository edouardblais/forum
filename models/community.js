const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: { type: String, required: true, maxLength: 50},
});

CommunitySchema.virtual("url").get(function () {
    return `/community/${this.name}/${this._id}`;
  });

module.exports = mongoose.model("Community", CommunitySchema);