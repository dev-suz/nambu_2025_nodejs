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

    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    console.error("Error during creating User ; ", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.status(200).json({ message: "ok", data: users });
  } catch (error) {
    console.error("Error during getll All the  Users ; ", error);
    res.status(500).json({ message: error.message, stack: error.stack });
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
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
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

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
