import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  created_at: Date,
  type: String,
  brand: String,
  description: String,
  size: String,
  color: String,
  value: Number,
  sugested_value: Number,
  amount: Number,
});

module.exports = mongoose.model('Product', ProductSchema);
