import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  type: String,
  brand: String,
  value: Number,
  sugested_value: Number,
  amount: Number,
  size: String,
  color: String,
  description: String,
  created_at: Date,
});

export default mongoose.model('Product', ProductSchema);
