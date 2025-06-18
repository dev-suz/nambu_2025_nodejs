// 매 간 수학관련 라이브러리 만들어보기~

function add(a, b) {
  // 덧셈 함수
  return a + b;
}

function substract(a, b) {
  // 뺄셈 함수
  return a - b;
}

module.exports = {
  // 외부로 내보내기
  add,
  substract,
};

// module.exports = { ...export 대상 }
