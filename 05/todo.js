const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");

// 확장자 유의하자!
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;

app.use(express.json()); // 요청과 응답에 json 파싱

const create_sql = `
  create table if not exists todos (
    id integer primary key autoincrement ,
    task varchar(255),
    description text,
    completed boolean default 0,
    createdAt datetime default current_timestamp,
    priority integer default 1 
  );
`;

db.exec(create_sql);

// q1. 할일 쓰기 - POST  http://localhost:3000/todos
app.post("/todos", (req, res) => {
  const { task, description, priority } = req.body;
  let sql = `insert into todos(task, description, priority ) values (? , ?, ? )`;
  const stmt = db.prepare(sql);
  stmt.run(task, description, priority);
  res.status(201).json({ message: "ok" });
});

// q2. 할일 목록 조회 - GET http://localhost:3000/todos
app.get("/todos", (req, res) => {
  let sql = `
            select id
                  ,task
                  ,description
                  ,completed 
                  ,createdAt
                  ,priority
            from todos
            order by createdAt desc, priority desc
          `;

  const stmt = db.prepare(sql);
  rows = stmt.all();
  // tip 메세지 가급적 통일.
  res.status(200).json({ message: "ok", data: rows });
});

// q3. 할일 한건 조회 -  GET http://localhost:3000/todos/:id
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    select task
        ,description
        ,completed
        ,createdAt
        ,priority
    from todos
        where id = ?
  `;

  const stmt = db.prepare(sql);
  const todo = stmt.get(id);
  res.status(200).json({ message: "ok", data: todo });
});

// q4. 할일 수정 (할일 자체 수정) - PUT http://localhost:3000/todos/:id
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const now = moment().format("YYYY-MM-DD");
  const { task, description, priority, completed } = req.body;
  let sql = `
    update todos 
    set task = ? , description = ?, createdAt = ? ,priority =?  ,completed = ?
    where id = ? 
  `;
  const stmt = db.prepare(sql);
  stmt.run(task, description, now, priority, completed, id);
  res.json({ message: "ok" });
  // 나중에는 에러 처리 해야함 [re]
  // task, description 만 수정 - 수업 .
});

// q5. 할일 삭제 -  DELETE http://localhost:3000/todos
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    delete 
    from todos
    where id = ?
  `;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json(200).json({ message: "ok" });
});

// 서버 시작 npx nodemon todo.js
app.listen(PORT, () => {
  console.log(` http://localhost:${PORT} 에서 실행중..`);
});
