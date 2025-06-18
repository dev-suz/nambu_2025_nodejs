const moment = require("moment");
import isStrongPassword from "./node_modules/validator/es/lib/isStrongPassword";

const nowDate = moment(); // 현재 시간을 가져옵니다.

console.log(nowDate); //Moment<2025-06-18T12:11:39+09:00>
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss")); // 2025-06-18 12:15:06
console.log(nowDate.format("YYYY년 MM월 DD일")); // 2025년 06월 18일
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초")); // 2025년 06월 18일 12시 16분 26초

//q1. 현재 날짜 + 시각을 2025/06/18 형태로 출력
console.log("===== q1 ======");
console.log(nowDate.format("YYYY/MM/DD"));

// 날짜 포맷팅 - 과거 특정 날짜의 문자열을 모멘트 객체형태로 변경
const dateMoment = moment("2024-03-30");
console.log(dateMoment); // Moment<2024-03-30T00:00:00+09:00>

// 시간 추가 및 빼기 - 날짜작업을 프로그램상에서 할 때 편함
// nowDate에 바로 수정함.
const nextDays = nowDate.add(7, "days");
const nextMonths = nowDate.add(7, "months");
console.log(` nextDays : ${nextDays}`);

// 시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log(`과정 종료까지 남은 날 수 : ${diffDay}`);

// q2 .
// 오늘부터 100 일 후의 날짜를 YYYY년 MM월 DD 일로 출력.
const today = moment();
const next100days = today.add(100, "Days");
console.log(`100 일 후 : `, next100days.format("YYYY년 MM월 DD일"));

// 2024-03-15 부터 2025-09-20 까지 몇 개월이 지났는지 계산
const startPoint = moment("2024-03-05");
const endPoint = moment("2025-09-20");
const calculateMonths = endPoint.diff(startPoint, "months");
console.log(
  `2024-03-15 부터 2025-09-20 까지 몇 개월이 지났는지 : ${calculateMonths} 개월 경과`
);

// q4. 크리스마스까지 남은 일수
const now = moment();
const chrimstMas = moment("2025-12-25");
const untillXmas = chrimstMas.diff(now, "days");
console.log(`크리스마스까지 ${untillXmas} 일 남음`);

// # 요일 다루기
require("moment/locale/ko"); // 한국어 로케일 불러오기
const s3 = moment(); // 한국어 로케일 설정.

// format 의 d 늘어날수록 풀네임에가깝게 프린트함.
console.log(`요일 : ${s3.format("d")}`); // 3
console.log(`요일 : ${s3.format("dd")}`); // We 수
console.log(`요일 : ${s3.format("ddd")}`); // Wed 수
console.log(`요일 : ${s3.format("dddd")}`); // Wednesday 수요일

// q5 올해 크리스마스는 무슨 요일 일까요?
const xmas = moment("2025-12-25");
console.log(`올해 크리스마스의 요일은 : ${xmas.format("dddd")}`);

// q6.자신이 태어난 날의 요일을 출력하세요.
const myBD = moment("1996-07-19");
console.log(`제가 태어난 날의 요일은 : ${myBD.format("dddd")}입니다.`);
