const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// db setting
const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;

// middleware - 전체 엔드포인트에 특정기능을 일괄적용 -  지금은 Json 파싱
app.use(express.json());

// date ==> YYYY.MM.DD  ex. 2025.06.23
const create_sql = `
    create table if not exists expenses (
        id integer primary key autoincrement,
        title text not null,
        amount integer not null,
        date text not null, 
        memo text 
    )
`;

db.exec(create_sql);

// 입력값 검증 함수
function validateExpense(body) {
  if (!body.title || typeof body.amount !== "number" || !body.date) {
    return false;
  }
  return true;
}

// 1. 가계부 입력 POST /expenses
app.post("/expenses", (req, res) => {
  try {
    const { title, amount, date, memo } = req.body;
    if (!validateExpense(req.body)) {
      return res.status(400).json({ message: "필수값 누락 또는 자료형 오류 " });
    }
    let sql = `
        insert into expenses(title, amount , date, memo )
        values (? ,? , ? , ?)
      `;
    const stmt = db.prepare(sql);
    stmt.run(title, amount, date, memo);

    res.status(201).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});

// 2. 가계부 전체 목록 조회 GET /expenses
app.get("/expenses", (req, res) => {
  let sql = ` select * from expenses order by date desc , id asc`;

  const stmt = db.prepare(sql);
  items = stmt.all();
  res.status(200).json({ message: "ok", data: items });
});

// 3. 가계부 목록 조회 (날짜)  GET /expense/2025-06-23:date  --> 해당 날짜의 내용 가져오기
app.get("/expenses/:date", (req, res) => {
  const date = req.params.date;
  // console.log(date);
  let sql = `select * from expenses where date = ?`;
  const stmt = db.prepare(sql);
  const items = stmt.all(date);

  res.status(200).json({ message: "ok", data: items });
});

// 4. 가계부 수정 PUT /expenses/12:id --> 금액수정, 항목 등 수정
// [re ] 예외 처리
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;

  // 해당 id의 expense 가 존재하는 지 확인
  const checkSql = `select id from expenses where id =? `;
  const checkStmt = db.prepare(checkSql);
  const exists = checkStmt.get(id);
  if (!exists) {
    return res
      .status(404)
      .json({ message: "해당 가계부 항목이 존재하지 않습니다. " });
  }

  const { title, amount, date, memo } = req.body;

  // 수정 대상에 따른 개별 처리 가능 - 나중에 추가 예정.
  let sql = `update expenses set title = ? , amount = ? , date = ? , memo =?
    where id = ? `;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, date, memo, id);
  res.json({ message: "ok" });
});

// 5. 가계부 삭제 DELETE /expenses/12:id --> 해당 가계부 항목 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from expenses where id = ?`;

  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json(200).json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(` http://locaclhost:${PORT} 에서 실행중..`);
});
