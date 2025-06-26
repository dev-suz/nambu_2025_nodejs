// 인자 2개 받음 ( 생성 하고 받았던 것 seq)
// 마지막에 모델 리턴해야함

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      task: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
      priority: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    { tableName: "todos" }
  );
  return Todo;
};
