const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const {
  validateAndHashPassword,
} = require("../middlewares/validateAndHashedPassword");

router.post("/", validateAndHashPassword, userController.createUser);
router.get("/", userController.getAllUsers);
router.patch("/:id", validateAndHashPassword, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
