const {
  findAllProducts,
  findProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await findAllProducts(req.params.id);
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error in getAllReps:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductByID = async (req, res) => {
  try {
    const product = await findProductByID(req.params.id);
    const result = res.status(200).json(product);
  } catch (err) {
    console.error('Error in getAllReps:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.postProduct = async (req, res) => {
  const { customer_number, service } = req.body;
  try {
    const newProduct = await createProduct(req.body, service, customer_number);
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error in getAllReps:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.putProduct = async (req, res) => {
  const { customer_number, service } = req.body;

  try {
    const updatedProd = await updateProduct(
      req.params.id,
      req.body,
      service,
      customer_number
    );
    return res.status(201).json(updatedProd);
  } catch (err) {
    console.error('Error in getAllReps:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    return res
      .status(204)
      .json({ message: `Product with id ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};
