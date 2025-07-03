// 함수 2개 구현

// 1. 쿠팡에서 사과를 기다리는 함수 waitCoupang(appleBox, callback)
// 함수의 동작: '쿠팡에서 ${appleBox}가 도착했다' 출력

// 2. bringItToNeighbor()
// 함수 동작: '옆집 아주머니에게 전달 완료!' 출력

// appleBox: '사과'라는 문자열 전달

// 콜백함수 기본
function bringItToNeighbor() {
  console.log("옆집 아주머니에게 전달 완료!");
}
function arrive(appleBox) {
  console.log(`쿠팡에서 ${appleBox}가 도착했다.`);
}
function waitCoupang(appleBox, callback) {
  callback(appleBox);

  bringItToNeighbor();
}

waitCoupang("사과", arrive);
