// # 웹서버 만들기
const http = require("http");

//  req : HTTP 요청 , res : HTTP 응답
const server = http.createServer((req, res) => {
  // 요청이 올때마다 실행되는 콜백함수
  // 헤더 정보 :  요청을 한 브라우저에게 응답으로 200번은 성공, 컨텐트 타입은 그냥 텍스트, 캐릭터셋(인코딩포맷)은 utf-8 이라고 알려줌
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  // 본문에 "안녕하세요~ " 이하의 내용을 클라이언트에게 보내준다.
  res.end("안녕하세요~ 함선우의 첫번째 웹서버에 오셨네요!");
}); // 나만의 웹서버

// # 서버 띄우기 == 서버 실행
// 포트번호
const PORT = 3000;
// 서버가  3000번 포트로 요청을 기다리고 있다.
server.listen(PORT, () => {
  console.log(`나만의 웹서버가 http://localhost:${PORT}  에서 실행 중입니다 .`);
});

// 한 프로그램에서는 포트번호를 중복해서 사용 불가.
// 점유할 경우 에러 뱉음
//
// node:events:496
//       throw er; // Unhandled 'error' event
//       ^

// Error: listen EADDRINUSE: address already in use :::3000
//     at Server.setupListenHandle [as _listen2] (node:net:1939:16)
//     at listenInCluster (node:net:1996:12)
//     at Server.listen (node:net:2101:7)
//     at Object.<anonymous> (/Users/suz/tutorial/02/ch02_03.js:17:8)
//     at Module._compile (node:internal/modules/cjs/loader:1730:14)
//     at Object..js (node:internal/modules/cjs/loader:1895:10)
//     at Module.load (node:internal/modules/cjs/loader:1465:32)
//     at Function._load (node:internal/modules/cjs/loader:1282:12)
//     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
//     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
// Emitted 'error' event on Server instance at:
//     at emitErrorNT (node:net:1975:8)
//     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
//   code: 'EADDRINUSE',
//   errno: -48,
//   syscall: 'listen',
//   address: '::',
//   port: 3000
// }
