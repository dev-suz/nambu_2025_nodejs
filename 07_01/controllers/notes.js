const models = require("../models");

// 핸들러 함수
// 모델에서 데이터를 조회하거나 수정, 추가 , 삭제 전문하는 함수만 모아 놓음.

exports.createNote = async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "ok", data: note });
};

exports.getAllNotes = async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(200).json({ message: "ok", data: notes });
};

// 태그로 노트 목록 조회
exports.getNotes = async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({ where: { tag: tag } });
  //   console.log(notes);
  if (notes) {
    res.status(200).json({ message: "ok", data: notes });
  } else {
    res.status(404).json({ message: "찾으시는 메모가 없습니다." });
  }
};

exports.updateNote = async (req, res) => {
  const id = req.params.id;
  // updated?
  const { title, content, tag } = req.body;

  const note = await models.Note.findByPk(id);

  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;
    await note.save();
    res.status(200).json({ message: "ok", data: note });
  } else {
    res.status(404).json({ message: "수정하고자하는 메모가 없습니다. " });
  }
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({
    where: { id: id },
  });

  if (result > 0) {
    res.status(200).json({ message: "삭제 성공했습니다. " }); // 204  주고 아무것도 안줘도 됌!
  } else {
    res.status(404).json({ message: "삭제에 실패했습니다. " });
  }
};
