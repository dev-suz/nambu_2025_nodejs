const express = require("express");
const models = require("./models");

const userRouter = require("./routes/user");

const path = require("path");
const app = express();

app.use(express.json());

app.use("/users", userRouter);

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
