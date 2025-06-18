//1. express 모듈 가져오기
const express = require("express");

//2. express application 설정
const app = express();

//3. 포트 설정
// express 기본 3000번 사용
const PORT = 3000;

//4. 라우팅 설정
//  app. get("uri", 첫번쨰 인자로 넘긴 경로로 들어왔을때 콜백 )
// app.get : GET 요청을 처리하는데 http://localhost:3000/ 로 들어왔을 때 .
app.get("/", (req, res) => {
  //req - http 요청, res - http 응답
  res.send("hello world!");
});

// http://localhost:3000/hello 를 GET 요청으로 들어왔을때 처리
app.get("/hello", (req, res) => {
  res.send("안녕! /hello 주소에 접근하셨습니다. ");
});

// q1. http://localhost:3000/world 를 GET 요청으로 들어왔을때  "안녕! /world 주소에 접근하셨네요!" 출력
app.get("/world", (req, res) => {
  res.send("안녕! /world 주소에 접근하셨네요!");
});

// app.get("/world/paradise", (req, res) => {
//   res.send("안녕! /world/paradise 주소에 접근하셨네요!");
// });

// app.get
// app.post

//5. 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}  에서 실행중입니다..!`);
});
