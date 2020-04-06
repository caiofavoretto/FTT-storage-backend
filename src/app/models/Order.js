import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product_id: String,
  order_value: Number,
});

export default mongoose.model('Product', OrderSchema);
