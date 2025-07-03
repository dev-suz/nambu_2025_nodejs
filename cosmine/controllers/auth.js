const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

// 회원가입
const register = async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email);
  const emailCheck = (await models.User.findOne({ where: { email } })) ? 1 : 0;
  console.log(`===emailCheck(exists 1 fresh 0 )`, emailCheck);
  if (emailCheck <= 0) {
    const user = await models.User.create({
      email: email,
      name: name,
      password: password,
    });
    return res.status(201).json({ message: "ok", data: user });
  } else {
    return res.status(409).json({ message: "중복가입 불가합니다." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({
    where: { email: email },
  });

  if (!user) {
    return res.status(400).json({ message: "invalid email and password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "invalid email and password" });
  }

  const accessToken = generateAccessToken(user);

  res.json({ message: "ok", accessToken: accessToken, user });
};

module.exports = { register, login };
