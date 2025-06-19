// 필요한 모듈 임포트
const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// DB setting
// sqlite - 스마트폰, 조그만한 디바이스의 RDB
const db_name = path.join(__dirname, "post.db"); // 소스들어간 디렉토리 내에서
const db = new Database(db_name);

// express setting - 웹서버
const app = express();
const PORT = 3000;
app.use(express.json()); // 요청 처리 할때 json 처리

// 1. post.db 게시판 전용 테이블을 만들어야함.
// 테이블 기존재여부 확인해서 만드는 키워드 : if not exists
// Pk auto increment
const create_sql = `create table if not exists posts (
    id integer primary key autoincrement ,  
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0 
) `;
//  실행
db.exec(create_sql);

// 데이터 추가 - 단일 데이터 추가
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
        insert into posts(title, content, author) 
        values ( ?, ?, ?); 
    `;

  // 실행 시점에  ? ? ? 에 넣어서 데이터 추가
  db.prepare(sql).run(title, content, author);
  // 나중에 바뀌어야함.
  res.status(201).json({ message: "ok" });
});

// # 게시글 전체 목록 조회
app.get("/posts", (req, res) => {
  let sql = `select id
                , title
                , content
                , author
                , createdAt 
            from posts 
            order by createdAt desc`;

  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(); // 쿼리를 날려주세요
  console.log(rows);
  res.status(200).json({ data: rows });
});

// # 게시글 상세 정보 조회.
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select id
                , title
                , content
                , author
                , createdAt
            from posts
                where id = ?
    `;

  const stmt = db.prepare(sql);
  const post = stmt.get(id);
  res.status(200).json({ data: post });
});

// 게시글 수정
// http://localhost:3000/posts?key=1&value=2  -- req.query
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  let sql = `
    update posts
     set title = ? , content = ? , author = ? 
    where id =  ?
  `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, author, id); // 실제 쿼리문이 데이터 베이스에서 실행 - ? 에 넣은 순서대로 기입!
  res.redirect("/posts"); // GET http://localhost:3000/posts
  // res.status(200).json({ message: "ok" });
});

// 게시글 삭제 [re]
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  // 전체 데이터에서 id 값이 존재 여부 확인
  //  해당 id where  값으로준 sql  문 만들고 실행.
  const get_total_data_sql = `select * from posts`;
  const delete_sql = ` delete from posts where id = ${id} `;
});
// 서버 구동
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}  ..`);
});
