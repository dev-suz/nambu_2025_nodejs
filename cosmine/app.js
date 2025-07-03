const express = require("express");
const models = require("./models");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const itemRouter = require("./routes/item");

const path = require("path");
const app = express();
const { logger, logging } = require("./middlewares/logger");

app.use(logging);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
const uploadDir = path.join(__dirname, "public", "uploads");
app.use("/downloads", express.static(uploadDir));

//스웨거 설정
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/items", itemRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스를 찾을 수 없습니다.",
  });
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: "Error",
//     message: `server error : ${err.stack}`,
//   });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` http://localhost${PORT}에서 실행중 ..`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => {
      console.error("DB connecting error", err);
      process.exit();
    });
});
