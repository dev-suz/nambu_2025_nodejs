const models = require("../models");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { email, password, name } = req.body;

  // 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await models.User.create({
    email,
    password: hashedPassword,
    name,
  });
  res.status(200).json({ message: "ok", data: user });
};

const getAllUsers = async (req, res) => {
  const users = await models.User.findAll();
  res.status(200).json({ message: "ok", data: users });
};

// http://localhost:3000/users/12
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.findByPk(id);
  if (user) {
    if (password) {
      // 나중에 단방향 암호화된 패스워드로 변경 예정 - 역으로 못풀게 하는 암호화
      // Bcrypt 모듈이랑 함수 이용
      user.password = hashedPassword;
    }
    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found!" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const result = await models.User.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(404).json({ message: "user not found!" });
  }
};

// 로그인에 사용 (이메일로 가져옴)
const getUserByEmail = async (req, res) => {
  const user = await models.user.findOne({
    where: { email: email },
  });
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
};
