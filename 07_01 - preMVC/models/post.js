module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { tableName: "posts" }
  );
  // 관계 설정
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "authorId", as: "author" });
    Post.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
  };
  return Post;
};
