const express = require("express");
const models = require("./models");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const path = require("path");
const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

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
