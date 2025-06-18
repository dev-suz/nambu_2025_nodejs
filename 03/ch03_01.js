// require(경로)
// CommonJs 모듈 임포트 방식
const math = require("./modules/math");

console.log(`math.add(5,3) => ${math.add(5, 3)} `);
console.log(`math.substract(10,4) => ${math.substract(10, 4)}`);

// ! 실행시 해당 디렉토리가서 실행하자~
