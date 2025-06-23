const express = require("express");
const path = require("path");
const moment = require("moment");
const Dataabase = require("better-sqlite3");

const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;

app.use(express.json());

const create_sql = `
    create table if not exists dotos (
        id integer primary key autoincrement,
        task varchar(255),
        description text,
        completed boolean default 0,
        createdAt datetime default current_timestamp,
        priority integer default 1
    );
`;

db.exec(create_sql);

app.post("/todos", (req, res) => {
  const { task, description, prirority } = req.body;
  let sql = `insert into todos(task, description )`;
});
