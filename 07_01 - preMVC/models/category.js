module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      tagName: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: "categories" }
  );
  return Category;
};
