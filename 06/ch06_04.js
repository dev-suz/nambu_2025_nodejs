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

// 2. 게시판 모델 정의
const Post = sequelize.define(
  "Post",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: true },
    count: { type: DataTypes.INTEGER, defaultValue: 0 }, // viewCount
  },
  { tableName: "posts" }
);

// 3. 답변 게시판 추가
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);

// TB 간 관계 정의
// post 테이블에 FK 로 user가 잡힌다.

// 1(User): N(Posts)
User.hasMany(Post, {
  foreignKey: "authorId", // FK 컬럼명 지정
});

// N(Posts) : 1 (User)
Post.belongsTo(User, {
  foreignKey: "authorId", // 반드시! 동일한 FK 컬럼명 지정!
});

// User  - Comment - Post의 관계
// User - Comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Comment = Posts
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

//
(async () => {
  await sequelize.sync({ force: true });

  // Post 테이블에는 1명의 유저 ID가 있다.
  // 데이터를 만들어야 합니다.

  // 1. 사용자 정보
  const user1 = await User.create({
    username: "홍길동",
    email: "gildon@kakao.com",
    password: "12345678",
    age: 40,
  });

  const user2 = await User.create({
    username: "트럼프",
    email: "trumpet@kakao.com",
    password: "12345678",
    age: 87,
  });

  // 2. 게시글 정보
  const post1 = await Post.create({
    title: "게시글 #1 트럼프의 나이는?",
    content:
      "트럼프가 40년대생이라는 것은 가히 충격적인 일이다. 생각보다 동안인 그..",
    authorId: user2.id,
  });

  const post2 = await Post.create({
    title: "게시글 #2 저녁 메뉴",
    content: "닭볶음탕 좋습니다.",

    authorId: user2.id,
  });

  // 3. 커멘트 정보
  const comment1 = await Comment.create({
    content: "저도 먹고 싶어요",
    userId: user1.id, // FK
    postId: post2.id, // FK
  });

  const comment2 = await Comment.create({
    content: "레시피 알려주세용",
    userId: user2.id, // FK
    postId: post2.id, // FK
  });

  const comment3 = await Comment.create({
    content: "시판 양념 + 감자 + 양파 ",
    userId: user1.id, // FK
    postId: post2.id, // FK
  });

  // post조회 할때 연관 User 튜플도 긁어오도록 함 - include: [ { model : User }]
  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });

  console.log(`posts ==>  ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`users => ${JSON.stringify(users)}`);
})();
