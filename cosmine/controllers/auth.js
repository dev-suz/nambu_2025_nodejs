const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

// 회원가입
const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailCheck = (await models.User.findOne({ where: { email } })) ? 1 : 0;

  if (emailCheck <= 0) {
    const user = await models.User.create({
      email: email,
      name: name,
      password: password,
    });
    return res.status(201).json({ message: "회원가입 완료", data: user });
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
    return res.status(400).json({ message: "유효하지 않은 계정입니다" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "아이디와 비밀번호를 확인해주세요." });
  }
  // ? 계속
  const accessToken = generateAccessToken(user);

  res.json({ message: "로그인 성공", accessToken: accessToken, user });
};

module.exports = { register, login };
