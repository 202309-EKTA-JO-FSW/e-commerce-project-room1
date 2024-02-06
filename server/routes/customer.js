const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer");

router.get("/filter", customerController.filterShopItems);
router.get("/search", customerController.searchShopItems);
router.post("/:customerId/cart", customerController.addToCart);
router.post("/:customerId/checkout", customerController.checkout);
router.get("/:id", customerController.getSingleItem)

// router.post("/", customerController.signup);
// router.get("/", customerController.signin);
// router.get("/", customerController.signout);

// router.get("/", customerController.profile);
// router.put("/", customerController.updateProfile);


module.exports = router;