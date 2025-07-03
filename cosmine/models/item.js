const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        // 문자열?
        validate: { isIn: [[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]] },
      },
      expirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      startUsingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    },
    { tableName: "items" }
  );
  Item.associate = function (models) {
    Item.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };
  return Item;
};
