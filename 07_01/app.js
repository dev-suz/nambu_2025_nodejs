const express = require("express");
const models = require("./models");

const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");

const path = require("path");
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// 미들웨어가 작성된 순차적으로 처리됨!
app.use("/notes", noteRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);

// 404 처리용 - 모든라우터 최하단에 ( )
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스는 찾을 수 없어요!",
  });
});

// 500 의 경우에도 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack); // err.stacktrace
  res.status(500).json({
    status: "Error",
    message: `server err : ${err.stack} -- 디버깅용(나중에 바꾸자)`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` http://localhost${PORT}에서 실행중 ..`);
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
