const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("안녕하세요~ 웹서버 연습입니다.");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
