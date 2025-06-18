const validator = require("validator");

const email = "test@example.com";
const email2 = "test!example.com";

// validator.isEmaill(이메일) : bool값 반환
console.log(`이메일 검증 ${email}은 ${validator.isEmail(email)}`); // true
console.log(`이메일 검증 ${email}은 ${validator.isEmail(email2)}`); // false

// cf) 이메일 유효성 검사 정규식 (조금 더 엄격하게)
//const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const url = "http://www.naver.com";
const url_f = "http://com";
const domain = "www.naver.com";
console.log(`url 검증 ${url}은 ${validator.isURL(url)}`); //true
console.log(`url 검증 ${url_f}은 ${validator.isURL(url_f)}`); //false
console.log(`url 검증 ${domain}은 ${validator.isURL(domain)}`); //true

const ip = "3.35.152.150";
console.log(`IP 검증 ${ip}는 ${validator.isIP(ip)}`); //true

const phone = "010-1234-5678";
console.log(
  `전화 번호 검증 : ${phone} 은 ${validator.isMobilePhone(phone, "ko-KR")}`
);

const num1 = "12345";
console.log(`숫자 검증 ${num1}은 ${validator.isNumeric(num1)}`);

const date1 = "2025-09-06";
console.log(`날짜 검증 ${date1}은 ${validator.isDate(date1)}`);

//
const password1 = "password123!";
const password2 = "Ppassword123!";
const v1 = validator.isStrongPassword(password1, {
  minLenght: 8,
  minLowercase: 1,
  minUpperCase: 1,
  minNumbers: 1,
  minSymbols: 1,
});

const v2 = validator.isStrongPassword(password2, {
  minLenght: 8,
  minLowercase: 1,
  minUpperCase: 1,
  minNumbers: 1,
  minSymbols: 1,
});

console.log(`비밀번호 ${password1}은 ${v1}`); // false
console.log(`비밀번호 ${password2}은 ${v2}`); // true

// 환경 변수
