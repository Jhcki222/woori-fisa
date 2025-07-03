// 콜백함수 기본

function greeting(name) {
  console.log(`Hello ${name}`);
}

// 두번째 인수인 callbackFn은 함수를 받는 자리
function processUserInput(name, callbackFn) {
  //callbackFn = greeting() 함수가 할당됨
  // 두번째 인수로 받은 함수를 호출
  callbackFn(name);
}

// greeting을 콜백 함수
// 콜백 함수 - "어떤 함수의 인수로 전달되는 함수"
processUserInput("Yoo", greeting);
setTimeout(greeting, 1000);
