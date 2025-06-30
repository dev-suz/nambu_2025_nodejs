const express = require("express");
const models = require("./models");

const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { logger, logging } = require("./middlewares/logger");

const path = require("path");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// 미들웨어 설정
app.use(logging); // 로깅 미들웨어 - 가급적 미들웨어의 상위 순위에 등록 권장.  로그를 찍어줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));
// 스웨거 설정
// swagger.yaml 파일에서 문서 로딩
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
// http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 미들웨어가 작성된 순차적으로 처리됨!
app.use("/notes", noteRouter);
app.use("/posts", postRouter);
app.use("/todos", todoRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// 404 처리용 - 모든라우터 최하단에 ( )
// app.use((req, res) => {
//   res.status(404).json({
//     status: "Fail",
//     message: "요청한 리소스는 찾을 수 없어요!",
//   });
// });

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
    .sync({ force: true })
    .then(() => {
      console.log("DB connected!");
    })
    .catch(() => {
      console.error("DB connecting error");
      process.exit();
    });
});
