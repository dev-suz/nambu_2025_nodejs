const express = require("express");
const router = express.Router();
const itemController = require("../controllers/items");
const { authenticate } = require("../middlewares/auth");

router.post("/", authenticate, itemController.addItem);
router.get("/", authenticate, itemController.getAllItems);
router.get("/:id", authenticate, itemController.getItem);

router.patch("/:id", authenticate, itemController.updateItem);
router.delete("/:id", authenticate, itemController.deleteItem);

module.exports = router;
