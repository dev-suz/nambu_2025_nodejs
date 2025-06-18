// npm i winston
// https://www.npmjs.com/package/winston
// winston 사용

const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // 로깅 레벨(info 이상의 로깅레벨만 출력)
  format: winston.format.simple(), // 간단한 텍스트 형식
  transports: [
    new winston.transports.Console(), // 콘솔로 출력
    new winston.transports.File({
      filename: "app.log", // 콘솔 찍힌 파일 설정 정보
    }),
  ],
});

console.log(" ------ 로그 레벨 -------------");
// 에러 > 경고 > 정보성 > 디버깅용  > 다 찍어줌
// 운영환경에서는 - error or info 정도로 함.
console.log("로그 레벨 : error > warn > info > debug > verbose");

logger.info("정보(info) - 일반적인 정보메시지를 출력할 때는 info를 쓰세요.");
logger.error("에러(error) - 에러가 발생했을 때 사용하세요.");
logger.warn("경고(warn) -  주의가 필요한 메시지 일 때만 쓰세요.");
logger.debug("디버그(debug) - 개발 중에만 사용하세요.");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // 시간을 추가
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    }) // 로그 포맷을 바꿈.
  ),
  transports: [new winston.transports.Console()],
});

simpleLogger.info("타임 스탬프가 포함된 로그");
