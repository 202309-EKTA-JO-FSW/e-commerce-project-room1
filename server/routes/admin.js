const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/", adminController.addNewShopItem);
router.put("/", adminController.updateShopItem);
router.delete("/:id", adminController.deleteShopItem);
router.get("/search", adminController.searchShopItems);

module.exports = router;