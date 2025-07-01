module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        //[Re] 나중에 비밀번호 특수문자, 영문, 숫자 각각 하나씩 섞기 필요
        // 일단 미들웨어에서 검증할게요~
        // validate: { len: [8, 20] },
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        // 추후[re] grade, point
      },
    },
    // soft 삭제 방법 사용 : paranoid - true
    { paranoid: true, tableName: "users" }
  );
  User.associate = function (models) {
    User.hasMany(models.Item, { foreignKey: "userId", as: "items" });
    User.hasMany(models.Post, { foreignKey: "authorId", as: "posts" });
    User.hasMany(models.Comment, { foreignKey: "userId", as: "comments" });
  };
  return User;
};
