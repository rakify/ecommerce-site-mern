const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default:
        "https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      maxlength: 50,
    },
    city: {
      type: String,
      maxlength: 50,
    },
    hometown: {
      type: String,
      maxlength: 50,
    },
    relationship: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
