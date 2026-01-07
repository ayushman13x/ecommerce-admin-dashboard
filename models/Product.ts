import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },image: { type: String },
  stock: { type: Number, required: true },
}, { 
  timestamps: true 
});

// If the model already exists, use it; otherwise, create a new one
const Product = models.Product || model("Product", ProductSchema);

export default Product;