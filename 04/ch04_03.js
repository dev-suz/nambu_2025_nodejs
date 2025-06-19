const express = require("express");
const app = express();
const PORT = 3000;

// sampleData
const books = [
  { id: 1, title: "Node.js교과서", author: "이지훈" },
  { id: 2, title: "한눈에 보는 Node.js", author: "이지훈" },
  { id: 3, title: "Node.js 디자인 패턴", author: "이지훈" },
];

// # 미들웨어 : 응답과 요청시에 JSON을 처리 담당
app.use(express.json());

// http://localhost:3000/books
app.get("/books", (req, res) => {
  res.json(books);
});

// https://localhost:3000/books/1
// https://localhost:3000/books/2 ...
app.get("/books/:id", (req, res) => {
  // req.params. : 로 명시한 단어
  const id = req.params.id; // 문자열
  const book = books.find((b) => b.id === parseInt(id)); // 타입까지 확인
  if (!book) {
    //  응답값에 상태값 지정.json으로 본문내용
    return res.status(404).json({ message: "책을 찾을 수 없어용!" });
  }
  return res.json(book); // status df : 200  - OK
});

// # 책 추가
app.post("/books", (req, res) => {
  // 받을 대상 형태 구조분해 = 바디에 태워보낸 거에서 추출
  const { title, author } = req.body; // 요청 본문에서 title, author 추출
  // 개별 대상 정의대로 만들어주고~
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  // 전체 데이터에 추가
  books.push(book); // 배열의 마지막에 book 객체 추가
  // 완료된 상태 코드와 함께 보내주기
  res.status(201).json(book); // 201 - created
});

// http://localhost:3000/books/id
// # 수정
app.put("/books/:id", (req, res) => {
  // 요청받은 아이디 값 id로 설정
  const id = req.params.id;
  // 요청 보낸 내용 바디에서 꺼내서 구조분해 할당
  const { title, author } = req.body;
  // 책 목록 돌아가면서 책의 아이디를 가진 책 찾아서 book에 설정
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "책을 찾을 수 없어용!" });
  }
  // 책 있으면 속성 수정
  book.title = title;
  book.author = author;
  // 수정된 내용 반영
  res.json(book);
});

// # 책 삭제
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;

  // 나중에 아래 두줄은 db 쿼리로 대체 됌
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "책을 찾을 수 없어용!" });
  }
  // 지울 인덱스에서 1개
  books.splice(index, 1);
  res.status(204).send(); // 204 :  No content - 요청은 성공했지만 네게 줄 컨텐츠는 없어 !
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다..!`);
});
