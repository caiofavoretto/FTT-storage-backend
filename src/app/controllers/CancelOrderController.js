import Order from '../models/Order';

class CancelOrderController {
  async update(req, res) {
    const { id: _id } = req.params;

    const orderExists = await Order.findOne({ _id });

    if (!orderExists) {
      return res.json(404).json({ message: 'Este compra não foi encontrada.' });
    }

    orderExists.canceled_at = new Date();

    const order = await orderExists.save();

    await order.populate('product').execPopulate();

    return res.json(order);
  }
}

export default new CancelOrderController();
