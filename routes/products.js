const express = require("express");
const auth = require('../middleware/authentication');

const {
    getAllProductsHome,
    viewCreateProduct,
    storeProduct,
    getAProduct
} = require("../controllers/product");

const router = express.Router();

router.route("/").get(getAllProductsHome);
router.route("/list/:id").get(getAProduct);

router.route("/create").get(auth,viewCreateProduct);
router.route("/create").post(auth,storeProduct);

module.exports = router;
