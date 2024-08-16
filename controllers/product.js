const Product = require("../models/product");

// Get all products (for home page)
const getAllProductsHome = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving products");
  }
};

// Get a product (for home page)
const getAProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving product");
  }
};

const viewCreateProduct = async (req, res) => {
  try {
    res.render("products/create");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving create page");
  }
};

// store a new product (for create-product page)
const storeProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  const newProduct = new Product({ name, description, price, image });

  try {
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error creating product");
  }
};

module.exports = {
  getAllProductsHome,
  viewCreateProduct,
  storeProduct,
  getAProduct,
};
