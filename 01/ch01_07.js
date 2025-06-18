// async await , promise

// node.js 크롬의 V8엔진 을기반으로 함
// --> 한계 )
// 비동기 callback, async, await

// 늦게 나오는 작업들, 시간이 오래걸리는 것은 따로 Libuv api에 던져놓았다가
// 콜스택, 이벤트 큐, 이벤트 루프

const fetchData = (callback) => {
  // callback <- handleData
  setTimeout(() => {
    // 서버에서 데이터를 받는 부분.
    const data = "서버에서 받은 데이터";
    callback(data);
  }, 1000);
};

const handleData = (data) => {
  // 서버에서 받은 데이터를 처리하는 내용, 데이터 파싱 등등.
  console.log("콜백에서 받은 데이터", data);
};

// 콜백지옥
// const cb1 = callback(callback);
// callback(cb1)

// 정의만 - 함수이름
//fetchData(handleData);

// Promise
// Promise 객체를 리턴
const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    // resolve 함수, reject 함수
    setTimeout(() => {
      const success = true; // 작업 성공 여부

      // 외부에서나 db에서 데이터를 가지고 오는 로직 있는 자리
      if (success) {
        resolve(); // 성공 했을때 호출 되는 함수 , 외부에서 데이터를 가져오는데 성공.
      } else {
        reject(); // 실패 했을때 호출 되는 함수 , 외부에서 데이터를 가져오는데 실패.
      }
    }, 1000);
  });
};

fetchDataPromise() // 외부 라이브러리들이 이런 형태로 함수를 제공
  .then((data) => {
    console.log(`프로미스에서 받은 데이터 : ${data}`); //  resolve -> 데이터 패치가 성공했을 때 실행
  })
  .catch((error) => {
    console.log(`에러 : ${error}`); //  reject -> 데이터 패치가 실패했을 때 실행
  });

//asyc - await
const getData = async () => {
  try {
    const data = await fetchDataPromise();
    console.log("async/await data", data); // resolve 의 역할 수행 . data 패치가 성공했을때 처리 로직
  } catch (error) {
    console.log("에러", error); // reject -> 데이터 패치가 실패했을 때
  }
};

// 문제1 . 2초 후에 "안녕하세요! "라는 메시지를 출력하는 Promise를 만들고 실행하세요.
const greet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      success = true;

      if (success) {
        resolve("안녕하세요!");
      } else {
        reject();
      }
    }, 2000);
  });
};

greet().then((message) => {
  // resolve
  console.log(message);
});

const sayHi = async () => {
  try {
    data = await greet("안녕하세요2");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
sayHi();
// cf) timers, pending, poll, check, close
