//1 .
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>첫 번째 마이 홈피</title>
            </head>
            <body>
                <h1>첫번째 익스프레스 홈</h1>
                <nav>
                    <a href="/">홈</a>
                    <a href="/about">소개</a>
                    <a href="/contact">연락처</a>
                </nav>
                <p>익스프레스로 만든 간단한 홈피입니다!</p>
            </body>
        </html>
    `);
});

app.get("/about", (req, res) => {
  res.send(`
        <h1>소개 페이지</h1> 
        <p>이 웹 홈페이지는 익스프레스 학습을 위해 만들었어용!</p>   
    `);
});

app.get("/contact", (req, res) => {
  res.send(`
        <h1>연락처</h1> 
        <p>이메일 : return@knou.ac.kr</p>   
    `);
});

// 문제 1. 서버 시작 코드 넣어보세용. PORT == 3001
//  서버 구동후 http://localhost:3001/
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 실행중입니다!`);
});
