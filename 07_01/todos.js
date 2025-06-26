// // express + sequelize CRUD 를 제공하는 서버가 이 파일에 작성될 것임.
// // todos RESTful api 서버 관련 내용이 작성 . 될것입니다.

// // 관련 모듈 임포트
// const express = require("express");
// const models = require("./models");
// // rerquire('./models/index.js');
// // models 에는 index.js 맨 하단에 있는 Db 변수가 할당됩니다.
// const app = express();
// const PORT = 3000;

// // 미들웨어  - 라우터 상관없이 공통 사용 모듈 ( 로깅 모듈로 학습할 것임)
// app.use(express.json());

// // POST : todo 목록 입력  /todos
// app.post("/todos", async (req, res) => {
//   const { task, description } = req.body;
//   const todo = await models.Todo.create({
//     task: task,
//     description: description,
//   });
//   res.status(201).json({ message: "ok", data: todo });
// });

// // GET : todo 목록 조회 /todos
// app.get("/todos", async (req, res) => {
//   const todos = await models.Todo.findAll();
//   res.status(200).json({ message: "ok", data: todos });
// });

// // GET : todo 1건 조회 /todos/:id
// app.get("/todos/:id", async (req, res) => {
//   const id = req.params.id;

//   const todo = await models.Todo.findByPk(id);
//   if (todo) {
//     res.status(200).json({ message: "ok", data: todo });
//   } else {
//     res.status(404).json({ message: "할일을 찾을 수 없습니다. " });
//   }
// });

// // PUT : todo 업데이트(id) /todos/:id
// app.put("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const { task, description, completed, priority } = req.body;
//   // 기존재 유무 확인
//   const todo = await models.Todo.findByPk(id);
//   // 바디에 넣어준 필드들이 있는지에 따라 수행
//   if (todo) {
//     if (task) todo.task = task;
//     if (description) todo.description = description;
//     if (completed) todo.completed = completed;
//     if (priority) todo.priority = priority;
//     await todo.save(); // 저장
//     res.status(200).json({ message: "ok", data: todo });
//   } else {
//     res.status(404).json({ message: "수정할 할 일이 없습니다. " });
//   }
// });

// // DEELETE : todo 삭제(id) /todos/:id
// app.delete("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const result = await models.Todo.destroy({
//     where: { id: id },
//   });
//   console.log(result); // 숫자이고 지운 행의 갯수
//   if (result > 0) {
//     res.status(200).json({ message: "삭제가 성공했어요" });
//   } else {
//     res.status(404).json({ message: "할일이 없어요~" });
//   }
// });

// app.listen(PORT, () => {
//   // 실행 로그
//   console.log(` todo 서버가 http://localhost:${PORT} 에서 실행중~ `);

//   // 모델 생성
//   models.sequelize
//     .sync({ force: false })
//     .then(() => {
//       console.log("db connected !");
//     })
//     .catch(() => {
//       console.log("db error");
//       process.exit();
//     });
// });
