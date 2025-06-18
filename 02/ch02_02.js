// # 경로 읽기
// require('path') - 경로
const path = require("path");

const fullPath = path.join(__dirname, "files", "test.txt");
// console.log(`전체 경로 : ${fullPath}`);

// # 경로 조합 - join(__dirname, 'pathDepth1','depth2',...', '파일이름.확장자');
// __dirname : 현재 파일의 디렉토리 절대 경로를 가져옴.

// q1 : fullPath2변수에 현재 디렉토리/files/tasks/jobs/01.txt 경로를 만들어보세요
const fullPath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
// console.log(fullPath2);

// os 별로 sep이 다르기때문에 바꿔줘야하는 불편함이 생김
// win \\
const fullPath22 = __dirname + "/" + "files";

// # 경로 분리
const pathParts = path.parse(fullPath);
// console.log(pathParts);

/*
{
  root: '/',
  dir: '/Users/suz/tutorial/02/files',
  base: 'test.txt',  // 파일명(이름+확장자)
  ext: '.txt',   // 확장자
  name: 'test'  // 확장자 제외 이름
}
*/

// 확장자를 읽어서 확장자별 처리를 다르게 가져갈때
// 확장자 제거 해서 파일명 추출시 ( 첨부파일 업로드할때 , 이미지명 등)
//q2 . fullPath2 를 parse()이용해서 경로 분리 해서 pathParts2에 넣고 이를 출력하시오.
// const pathParts2 = path.parse(fullPath2);
// console.log("pathParts2 : ", pathParts2);

//
// const ext = path.extname("test.txt");
// console.log("ext : ", ext);

// const ext2 = path.extname(fullPath);
// console.log("ext2 : ", ext2);

// #
// existsSync()
const fs = require("fs"); // fileSystem

const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);

// 파일이 이미 존재하면 에러남 // EEXIST: file already exists, mkdir '/Users/suz/tutorial/02/new-dir'
// 경로가 없으면 True 있으면 false
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// q1. dirPath2 변수를 만들고~ 현재 디렉토리 밑에 'tasks'디렉토리를 만들어보세용
// 없으면 만들고 있으면 걸러서 예외처리해주세요~
const dirPath2 = path.join(__dirname, "tasks");
console.log(dirPath2);
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

// 한층 더 내려가서~
const dirPath3 = path.join(__dirname, "tasks", "my-task");
console.log(dirPath3);
if (!fs.existsSync(dirPath3)) {
  fs.mkdirSync(dirPath3);
}

//
const dirPath4 = path.join(__dirname, "tasks", "jobs", "01"); // 경로 만들고
if (!fs.existsSync(dirPath4)) {
  // 경로 존재 여부 체크

  // 중첩 경로 {recursive : true } 주는게 마음 편할 거임.
  fs.mkdirSync(dirPath4, { recursive: true }); // 실제 디렉토리 생성.
}

// # 파일 생성하기
// const filePath = path.join(dirPath4, "test.txt");
// fs.writeFileSync(filePath, "디렉토리 생성 후 파일을 생성하는 테스트 !");

// q2 : 현재 디렉토리 밑에 main/src/code/javascript.txt 파일을 생성하고
// 파일안에 '자바스크립트 테스트 파일입니다.' 를 쓰세요.
const dirPath5 = path.join(__dirname, "main", "src", "code");
console.log(dirPath5);
if (!fs.existsSync(dirPath5)) {
  fs.mkdirSync(dirPath5, { recursive: true });
}
const filePath5 = path.join(dirPath5, "javscript.txt");
fs.writeFileSync(filePath5, "자바스크립트 테스트 파일입니다.");

// # 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "renamed-dir");
fs.renameSync(dirPath, newDirPath); // 경로 변경 == 디렉토리 변경  (Terminal에서 mv)

// # 디렉토리 삭제 - 없어도 에러 안남. 두번 삭제명령 내려도 에러 안남!
fs.rmdirSync(newDirPath);

// # http 메소드
// # 객체 다루기! (filter~ )
