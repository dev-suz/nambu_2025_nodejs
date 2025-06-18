// # map, filter

// 가상의 유저테이블
const users = [
  { id: 1, name: "이준호", age: 32, score: 92 },
  { id: 2, name: "김지은", age: 28, score: 76 },
  { id: 3, name: "박성민", age: 24, score: 88 },
  { id: 4, name: "최유진", age: 31, score: 67 },
  { id: 5, name: "정하늘", age: 29, score: 81 },
  { id: 6, name: "오세훈", age: 35, score: 95 },
  { id: 7, name: "윤소희", age: 27, score: 73 },
  { id: 8, name: "김찬비", age: 26, score: 83 },
];

// # filter
// 조건에 맞는 요소만 필터링! - 조건에 맞는 요소는 return 에 있는 식이 참일 경우
// select * from users where age < 27;
const youngs = users.filter((user) => {
  console.log(user);
  return user.age < 27;
});

console.log(youngs); // Rt 조건에 해당하는 친구들만 반환 받아 새 배열 생성

// q1. 점수가 80점 미만 친구들 고르시오.
const underEighty = users.filter((user) => {
  return user.score < 80;
});

console.log(underEighty);

//  # map
const userNames = users.map((user) => {
  return user.name;
});

console.log(userNames);

// q2. 아이디와 이름만 반환하는 배열을 만들어보세용~
const getUidAndUname = users.map((user) => {
  const data = { id: user.id, name: user.name };
  return data;
});

console.log(getUidAndUname);

// q3. 성적이 80점 이상인 친구들의 아이디, 이름, 성적을 뽑아보세용~
const highScores = users
  .filter((user) => {
    return user.score >= 80;
  })
  .map((user) => {
    return { id: user.id, name: user.name, score: user.score };
  });

console.log("filteredData : ", highScores);

// 정렬, forEach
users.forEach((user) => {
  console.log(`${user.name}님의 점수는 : ${user.score} 입니다. `);
});

// # 날짜 , 모듈

// reduce, sum, sort
//   , 0 시작값
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);
console.log(totalScore);

// q4
// 나이가 25 이상인 사람들의 전체 점수를 구해보세요.
const over25totalScore = users
  .filter((user) => user.age >= 25)
  .reduce((score, user) => {
    return score + user.score;
  }, 0);
console.log(over25totalScore); //567

// sort
// 새 배열 만들고 그걸로 조작.
const sortedByAge = [...users].sort((a, b) => {
  return a.age - b.age;
  // a.age - b.age 가 음수이면 a가 b 앞에 있고
  // a.age - b.age 가 양수이면 a가 b 뒤에 있고
  // a.age - b.age 가 0 이면 그대로
}); // 나이 오름차순 정렬

console.log(sortedByAge);
