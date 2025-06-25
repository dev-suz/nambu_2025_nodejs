"use strict";

// 필요한 모듈 임포트
const fs = require("fs"); // 파일시스템 모듈 - todos.js 같은 파일 읽어야 해서!
const path = require("path"); // 경로 임포트
const Sequelize = require("sequelize"); // 시퀄라이즈 임포트
const process = require("process"); // 환경변수 처리용
const basename = path.basename(__filename); // index.js 가 위치한 디렉토리 위치
const env = process.env.NODE_ENV || "development"; // 환경변수에 NODE_ENV 가 없으면 development
const config = require(__dirname + "/../config/config.json")[env]; // config/config.json
const db = {};

// 시퀄라이즈 객체 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// 파일을 읽어서 현재 index.js 디렉토리에 있는 파일을 모두 읽습니다.
// 확장자가 없거나 .js 이거나, .test.js 로 끝나는 파일이 아닌 경우는 모두 읽어서

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // 읽은 파일목록을 순회하면서  [todo.js]
    // 파일 하나씩 작업.
    // require('./todo.js')
    const model = require(path.join(__dirname, file))(
      // 인자
      sequelize,
      Sequelize.DataTypes
    );
    // db 객체에 넣어줌
    // db['Todo'] = Todo
    db[model.name] = model;
  });

// Fk 설정 - 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// // 객체, 클래스 담긴 DB  전부 export
module.exports = db;
