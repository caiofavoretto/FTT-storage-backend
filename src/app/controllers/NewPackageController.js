import Product from '../models/Product';

class NewPackageController {
  async update(req, res) {
    const { product_id: _id } = req.params;

    const productExists = await Product.findOne({ _id });

    if (!productExists)
      return res
        .status(404)
        .json({ message: 'Este roduto não foi encontrado' });

    const { amount } = req.body;

    productExists.amount += amount;

    const product = await productExists.save();

    return res.json(product);
  }
}

export default new NewPackageController();
