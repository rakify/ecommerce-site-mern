const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    cat: {
      type: Array,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
