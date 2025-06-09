const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
title: {
    type: String,
    required: [true, "Product title is required"],
    minlength: [3, "Minimum title length is 3 characters"],
    maxlength: [100, "Maximum title length is 50 characters"],
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [500, "Description must not exceed 50 characters"],
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
  type: String,
  required: true,
},
  imageUrl: {
    type: String,
    required: true,
    default: "https://media.istockphoto.com/id/2206637039/photo/kurti-collection-for-women-in-variety-of-designs-and-colors.jpg?s=2048x2048&w=is&k=20&c=NWtfmBtfgRCnSVpW0iAJTcVQHCc2HUpNG2kKw9UERC8=,"
    // match: [/^https?:\/\//, "Image URL must be a valid link"]
  }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;;