// 필요한 모듈 임포트
const express = require("express"); //  express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlit3 모듈 임포트  - sqlite는 안드로이드 계열 Or 소용량 기기에들어가는 DB
const path = require("path"); // 경로 모듈 임포트

// DB setting
// sqlite - 스마트폰, 조그만한 디바이스의 RDB
const db_name = path.join(__dirname, "post.db"); // sqlite용 db File     소스들어간 디렉토리 내에서
const db = new Database(db_name); // db-sqlite3의 db 를 생성(with DB file)

// express setting - 웹서버
const app = express(); // app 이란 변수에 express 함수를 담음. app 변수를 이용해서 express 기능 사용.
const PORT = 3000; // PORT설정

// # app.use() : 미들 웨어 설정
app.use(express.json()); // - 모든 요청과 응답에 json 포맷으로 처리

// 1. post.db 게시판 전용 테이블을 만들어야함.
// 테이블 기존재여부 확인해서 만드는 키워드 : if not exists
// Pk auto increment
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement ,  
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0 
    );

    create table if not exists comments(
      id integer primary key autoincrement,
      content text,
      author text,
      createdAt datetime defulat current_timestamp,
      postId integer , 
      foreign key(postId) references posts(id) on delete cascade 
    );
`;
//  exec(sql) -  sql 실행
db.exec(create_sql);

// app.post : POST 요청 처리 .    http://my-url/posts POST -> 두번째 인자의 핸들러 함수 실행.
// 데이터 추가 - 단일 데이터 추가
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body; // 요청 본문에서 title, content, author 를 꺼냄 : json format
  let sql = `
        insert into posts(title, content, author) 
        values ( ?, ?, ?); 
    `; // insert 쿼리문을 만들어준다.

  // 실행 시점에  ? ? ? 에 넣어서 데이터 추가
  const stmt = db.prepare(sql); // 문자열 sql 을 실제 쿼리문으로 파싱해서 statment 객체로 만듬. --> 재활용성 극대화
  stmt.run(title, content, author);

  // # bettter-sql3 사용법
  // stmt.run : UPDATE, INSERT, DELETE
  // stmt.all : SELECT * from TB, SELECT * FROM TB WHERE =  ?  ---> [] array로 값을 반환 (하나만 있어도!)
  // stmt.get : SELECT * FROM TB LIMIT 1 --> 객체로 값을 반환

  // 나중에 바뀌어야함.
  res.status(201).json({ message: "ok" });
});

// # 게시글 전체 목록 조회 http://localhost:3000/posts?page=1 GET
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `select id
                , title
                , author
                , createdAt
                , count 
            from posts 
            order by createdAt desc limit ? offset ? `;

  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(limit, offset); // 쿼리를 실행하고 결과는 [] 로 반환해주세요.
  console.log(rows);
  res.status(200).json({ message: "ok", data: rows }); // JSON.stringify({data : rows}); -- 객체를 JSON 문자열로 반환  : res.json()
});

// # 게시글 상세 정보 조회. http://localhost:3000/2 GET
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select id
                , title
                , content
                , author
                , createdAt
                , count
            from posts
                where id = ?
    `;
  // 조회수 증가
  let ac_sql = `update posts
              set count = count + 1
              where id = ? 
  `;
  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql);
  const post = stmt.get(id); // 게시글 객체 반환.
  res.status(200).json({ data: post }); // json 문자열로 리턴
});

// # 조회수 증가 - ??
// app.put("/post/:id", (req, res) => {
//   const id = req.params.id;
//   let ac_sql = `update
//               set count = count + 1
//               where id = ?
//   `;
//   const stmt = db.prepare(sql);
//   stmt.run(id);
//   res.status(200).json({ message: "ok" });
// });

// 게시글 수정 ( 수정할 게시글 ID --> from req.params , 수정할 내용 { title, content} --> from  req.body )
// http://localhost:3000/posts?key=1&value=2  -- req.query
app.put("/posts/:id", (req, res) => {
  const id = req.params.id; // 수정할 게시글을 파람에서 가지고 오세요
  const { title, content } = req.body; // 수정할 게시글 본문에서 가져오세요.
  let sql = `
    update posts
     set title = ? , content = ? 
    where id =  ?
  `; //쿼리문 만들고.
  const stmt = db.prepare(sql); // Stmt에 쿼리문 파싱해서 준비시키고
  stmt.run(title, content, id); // 실제 쿼리문이 데이터 베이스에서 실행 - ? 에 넣은 순서대로 기입 해서 SQL 실행 . ( 순서 및 인자갯수 틀리면 안됌!)
  //res.redirect("/posts"); // GET http://localhost:3000/posts
  res.status(200).json({ message: "ok" });
});

// 게시글 삭제
// http://localhost:3000/posts/2  DELETE
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // 게시글 아이디 가져오고
  let sql = `DELETE from posts where id = ? `; // 쿼리문을 만들어서
  const stmt = db.prepare(sql); // 쿼리문을 준비시키고
  stmt.run(id); // 쿼리문 실행
  res.json({ message: "ok" }); //결과로 응답을 줍니다.
});

// 서버 구동
// npx nodemon api.js
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}  ..`);
});
