// 2. 비동기 방식(Asynchronous)
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing

/**
 * 현재 실행 중인 작업(Task)가 아직 종료되지 않은 상태라고 해도, 다음 작업을 곧바로 실행하는 방식
 */

function first() {
  console.log("first() called");
}

function second() {
  console.log("second() called");
}

// Web API에서 제공하는 API들 중에 비동기로 동작하는 함수들(setTimeout(), XMLHttpRequest, ...)
// setTimeout - 일정 시간 지연시킨 이후 실행시킬 함수를 작성할 때 사용
// setTimeout(콜백 함수, 지연시킬 시간)
// 이때, 안에 first()처럼 ()를 써버리면 호출되기 때문에 안됨.
setTimeout(first, 0); // setTimeout은 실행되자마자 종료. 큐에 first를 넣어놓고, 1초 뒤에 first()호출
second();
