import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  created_at: Date,
  product_id: String,
  order_value: Number,
});

OrderSchema.virtual('profit_value').get(() => {
  return this.order_value * 2;
});

export default mongoose.model('Order', OrderSchema);
