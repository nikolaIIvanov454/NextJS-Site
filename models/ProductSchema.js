import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  price: String,
  imageUrl: [String],
  type: String,
  description: String,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
