// .env 파일을 프로그램에상에 로드
// 하드 코딩 방지 ( 설정 관련 코드를 직접 넣어서 작성 하지 않음!)
// 반드시 ignore에 .env 넣어야함

require("dotenv").config();

console.log(`서버 포트 : ${process.env.PORT}`); //3000

//q1 DBname, DBuser, DBpassword출력
console.log(`DB 이름 : ${process.env.DB_NAME}`);
console.log(`DB USER : ${process.env.DB_USER}`);
console.log(`DB PASSWORD : ${process.env.DB_PASSWORD}`);
console.log(`API_KEY : ${process.env.API_KEY}`);
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);

// 없는 경우 || 기호로 기본값 설정!
console.log(`DB PORT : ${process.env.DB_PORT || 5432}`);

if (process.env.OPENAI_API_KEY) {
  console.error(`OPEN AI 의 API 키가 필요합니다!`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log(`개발 환경에서의 로직처리 `);
} else {
  console.log(`운영 환경에서의 로직 처리 `);
}
