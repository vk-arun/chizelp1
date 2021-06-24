const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    housename: { type: String },
    post: { type: String },
    area: { type: String },
    dist: { type: String },
    state: { type: String },
    mobile: { type: Number },
    pin: { type: Number },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = (module.exports = mongoose.model("User", UserSchema));
