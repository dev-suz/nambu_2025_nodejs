// 회원가입 - pw 암호화
const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

// 회원가입
const register = async (req, res) => {
  const { email, name, password } = req.body;
  // pw 암호화
  const hashedPassword = await bcrypt.hash(password, 10); //  salt = 10자리 문자열

  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  return res.status(201).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 이메일로 사용자 존재 확인
  const user = await models.User.findOne({
    where: { email: email },
  });
  // 없는 사용자의 경우 잘못된 이메일 비밀번호라고 알려줌
  if (!user) {
    return res.status(400).json({ message: "invalid email and password!" });
  }

  // 존재 사용자의 경우 비밀번호
  // compare() : 평문이랑 알아서 비교해줌
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // 비밀번호 불일치 시, 사용자에게 노티
    return res.status(400).json({ message: "invalid email and password!" });
  }

  // 정당한 사용자(이메일과 비밀번호가 일치하면) 임시허가증(토큰) 발급
  const accessToken = generateAccessToken(user);
  //  user정보 줌
  res.json({ message: "ok", accessToken: accessToken, user });
};

module.exports = { register, login };
