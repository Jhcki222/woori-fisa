// 1. 함수가 호출된 순서대로 순차적으로 실행됨. - 동기(Sync) 방식
function first() {
  console.log("first() called");
}

function someLongWork() {
  console.log("Some Long Work Processing..........");
}

function second() {
  console.log("second() called");
}

first();
someLongWork();
second();

/**
 * 동기 방식
 * 한 번에 하나의 작업만 처리하기 때문에 특정 작업 (someLongWork())이 길어질 경우,
 * 그 뒤의 작업(second())은 (스레드가) blocking됨(작업 수행 불가)
 * 
   장점: 코드를 읽기가 쉽다.
 */
