// item
const models = require("../models");

const addItem = async (req, res) => {
  const access_user = req.user?.id;
  const { name, brand, expirationDate, purchaseDate, rating, startUsingDate } =
    req.body;

  if (!access_user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  console.log(`payload: ${rating} , ${typeof rating}`);
  const item = await models.Item.create({
    name: name,
    brand: brand,
    rating: rating,
    expirationDate: expirationDate,
    purchaseDate: purchaseDate,
    startUsingDate: startUsingDate,
    userId: access_user,
  });

  res.status(201).json({ message: "ok", data: item });
};

const getAllItems = async (req, res) => {
  const access_user = req.user?.id;

  if (!access_user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const items = await models.Item.findAll({ where: { userId: access_user } });

  res.status(200).json({ message: "ok", data: items });
};

const getItem = async (req, res) => {
  const access_user = req.user?.id;
  const id = req.params.id;

  if (!access_user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const item = await models.Item.findOne({
    where: { userId: access_user, id: id },
  });

  if (!item) {
    res.status(404).json({ message: "item not found" });
  }

  res.status(200).json({ message: "ok", data: item });
};

const updateItem = async (req, res) => {
  const access_user = req.user?.id;
  const id = req.params.id;
  console.log(`id: ${id}`);
  const allowedFields = Object.keys(models.Item.rawAttributes);
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );
  console.log("allowedFields: ", allowedFields);
  console.log("updates:", updates);

  if (!access_user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const item = await models.Item.findOne({
    where: { id: id },
  });

  if (!item) {
    return res
      .status(404)
      .json({ message: "변경하고자하는 아이템이 없습니다." });
  }

  if (access_user === item.userId) {
    try {
      Object.assign(item, updates);
      return res.status(200).json({ message: "수정 완료", data: item });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "수정중 에러 발생" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "not allowed to update the others data" });
  }
};

const deleteItem = async (req, res) => {
  const access_user = req.user?.id;
  const id = req.params.id;

  const item = await models.Item.findByPk(id);

  if (!item) {
    res.status(404).json({ message: "item not found" });
  }

  if (access_user === item.userId) {
    const result = await models.Item.destroy({
      where: { id: id, userId: access_user },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "item not deleted" });
    }
  }
};
module.exports = {
  addItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
};
