import Order from '../models/Order';
import Product from '../models/Product';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const count = await Order.countDocuments();

    const orders = await Order.find(null, null, {
      skip: 5 * (page - 1),
      limit: 5,
    })
      .populate('product')
      .exec();

    res.header('X-Total-Count', count);

    return res.json(orders);
  }

  async store(req, res) {
    const { amount } = req.body;
    const { product_id } = req.params;

    const productExists = await Product.findOne({ _id: product_id });

    if (!productExists) {
      return res
        .status(404)
        .json({ message: 'Este produto não foi encontrado.' });
    }

    if (productExists.amount < amount) {
      return res
        .status(406)
        .json({ message: 'Quantidade insuficiente no estoque.' });
    }

    productExists.amount -= amount;

    await productExists.save();

    const order = await Order.create({
      product: product_id,
      value: productExists.value * amount,
      profit_value: productExists.value * amount * 2,
      amount,
      created_at: new Date(),
      canceled_at: null,
    });

    await order.populate('product').execPopulate();

    return res.json(order);
  }
}

export default new OrderController();
