// todo api.js
const express = require("express");
const moment = require("mometn");
const db = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에서 실행중..`);
});
