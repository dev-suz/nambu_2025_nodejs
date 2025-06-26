// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");
// multer Import
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
// formdata , multi part form 데이터를 받기위한 설정
app.use(express.urlencoded({ extended: true }));

// http:///localhost:/3000/downloads/aa.png  --> public/uploads/aa.png
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// multer 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 현재 파일이 있는 디렉토리의 하위로 uplodDir을 만들어주세용
  filename: function (req, file, cb) {
    // file.originalname.name : aa   (aa.png -> aa)   + - + unixTimeStamp + 확장자
    // fname : aa-1781234451.png
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, //err
      fname
    );
  },
});

const upload = multer({ storage: storage });

// route add
// 1. POST /posts 요청이 들어오면 먼저 upload.single('file') 미들웨어를 탐.
//  - 첨부파일을 uploadDir 폴더에 저장하는데 파일 이름을 변환하여 고유하게 만들어서 저장.
//  - req 객체에 첨부파일 정보를 실어서 핸들러 함수에 전달.
// 2. 우리가 만든 핸들러 함수에서 req.file 객체에서 파일 정보를 사용할 수 있다.
app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; // filename : aa-1234568.png
  filename = `/downloads/${filename}`; // http://localhost:3000/downloads/aa-1234568.png

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
    fileName: filename,
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
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  //1. 게시글 유무 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  //2. 댓글 가지고 오기
  const comment = await models.Comment.findOne({
    where: { id: commentId, postId: postId },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  //3. 댓글 수정 및 저장
  if (content) {
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: "ok", data: comment });
  }
});

// 댓글 삭제 - 바로 삭제해도 됌. 굳이 포스트 찾지 않아도!
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  //1. 게시물 존재 확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post || post < 1) {
    return res.status(404).json({ message: "post not found" });
  }

  const result = await models.Comment.destroy({
    where: { id: commentId, postId: postId },
  });

  if (result > 0) {
    res.status(204).send();
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
