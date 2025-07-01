const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

// 회원가입
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await models.user.create({
    email: email,
    name: name,
    password: password,
  });
  return res.status(201).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({
    where: { email: email },
  });

  if (!user) {
    return res.status(400).json({ message: "invalid emial and password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "invalid email and password" });
  }

  const accessToken = generateAccessToken(user);

  res.json({ message: "ok", accessToken: accessToken, user });
};

module.exports = { register, login };
