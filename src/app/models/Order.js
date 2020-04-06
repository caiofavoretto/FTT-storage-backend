import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product_id: String,
  order_value: Number,
});

module.exports = mongoose.model('Product', OrderSchema);
