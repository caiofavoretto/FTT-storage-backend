import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const count = await Product.countDocuments();

    const products = await Product.find(null, null, {
      skip: 5 * (page - 1),
      limit: 5,
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

    const productExists = await Product.findOne({ type, brand, size, color });

    if (productExists) {
      return res.status(406).json({ message: 'Produto já existe' });
    }

    const product = await Product.create({
      type,
      brand,
      description,
      size,
      color,
      value,
      sugested_value,
      amount: 0,
      created_at: new Date(),
    });

    return res.json(product);
  }

  async update(req, res) {
    const { id: _id } = req.params;

    const productExists = await Product.findOne({ _id });

    if (!productExists)
      return res
        .status(404)
        .json({ message: 'Este roduto não foi encontrado' });

    const {
      type,
      brand,
      value,
      sugested_value,
      size,
      color,
      description,
    } = req.body;

    productExists.type = type;
    productExists.brand = brand;
    productExists.value = value;
    productExists.sugested_value = sugested_value;
    productExists.size = size;
    productExists.color = color;
    productExists.description = description;

    const product = await productExists.save();

    return res.json(product);
  }

  async destroy(req, res) {
    const { id: _id } = req.params;

    const productExists = await Product.findOne({ _id });

    if (!productExists)
      return res
        .status(404)
        .json({ message: 'Este roduto não foi encontrado' });

    await Product.deleteOne({ _id });

    return res.status(204).send();
  }
}

export default new ProductController();
