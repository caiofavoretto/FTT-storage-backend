import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const orders = await Order.find();

    return res.json(orders);
  }

  async store(req, res) {
    const {
      order_value,
    } = req.body;    

    const created_at = new Date().getDate();
    const {product_id} = req.params;

    const order = await Order.create({
      created_at,
      product_id,
      order_value,
    });

    return res.json(order);
  }  
}

export default new OrderController();
