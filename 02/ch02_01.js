// 파일 다루기 : fs 모듈 이용
// commonJS -  require() :  모듈 가져올때 사용하는 함수
const fs = require("fs"); // fs 모듈(파일 다루기 모듈 임포트)

// # 파일 만들고 쓰기
// writeFileSync('파일명.확장자','내용') - line by line
// 한글 안깨짐.
// fs.writeFileSync("test.txt", "hello World!");
// console.log("파일 쓰기 완료!");

//q1 hello.txt.만들고 내용에는 안녕하세요 반갑습니다. 제 이름은 함선우입니다. 작성
// fs.writeFileSync(
//   "hello.txt",
//   "안녕하세요. 반갑습니다.제 이름은 함선우입니다. "
// );
// console.log("완!");

// # 파일 읽기
// readFileSync('파일명','인코딩')
const data = fs.readFileSync("test.txt", "utf-8"); // utf-8인코딩, euc-kr
console.log(data); //<Buffer 68 65 6c 6c 6f 20 57 6f 72 6c 64 21> utf-8없으면 버퍼뜸.

// ASCII CODE : 41 a, 42 b
// euc-kr 로 만들다가
// 공통 인코딩 포맷을 만듬 : utf-8 ( 언어별 인코딩 불필요 )

// q2. hello.txt 읽어서 콘솔 출력
// 만약 helllo.txt 가 1GB 의 크기를 지닌 파일이라면 다음 작업들은 실행이 안되고 홀딩됨.
// const content = fs.readFileSync("hello.txt", "utf-8");
// console.log(content);

// q3
// const stats1 = fs.statSync("test.txt");
// console.log(stats1);
// 파일 사이즈 : byte, birthtimeMs : unix time stamp

// # 비동기식 파일처리
// LIBuv에게 작업을 맡겨야함
// ('파일', '내용', '작업후 처리할 내용담은 콜백')
// fs.writeFile("async-test.txt", "Async hello world!", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 쓰기 완료!");
// });

// q3. async-hello.txt , '안녕하세요 비동기 파일 쓰기 테스트 작업입니다.'
// fs.writeFile(
//   "async-hello.txt",
//   "안녕하세요 비동기 파일 쓰기 테스트 작업입니다.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("async-hello.txt 파일 작업 완");
//   }
// );

// # 비동기 파일 읽기! 콜백에 인자 (err, data)
// 메인스레드에 영향을 주지않게 읽기 가능 - 큰파일 읽을때 사용 추천
// fs.readFile("async-test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(`읽기 에러 : ${err}`);
//   }
//   console.log(`비동기 파일 읽기 : ${data}`);
// });

//  q4
// fs.readFile("async-hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(`읽기 에러 : ${err}`);
//   }
//   console.log(`비동기 파일 읽기 : ${data}`);
// });

// 콜백 지옥 탈출. 직관적 이해 가능하도록 코드 작성 .
// promise
// promises
const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    await fsPromise.writeFile(
      "promise-test.txt",
      "프로미스 이용. Promise Hello World!"
    );
    console.log("파일쓰기 완료");

    const data = await fsPromise.readFile("promise-test.txt", "utf-8");
    console.log(`파일 읽기 : ${data}`);
  } catch (error) {
    console.log(error);
  }
};

fileOp();

// q5
// fileOp2() 함수 만들고, Promise방식으로 'promise-hello.txt'
// '안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고있어요.'라고 쓰고
// promise-hello.txt 를 utf-8방식으로 읽고 콘솔 출력

const fsPromises2 = require("fs").promises;

const fileOp2 = async () => {
  try {
    await fsPromises2.writeFile(
      "promise-hello.txt",
      "안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고있어요."
    );

    const data = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
fileOp2();

// ES6 : import fs from 'fs'
