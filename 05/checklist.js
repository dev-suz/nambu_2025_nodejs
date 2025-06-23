// ## 첫번째 요구사항

// 여행을 갈 경우

// - 2025년 여름 휴가 준비물 : 여권, 충전기, 세면도구 , ... 옷류 ,(점퍼 코트, 반팔티, 반바지 )

// 캠핑 준비물 :

// - 텐트, 의자 렌턴 , 침낭 ..

// -> 백엔드를 만들어보자!
// -> 테이블 설계도 -- # TB_NAME : checklist
// 아이디 PK ---> id integer primary key autoincrement
// 캠핑 준비물, 여름 휴가 준비물을 담을 수 있는 그룹핑 항목 : 카테고리 --> category text NOT NULL
// 실제 준비해야할 물건 --> item text NOT NULL
// 수량 --> amount integer default 1
// 체크 여부 --> chenckyn boolean default false

// --> RESTFUL API
// POST /checklist --> 체크리스트 입력
// GET /checklist?category=여름휴가준비물 --> query
// PUT /checklist/:id -> 체크 여부를 toggle ( 0-> 1 , 1-> 0 )
// DELETE /checklist/:id

//  category 여행준비, 여행준비 ,,  여행 준비
// sequalize

// # 모듈 임포트
const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");

const db_name = path.join(__dirname, "checklist.db");
const db = new Database(db_name);

// 항목별 2개 파서 따로 Ref  로 develop
const create_sql = `
    create table if not exists checklist(
        id integer primary key autoincrement,
        category text NOT NULL,
        item text NOT NULL,
        amount integer default 1,
        checkyn boolean default false
    );
`;

db.exec(create_sql);

const PORT = 3000;
const app = express();

app.use(express.json());

// POST /checklist --> 체크리스트 입력
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;
  const sql = `insert into checklist(category, item, amount) values(?,?,?)`;

  const stmt = db.prepare(sql);
  const result = stmt.run(category, item, amount);

  const newChecklist = db
    .prepare(`select * from checklist where id= ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newChecklist });
});

// GET /checklist?category=여름휴가준비물 --> query
app.get("/checklist", (req, res) => {
  const category = req.query.category ? req.query.category : "";
  //console.log(category);
  if (!category) {
    res.status(404).json({ message: "카테고리가 없습니다." });
  }
  const sql = `select * from checklist where category = ?`;
  const checklists = db.prepare(sql).all(category);

  res.status(200).json({ message: "ok", data: checklists });
});

// PUT /checklist/:id -> 체크 여부를 toggle ( 0-> 1 , 1-> 0 ) ?
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;

  //   const get_old_checkYN_sql = `select checkyn as oldCheckyn  from checklist where id = ?`;
  //   const old_checkyn = Boolean(
  //     db.prepare(get_old_checkYN_sql).get(id).oldCheckyn
  //   );
  //   //   console.log(`old_checkyn : ${old_checkyn} , typeof : ${typeof old_checkyn}`);

  //   const sql = `update checklist set checkyn= ? where id = ?`;
  //   const new_checkyn = Number(!old_checkyn);
  //   //   console.log(`new checkyn : ${typeof new_checkyn} , ${new_checkyn}`);
  //   const result = db.prepare(sql).run(new_checkyn, id);

  const sql_2 = `update checklist SET checkyn = CASE checkyn WHEN 1 THEN 0 ELSE 1 END where id = ? `;

  db.prepare(sql_2).run(id);
  const item = db.prepare(`select * from checklist where id = ? `).get(id);
  res.status(200).json({ message: "ok", data: item });
});
// DELETE /checklist/:id -- Re
app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;

  //   const check_id_sql = `select count(*) as count from checklist where id = ?`;
  //   const check_id = db.prepare(check_id_sql).get(id).count;
  //   if (!check_id) {
  //     res.status(404).json({ message: "삭제하고자 하는 대상이 없습니다. " });
  //   }

  const sql = `delete from checklist where id = ?`;
  const result = db.prepare(sql).run(id);
  //  변화가 없으면  바뀐게 없는 것이므로
  if (result.changes == 0) {
    res.status(404).json({ message: "삭제하고자 하는 대상이 없습니다. " });
  }

  res.status(204).end();
});

app.listen(PORT, (req, res) => {
  console.log(` http://localhost:${PORT}에서 checklist app 실행중 ...`);
});
