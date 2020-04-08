import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const { page=1} = req.query;

    console.log(page);

    const count = await Product.countDocuments();

    const products = await Product.find(null, null, {
      skip: 10 * (page - 1),
      limit: 10,
    });

    res.header('X-Total-Count', count);

    return res.json(products);
  }

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

    const existingProduct = await Product.findOne({ type, brand, size, color });

    if (existingProduct) {
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
  }

  async destroy(req, res) {
    const { id } = req.params;

    const existingProduct = await Product.findOne({ _id: id });

    if (!existingProduct)
      return res.status(404).json({ message: 'Produto não encontrado' });

    await Product.findByIdAndDelete(id);

    return res.status(204).send();
  }

  async update(req, res) {
    const { id } = req.params;

    const existingProduct = await Product.findOne({ _id: id });

    if (!existingProduct)
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
      amount: existingProduct.amount + amount,
    });

    return res.json(product);
  }
}

export default new ProductController();
