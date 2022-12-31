const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  member_since: {type: Date, default: Date.now},
  admin: {type: Boolean, required: true, default: false }
});

export default mongoose.model("User", UserSchema);
