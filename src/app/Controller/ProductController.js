const Product = require('../app/models/Product');

module.exports = {
  async index(req, res) {
    const products = await Product.find();

    return res.json(products);
  },

  async store(req, res) {
    const {
      type,
      brand,
      description,
      size,
      color,
      value,
      sugested_value,
    } = req.body;

    const existProduct = Product.findOne({ type, brand });

    if (existProduct) {
      return res.status(406).json({ message: 'Produto já existe' });
    }

    const created_at = new Date().getDate();

    const product = await Product.create({
      created_at,
      type,
      brand,
      description,
      size,
      color,
      value,
      sugested_value,
      amount: 0,
    });

    return res.json(product);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });

    if (!product)
      return res.status(404).json({ message: 'Produto não encontrado' });

    await Product.findByIdAndDelete(id);

    return res.status(204).send();
  },

  async update(req, res) {
    const { id } = req.params;

    const existProduct = await Product.findOne({ _id: id });

    if (!existProduct)
      return res.status(404).json({ message: 'Produto não encontrado' });

    const {
      type,
      brand,
      description,
      size,
      color,
      value,
      sugested_value,
    } = req.body;

    const product = await Product.findByIdAndUpdate(id, {
      created_at,
      type,
      brand,
      description,
      size,
      color,
      value,
      sugested_value,
      amount: existProduct.amount + amount,
    });

    return res.json(product);
  },
};
