// const express = require("express");
// const models = require("./models");

// const app = express();
// const PORT = 3000;

// app.use(express.json()); // destructure Error 남 안하면.

// // POST /notes : 노트 입력
// app.post("/notes", async (req, res) => {
//   const { title, content, tag } = req.body;
//   const note = await models.Note.create({
//     title: title,
//     content: content,
//     tag: tag,
//   });
//   res.status(201).json({ message: "ok", data: note });
// });

// // GET  /notes : 노트 목록조회
// app.get("/notes", async (req, res) => {
//   const notes = await models.Note.findAll();
//   res.status(200).json({ message: "ok", data: notes });
// });

// // GET  /notes/:tag : 태그로 노트 목록 조회
// app.get("/notes/:tag", async (req, res) => {
//   const tag = req.params.tag;
//   const notes = await models.Note.findAll({ where: { tag: tag } });
//   //   console.log(notes);
//   if (notes) {
//     res.status(200).json({ message: "ok", data: notes });
//   } else {
//     res.status(404).json({ message: "찾으시는 메모가 없습니다." });
//   }
// });

// // PUT  /notes/:id : id 로 노트 수정
// app.put("/notes/:id", async (req, res) => {
//   const id = req.params.id;
//   // updated?
//   const { title, content, tag } = req.body;

//   const note = await models.Note.findByPk(id);

//   if (note) {
//     if (title) note.title = title;
//     if (content) note.content = content;
//     if (tag) note.tag = tag;
//     await note.save();
//     res.status(200).json({ message: "ok", data: note });
//   } else {
//     res.status(404).json({ message: "수정하고자하는 메모가 없습니다. " });
//   }
// });

// // DELETE /notes/:id :id 로 노트 삭제
// app.delete("/notes/:id", async (req, res) => {
//   const id = req.params.id;
//   const result = await models.Note.destroy({
//     where: { id: id },
//   });

//   if (result > 0) {
//     res.status(200).json({ message: "삭제 성공했습니다. " }); // 204  주고 아무것도 안줘도 됌!
//   } else {
//     res.status(404).json({ message: "삭제에 실패했습니다. " });
//   }
// });

// app.listen(PORT, () => {
//   console.log(` notes 서버 실행중 -- http://localhost:${PORT}  `);

//   models.sequelize
//     .sync({ force: false })
//     .then(() => {
//       console.log("DB connected!");
//     })
//     .catch(() => {
//       console.error("DB connecting error");
//       process.exit();
//     });
// });
