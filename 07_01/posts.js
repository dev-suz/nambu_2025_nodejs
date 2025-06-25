// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");

const app = express();
const PORT = 3000;

app.use(express.json());

// route add
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  // 원래는 JWT 토큰에서 사용자 ID 를 받아와서 넣어줘야하지만 아직 배우지 않아서
  // 사용자를 생성하고 그다음에 게시글을 넣겠습니다!

  let user = await models.User.findOne({
    where: { email: "example@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "함선우",
      email: "example@example.com",
      password: "12345678",
    });
  }
  // console.log(JSON.stringify(user));
  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
  });

  res.status(201).json({ message: "ok", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});

// 게시글 한건 조회
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
});

// 게시글 수정
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);

  if (post) {
    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found " });
  }
});
// 게시글 삭제
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });

  if (result > 0) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(404).json({ messsage: "post not found" });
  }
});

// 댓글
// 사용자 추가
app.post("/posts/:postId/comment", async (req, res) => {
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "뉴진스",
      email: "b@example.com",
      password: "12345678",
    });
  }

  const postId = req.params.postId;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);

  if (!post) {
    res.status(404).json({ message: "post not found" });
  }
  //
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
});

// 댓글 목록 가져오기
app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  // 포스트 있나 확인
  // Re 추가
  // 전체 조회
  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [
      ["createdAt", "DESC"],
      ["content", "DESC"],
    ],
  });
  res.status(200).json({ message: "ok", data: comments });
});

// 댓글 수정
app.put("/posts/:postId/comments/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const { content } = req.body;

  const comment = await models.Comment.findByPk(commentId);
  if (comment) {
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: "ok", data: comment });
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

// 댓글 삭제
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  const result = await models.Comment.destroy({ where: { id: commentId } });
  if (result > 0) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

// route add end

app.listen(PORT, () => {
  console.log(` notes 서버 실행중 -- http://localhost:${PORT}  `);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected!");
    })
    .catch(() => {
      console.error("DB connecting error");
      process.exit();
    });
});
