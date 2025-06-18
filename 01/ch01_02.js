let pi ; 
console.log(pi); //udf

pi = 3.141592;
console.log(pi);


let  radius = 12;
console.log(`넓이 : ${pi * radius * radius}`); // pi * r ^2
console.log(`둘레 : ${ 2 * pi * radius }`); // 2 pi r


// q1 -  area 라는 변수를 만들고 radius가 15 인 경우 area를 넓이를 계산해보세요. 

let area ; 
radius = 15;
area =  pi * radius * radius;
console.log(`area : ${area}`);

// q2  - width 넓이 변수 height 에 각각 값을 넣고 , area2 에 변수 넣기. area 2 출력
// 선언 및 할당 순서 생각
let width;
let height ; 

width = 3;
console.log(width);
height  = 5;
console.log(height);

let area2 =  width * height;
console.log(`area2 : ${area2}`);

// 증감연산자
let  num = 0;
num++; 
console.log(num); 

num --;
console.log( num);

// 형변환
console.log(String(52)); // "52"
console.log(typeof String(52)); //string

console.log(Number("52")); // 52
console.log(typeof Number("52")); // number


console.log(parseInt("1234")); // 1234
console.log(parseInt("1234.56")); // 1234

// pareseFloat : 소수점
console.log(parseFloat("1234.56")); //1234.56 

console.log(Number("hello")); // NaN
console.log(isNaN(Number("hello"))); // true

// js - typeof
console.log(typeof 10); //number

console.log(typeof "hello"); //string

console.log(typeof true); //boolean

console.log(typeof function(){}); //function

console.log(typeof {}); //object

console.log(typeof []); //object (배열도 객체 취급)

// 상수 - const 사용
const test = "변경불가";
//test = '변경불가2'; //TypeError: Assignment to constant variable.



