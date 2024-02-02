const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer");

router.post("/", customerController.cart);
router.post("/", customerController.checkout);
router.post("/", customerController.signup);
router.get("/", customerController.signin);
router.get("/", customerController.signout);
router.get("/", customerController.orders);
router.get("/", customerController.profile);
router.put("/", customerController.updateProfile);
router.get("/filter", customerController.filterShopItems);

module.exports = router;