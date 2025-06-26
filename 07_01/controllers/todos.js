const models = require("../models");

const createTodo = async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
};

const getTodos = async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "ok", data: todos });
};

const getTodoDetail = async (req, res) => {
  const id = req.params.id;

  const todo = await models.Todo.findByPk(id);
  if (todo) {
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "할일을 찾을 수 없습니다. " });
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  // 기존재 유무 확인
  const todo = await models.Todo.findByPk(id);
  // 바디에 넣어준 필드들이 있는지에 따라 수행
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;
    await todo.save(); // 저장
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "수정할 할 일이 없습니다. " });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({
    where: { id: id },
  });
  console.log(result); // 숫자이고 지운 행의 갯수
  if (result > 0) {
    res.status(200).json({ message: "삭제가 성공했어요" });
  } else {
    res.status(404).json({ message: "할일이 없어요~" });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoDetail,
  updateTodo,
  deleteTodo,
};
