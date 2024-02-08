const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verification');

const customerController = require("../controllers/customer");


router.post('/', customerController.addCustomer)
router.get("/filter", verifyToken, customerController.filterShopItems);
router.get("/search", verifyToken, customerController.searchShopItems);
router.post("/:customerId/cart", verifyToken, customerController.addToCart);
router.post("/:customerId/checkout", verifyToken, customerController.checkout);
router.get("/:id", verifyToken, customerController.getSingleItem)
router.get('/', customerController.getAllCustomers)

router.post("/signup", customerController.signUp);
router.post("/signin", customerController.signIn);
router.post("/signout", verifyToken, customerController.signOut);

// router.get("/", customerController.profile);
// router.put("/", customerController.updateProfile);


module.exports = router;