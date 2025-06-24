const { Sequelize, Model, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1.  회원 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], // 사용자 이름 2자~5자까지 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 중복 이메일 비허용
      validate: {
        isEmail: true, // Email 형식이어야만 등록가능.
      },
    },
    password: {
      // 단방향 암호화를 해야함! bcrypt 이용 예정~
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), // 미리 정의된 항목만 받음.
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

// 회원 만들기
(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "홍길동",
    email: "example1@example.com",
    age: 18,
    password: "12345678",
  });

  const user2 = await User.create({
    username: "김두루미",
    email: "exmple2@example.com",
    age: 30,
    password: "1111111",
  });

  const user3 = await User.create({
    username: "박루루",
    email: "exmple3@example.com",
    age: 42,
    password: "1111111",
  });

  const user4 = await User.create({
    username: "김칠봉",
    email: "exmple4@example.com",
    age: 64,
    password: "1111111",
  });

  const user5 = await User.create({
    username: "차두원",
    email: "exmple5@example.com",
    age: 149,
    password: "1111111",
  });

  const users = await User.findAll({
    where: {
      email: {
        [Op.like]: "%.com",
      },
    },
  });
  console.log(
    users.map((u) => {
      return { email: u.email, name: u.username };
    })
  );

  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["홍길동", "박루루"],
      },
    },
  });

  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 20, //  lt : less than (<), gt : greater than == ( > )  ,  lte == '<=' , gte== '>='
      },
    },
  });
  console.log(JSON.stringify(users3));
})();
