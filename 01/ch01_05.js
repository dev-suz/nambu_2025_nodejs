// function 


function add1(x,y){ // 선언 함수
    return x+y;
}

console.log(add1(2,3));



const add2 = function (x,y){ // 익명 함수
    return x+y;
}

console.log(add2(1,2));

 
const add3 = (x,y)=> { // 화살표 함수
    return x+ y;
}

console.log(add3(3,4));


// 콜백함수
const ten = (cb)=> {
    for (let i=0; i< 10; i++){
        cb(); // () 의 의미는 함수를 실행하라는 의미!
        // function(){
        //     console.log('call function')
        // }()
    }
}

ten(function(){
    console.log('call function')
});


// 타이머 함수

// 1000 ms = 1s
// setTimeout(func, latency)
setTimeout(function(){
    console.log('1초 뒤에 호출!');
}, 1000)

// 주기적으로 함수호출
// 스케줄러~ 
setInterval(function(){
    console.log('1초 마다 계속 실행');
},1000)



