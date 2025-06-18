// 반복문

// 복합 자료형
let arr = [5,23,"hello",true, "world", -9];
console.log(arr);

// 배열 접근 arr[idx] : idx 는 0~
console.log(arr[1]); //23


// for ( 초기조건 ; 종료 조건; 증감조건 )
for(let i=0; i< arr.length ; i++){
    console.log(`index${i}는 is ${arr[i]}`);
}
console.log('-----------');


// for .. in , i 에는 idx
for(i in arr) {
    console.log(`idx${i}는 is ${arr[i]}`);
}
console.log('-----------');


// for ... of
// e : element바로 출력
for (e of arr){
    console.log(`element : ${e}`);
}
console.log('-----------');



console.log('-------q1')
// q1. 
const q_arr1 = [1,2,"멈춰", 3,4,true, false];

for (i in q_arr1){
    if(typeof arr[i] == "string"){
        break;
        // break 는 for문 빠져나감(루프종료)
    }
    console.log(arr[i]);
}


console.log('--------- continue')
for (i in q_arr1){
    if(typeof arr[i]== "string"){
        continue;
        //밑에꺼 실행 안함. (이후 로직 실행안하고 다음 반복으로 넘어감.)
    }
    console.log(arr[i]);
}


console.log(`-------------- q1 - ans : }`)
// q1.  "멈춰" 나오면 멈추기!
const p1 = [1,2,"멈춰", 3,4,true, false];
for(i in p1){
    if(p1[i] == "멈춰"){
        break;
    }
    console.log(p1[i]);
}




console.log('--------q2------')
// q2  5 ~ 25까지 5 step 배열에서 20 이상이 나오면 멈추기 
const q_arr2 = [5,10,15,20,25];

for (i in q_arr2){
    if(q_arr2[i] >= 20 ){
       break;
    }
    console.log(q_arr2[i]);
}



// q3.  1~10 을 원소로 가지는 배열에서 짝수만 나오는 코드 만들기 - continue사용
console.log('--------- q3----------')
const q_arr3 = [1,2,3,4,5,6,7,8,9,10];

for(i in q_arr3){
    // q_arr3[i] % 2 == 0 짝수  아니면 홀수
    // 제외 조건 - continue / 나머지 실행.
    if(q_arr3[i] % 2 == 1 ){
        continue;
    }
    console.log(q_arr3[i]);
}

//  q4.   1~10 을 원소로 가지는 배열에서 3의 배수 제외 코드 만들기 - continue사용
console.log('---------  q4----------')

for ( i in q_arr3){
    if(q_arr3[i] % 3 == 0 ){
        continue;
    }
    console.log(q_arr3[i]);
}



console.log('------q5-------');
//q5 -  ["사과", 1,"바나나", 2, "포도", false] 에서 문자열만 나오는 코드를 만들어보시오. - typeof value
const q5_arr = ["사과", 1,"바나나", 2, "포도", false];

for (i in q5_arr){
    if(typeof q5_arr[i] != "string" ){
        continue;
    }
    console.log(q5_arr[i]);
}


for (i in q5_arr){
    if(typeof q5_arr[i] == "string" ){
        console.log(q5_arr[i]);
    }
}

console.log('---------q6---------');
// q6 - 클래스 만들기 예제







