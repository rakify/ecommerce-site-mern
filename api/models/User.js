const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists"],
      trim: true,
      minlength: [3, "Username must be more than 3 characters"],
      maxlength: [30,"Username must be less than 30 characters"],
      required: [true, "Username is required"],
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100, "Name must be less than 100 characters"],
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      minlength: [4, "Password must be more than 4 characters"],
      required: [true, "Password is required"],
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
    address: {
      type: String,
      maxlength: 300,
      default: "",
    },
    relationship: {
      type: String,
      default: "",
    },
    pn: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
