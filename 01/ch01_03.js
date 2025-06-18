// 조건문 
// if
let date = new Date();

if(date.getHours() < 12){
    console.log("오전")
} else {
    console.log("오후");
}


const hour = date.getHours();
// 삼항 연산  -   cond ? true :false
const timneOfDay = hour < 12 ? "오전": "오후";

console.log(`현재는 ${timneOfDay} 입니다.`);


const temperature = 24;
//q1 30도 넘으면 더운날씨 20도 넘으면 따뜻한 날씨 10도 넘으면 선선한 날씨 나머지 추운날씨로 분류.
if( temperature > 30){
    console.log("더운 날씨 입니다.");
} else if( temperature > 20){
    console.log("따뜻한 날씨 입니다.");
} else if( temperature > 10){
    console.log("선선한 날씨 입니다.");
} else {
    console.log("추운 날씨입니다.");
}


// q2

const day = date.getDay();

console.log(day);

// 문제2
// switch 문  - break 유의 
// 바로 case로 분류 됌!
switch(day) {
    case 0 : 
        console.log("일요일");
        break;
    case 1 : 
        console.log("월요일");
        break;
    case 2 : 
        console.log("화요일");
        break;
    case 3 : 
        console.log("수요일");
        break;
    case 4 : 
        console.log("목요일");
        break;
    case 5 : 
        console.log("금요일");
        break;
    case 6 : 
        console.log("토요일");
        break;
    default : 
        console.log("잘못된 입력입니다. 0~ 6 으로 일 ~ 토 출력함.")
}



// 짧은 조건문 ( #short-circuit Evaluation)
// null, "" , 0인 경우 확인
const name =""; 

// cond1 || cond2 :  cond1 이 false일때 넘어감 
const displayName = name || "익명";

console.log(`환영합니다. ${displayName}님!`);


// nullish 병합 연산자
const userInput = null;
const defaultValue = "기본값";

//  cond ?? dfVal -- cond 이 null or undefined 경우에만  defVal 넣어서 동작함.
const result = userInput ?? defaultValue ;
console.log(`result : ${result}`);
        

// 조건부 실행 
const isLoggedIn = true;
// cond1 && cond2  -- cond1 true여야 넘어감 
isLoggedIn && console.log("로그인 되었습니다.");






// 갠학습

const arr = [...Array(10).keys()];
console.log(JSON.stringify(arr));



