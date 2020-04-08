import Order from '../models/Order';
import Product from '../models/Product';

class CancelOrderController {
  async update(req, res) {
    const { id: _id } = req.params;

    const orderExists = await Order.findOne({ _id });

    if (!orderExists) {
      return res.json(404).json({ message: 'Este compra não foi encontrada.' });
    }

    const productExists = await Product.findOne({ _id: orderExists.product });

    if (!productExists) {
      return res
        .json(404)
        .json({ message: 'Este produto não está cadastrado.' });
    }

    productExists.amount += orderExists.amount;

    await productExists.save();

    orderExists.canceled_at = new Date();

    const order = await orderExists.save();

    await order.populate('product').execPopulate();

    return res.json(order);
  }
}

export default new CancelOrderController();
