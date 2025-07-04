const models = require("../models");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await models.User.create({
      email,
      password,
      name,
    });

    res.status(200).json({ message: "계정 생성 완료", data: user });
  } catch (error) {
    // console.error("Error during creating User ; ", error);
    res
      .status(500)
      .json({ message: "계정 생성중 에러 발생", stack: error.stack });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.status(200).json({ message: "전체 계정 조회 성공", data: users });
  } catch (error) {
    // console.error("Error during getll All the  Users ; ", error);
    // res.status(500).json({ message: error.message, stack: error.stack });
    res
      .status(500)
      .json({ message: "전체 계정 조회중 에러 발생", stack: error.stack });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password, name } = req.body;
  const user = await models.User.findByPk(id);

  if (user) {
    if (password) {
      user.password = password;
    }
    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(200).json({ message: "사용자 계정 수정 성공", data: user });
  } else {
    res.status(404).json({ message: "계정 수정중 에러 발생" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const result = await models.User.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(200).json({ message: "사용자 계정(비활성화) 완료" });
  } else {
    res.status(404).json({ message: "사용자 조회 불가. 없는 사용자입니다." });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
