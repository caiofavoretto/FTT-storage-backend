import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  value: Number,
  profit_value: Number,
  amount: Number,
  created_at: Date,
  canceled_at: Date,
});

export default mongoose.model('Order', OrderSchema);
