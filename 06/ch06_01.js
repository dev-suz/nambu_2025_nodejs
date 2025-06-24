// sequelize 학습
// moduel Import
const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// db 연결
const sequelize = new Sequelize({
  dialect: "sqlite", //  sql 종류
  storage: "sample.db",
});

// 모델 생성
// create table posts ( title Text, content Text, author Text )
const Post = sequelize.define(
  "Post", // Model Name
  {
    //  fields
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" } // TB명
);

// 즉시 실행함수 - express 안쓰고 콘솔에서 바로 돌리려고 사용.
// Sequelize 에서는 Promise를 이용해서 작업하는데, 우리는 Async-await 를 이용해서 Promise 작업을 하기 위해서 즉시 실행함수 안에서 코드 작성함.
(async () => {
  await sequelize.sync({ force: false }); //  force : true 는  매번 생성됨 ( 테이블이 기존에 있으면 drop 후 생성)

  const post1 = await Post.create({
    title: "오늘은 비가 온데요",
    content: "퇴근 시간 부터 온다고합니다. 저녁에 오길!",
    author: "함선우",
  });

  const post2 = await Post.create({
    title: "오늘 저녁은 뭐먹지 ",
    content: "떡볶이와 순대",
    author: "함선우",
  });

  //   console.log(`post2 created => ${JSON.stringify(post2)}`);

  // select * from posts
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);

  // PK 이용해서 가져오기
  // select * from posts where id = 1 ;
  const get_post1 = await Post.findByPk(1);
  console.log(` post1 => ${JSON.stringify(get_post1)}`);

  // select * from posts where id = 1  LIMIT 1 ; - 제일 첫번째것으로 가져옴
  const get_post2 = await Post.findOne({
    where: {
      author: "함선우",
    },
  });
  console.log(`post2 => ${JSON.stringify(get_post2)}`);

  // Model.update( ar1 : {바꿀 내용} , ar2 : {조건})
  await Post.update(
    {
      title: "이번주는 ORM을 공부하는 중입니다!",
      content: "이번주는 ORM 마스터가 되도록 지겹도록 공부할 것입니다!",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  // await 없으면 {} 로만 됌. await 주의!
  const get_updated_post1 = await Post.findByPk(1);
  console.log(` 수정된 post1 : ${JSON.stringify(get_updated_post1)}`);

  // 삭제 Model.destroy()
  // DELETE FROM `posts` WHERE `id` = 1
  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const get_deleted_post1 = await Post.findByPk(1);
  console.log(` 삭제된 post 1 : ${JSON.stringify(get_deleted_post1)}`); // 삭제된 post 1 : null

  // LIKE 검색 - 나중에는 IN ~ 등 찾아서 학습하도록!
})();
