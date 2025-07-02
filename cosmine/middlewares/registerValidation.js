const { registerSchema } = require("../utils/validatePersonalData");

const registerValidator = (req, res, next) => {
  console.log("validateRegister..");
  const { error } = registerSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error });
  }

  next();
};

module.exports = { registerValidator };
