module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      category: { type: DataTypes.ENUM("review", "campagin", "notice") },
      title: { type: DataTypes.STRING, allowNull: false },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachments: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      tableName: "posts",
    }
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author",
    });
    Post.hasMany(models.ReviewDetail, {
      foreignKey: "postId",
      as: "reviewDtId",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };

  return Post;
};
