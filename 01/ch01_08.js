// 구조분해할당
const fruits = ["사과", "수박", "복숭아", "바나나", "오렌지"];

const [first, second] = fruits;
console.log(first, second);

// 예시
// [변수, 변수조작메서드]
// const [login, setLogin] = useState([]);

// 객체 구조분해 할당
const student = {
  name: "함선우",
  age: 99,
  grade: "Z",
};

// const name = student.name;
// const age = student.age;
// const grade = student.grade;

const { name, age, grade } = student;
console.log(name, age, grade);

// 객체 구조분해 - 다른 변수 이름으로 할당
const { name: name1, age: age1, grade: grade1 } = student;
console.log(name1, age1, grade1);

const person = {
  name: "홍길동",
};

const { name: personName, age: personAge = 25 } = person;

console.log(person.name);
console.log(person.age);
console.log(personAge);

// 객체를 매개변수로 받는 함수 - React에서 props넘길때 사용하던 방식.
const printStudentInfo = ({ name, age, grade = "B" }) => {
  console.log(`학생정보`);
  console.log(`- 이름 : ${name}`);
  console.log(`- 나이 : ${age}`);
  console.log(`- 성적 : ${grade}`);
};

printStudentInfo(student); // 객체가 그대로 인자로 들어옴!

// 퀴즈
// q1. 객체를 출력하는 함수를 만들어보세요. printBook 매개변수 객체구조 분해할당 이용
const book = {
  title: "자바스크립트 최고",
  author: "홍길동",
  publisher: "한빛",
};

const printBook = ({ title, author, publisher }) => {
  console.log(`== 책 정보 == `);
  console.log(` - 제목 : ${title}`);
  console.log(` - 저자 : ${author}`);
  console.log(` - 출판사 : ${publisher}`);
};

printBook(book);

// 복잡한 객체 구조를 분해해보자!
const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

// const {
//   id,
//   info: {
//     name: userName,
//     address: { city, street },
//   },
// } = user;

// console.log(`아이디 : ${id}`);
// console.log(`이름 : ${userName}`);
// console.log(`도시 : ${city}`);
// console.log(`거리 : ${street}`);

//  city --> cityName
const {
  id,
  info: {
    name: userName,
    address: { city: cityName, street: streetName },
  },
} = user;

console.log(`아이디 : ${id}`);
console.log(`이름 : ${userName}`);
console.log(`도시 : ${cityName}`);
console.log(`거리 : ${streetName}`);

// q3.
const colors = ["빨강", "파랑", "노랑", "초록", "보라"];
//  q3- 1) 첫번째 요소는 firstcolor, 두번째 요소는 secondcolor 에 할당해보세요
// 나머지는 모두 others에
const [firstcolor, secondcolor, ...others] = colors;
console.log(firstcolor, secondcolor);
console.log(others); //  [ '노랑', '초록', '보라' ]

// q2:
const user1 = { name: "소지섭", age: 45, email: "so@mail.com" };
const user2 = { name: "전종서", age: 30 };

const formatUserInfo = ({ name, age, email = "이메일 없음" }) => {
  return `${name}(${age})님 메일은  다음과 같습니다 :  ${email} `;
};

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));

// 내일
// 내장 모듈, 파일, 디렉토리 다루기
// 간단한 웹서버 만들기
// 웹서버 개념
// 필터 맵 리뷰
// 첨부파일
// 인증
// MongoDB
