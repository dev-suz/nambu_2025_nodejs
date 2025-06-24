const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// db 연결
const sequelize = new Sequelize({
  dialect: "sqlite", //  sql 종류
  storage: "sample.db",
});

// 회원 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "users" }
);

(async () => {
  // 1. 테이블 생성
  // 개발할때는 force : true 줘도 되지만 상용서비스에서는 반드시 false 여야함.
  await sequelize.sync({ force: true });

  // 2. 입력
  let user1 = await User.create({
    username: "함선우",
    password: "nambuweb1",
    email: "nambu_seonwoo@nambu.com",
    birthDate: "1996-07-19",
  });

  let user2 = await User.create({
    username: "김가비",
    password: "nambuweb2",
    email: "gabbiJJang@nambu.com",
    birthDate: "1990-06-12",
  });

  console.log(`user1  : ${JSON.stringify(user1)}`);

  // 3.  사용자 전체 조회
  let users = await User.findAll();
  console.log(` 사용자 전체 조회 : ${JSON.stringify(users)}`);

  // 4. 사용자아이디가 2번인 사람 출력
  let get_user2 = await User.findByPk(2);
  console.log(` id가 2 번인 사람 : ${get_user2}`);

  // 5. 사용자 사용자아이디가 2번인 사람의 email을 jihooni@kakao.com 으로 바꾸고 출력해보세용.
  await User.update(
    {
      email: "jihooni@kakao.com ",
    },
    {
      where: { id: 2 },
    }
  );

  let get_updated_user2 = await User.findByPk(2);
  console.log(`user2 의 업뎃 정보 :  ${JSON.stringify(get_updated_user2)}`);

  // 4. 삭제
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const get_deleted_user2 = await User.findByPk(2);
  console.log(`삭제된 user2 : ${JSON.stringify(get_deleted_user2)}`);
})();
