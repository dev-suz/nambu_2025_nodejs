const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const {
  validateAndHashPassword,
} = require("../middlewares/validateAndHashedPassword");
const { registerValidator } = require("../middlewares/registerValidation");

router.post(
  "/register",
  registerValidator,
  validateAndHashPassword,
  authController.register
);
router.post("/login", authController.login);

module.exports = router;
