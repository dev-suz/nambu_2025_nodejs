// os moudule - 시스템 정보 , cpu 갯수 ~ 등 .

const os = require("os");

console.log(`운영 체제 : ${os.type()}`); //  Darwin
console.log(`플랫폼  : ${os.platform()}`); // darwin
console.log(`아키텍처 : ${os.arch()}`); // arm64
console.log(`호스트 네임 : ${os.hostname}`); //nambu05ui - MacBookPro.local;

// cpu 정보
// cpu 갯수
const cpus = os.cpus();
console.log(`cpu 코어수: ${cpus.length}`); //8
console.log(`cpu 모델 : ${cpus[0].model}`); // Apple M3 여덟개중 첫번째
console.log(`cpu 속도 : ${cpus[0].speed} MHz`); //  2400

// 메모리 정보
// Bytes / K / M / G
const totalMemeoryGB = os.totalmem() / 1024 / 1024 / 1024;
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;

console.log(`\n메모리 정보 `);
console.log(`총 메모리 : ${totalMemeoryGB} GB`);
// mac 에서는 GPU , CPU 같이 사용해서 캐시된 메모리로 미리 예약해서 사용. 그래서 적게 나오는듯. 다른 os 에서 돌려보면 확인 가능할것임.
console.log(`사용 가능한 메모리 : ${freeMemoryGB.toFixed(2)} GB`);

// 사용자 정보 가져오기
const userInfo = os.userInfo();

console.log(`\n 사용자 정보 `);
console.log(`사용자 이름 : ${userInfo.username}`);
console.log(`홈 디렉토리 : ${userInfo.homedir}`);
console.log(`쉘 : ${userInfo.shell}`);

// fs, path, http, os, map 함수
// 외장모듈 (모듈 만들고, export, import ) , fileLogging , 날짜 다루는 라이브러리 , ??
// http 웹서버 만들기!
