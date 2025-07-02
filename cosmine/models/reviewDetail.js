module.exports = (sequelize, DataTypes) => {
  const ReviewDetail = sequelize.define(
    "ReviewDetail",
    {
      raiting: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        validate: { isIn: [[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]] },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { table: "reviewDetails" }
  );
  ReviewDetail.associate = function (models) {
    ReviewDetail.belongsTo(models.Post, { foreignKey: "postId", as: "author" });
  };
  return ReviewDetail;
};
