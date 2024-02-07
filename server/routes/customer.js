const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verification');

const customerController = require("../controllers/customer");


router.post('/', customerController.addCustomer)
router.get("/filter", customerController.filterShopItems);
router.get("/search", customerController.searchShopItems);
router.get('/:customerId/cart', verifyToken, customerController.getCart )
router.post("/:customerId/cart", customerController.addToCart);
router.post("/:customerId/checkout", customerController.checkout);
router.get("/:id", customerController.getSingleItem)
router.get('/', customerController.getAllCustomers)

// router.post("/signup", customerController.signUp);
// router.get("/signin", customerController.signin);
// router.get("/", customerController.signout);

// router.get("/", customerController.profile);
// router.put("/", customerController.updateProfile);


module.exports = router;