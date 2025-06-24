// 문제 todos

// 할일 : task
// 할일 설명 :description
// 완료 여부 : completed
// 우선순위 : priority

const { Sequelize, Model, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});
// 문제1 : Todo 모델 생성, todos 생성
const Todo = sequelize.define(
  "Todo",
  {
    task: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { tableName: "todos" }
);

(async () => {
  await sequelize.sync({ force: true });
  // 문제 2. Todo 데이터를 2개 입력
  const todo1 = await Todo.create({
    task: "할일 #1",
    content: "기상 후 하루 계획",
    completed: true,
  });

  const todo2 = await Todo.create({
    task: "할일 #2",
    content: "ts 학습",
    priority: "2",
  });

  // 문제3. Todo 데이터를 전체 조회
  const todos = await Todo.findAll();
  console.log(` Todo 데이터 전체 조회 => ${JSON.stringify(todos)}`);

  // 문제4 . Todo 아이디가 2번인 항목조회
  const get_todo2 = await Todo.findByPk(2);
  console.log(`아이디가 2번인 todo => ${JSON.stringify(get_todo2)}`);

  // 문제5. Todo 아이디가 2번인 항목의 completed 를 완료로 변경
  await Todo.update({ completed: true }, { where: { id: 2 } });
  const updated_todo2 = await Todo.findByPk(2);
  console.log(` 변경된  todo 2 : ${JSON.stringify(updated_todo2)}`);

  // 문제6. Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: { id: 2 },
  });
  let deleted_todo2 = await Todo.findByPk(2);
  console.log(` 삭제된 2번 : ${JSON.stringify(deleted_todo2)}`);
})();
