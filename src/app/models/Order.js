import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  value: Number,
  amount: Number,
  created_at: Date,
  canceled_at: Date,
});

OrderSchema.virtual('profit_value').get(() => {
  return this.value * 2;
});

export default mongoose.model('Order', OrderSchema);
