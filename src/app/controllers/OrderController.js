import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const { page=1 } = req.query;

    const count = await Order.countDocuments();

    const orders = await Order.find(null, null, {
      skip: 10 * (page - 1),
      limit: 10,
    });

    res.header('X-Total-Count', count);

    return res.json(orders);
  }

  async store(req, res) {
    const { order_value } = req.body;

    const created_at = new Date().getDate();
    const { product_id } = req.params;

    const order = await Order.create({
      created_at,
      product_id,
      order_value,
    });

    return res.json(order);
  }
}

export default new OrderController();
