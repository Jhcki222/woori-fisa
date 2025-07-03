// 2. 이벤트 핸들러 프로퍼티 방식으로 이벤트 부여하기
const evPropButton = document.getElementById("btn-ev-prop");

console.log(evPropButton);

// 클릭 이벤트가 발생했을 때 동작시킬 로직(함수)
const eventHandler = function () {
  console.log("button clicked!!!");
};

console.log(eventHandler);

evPropButton.onclick = eventHandler;

// // 3. addEventListener 방식
const addEvLsnrButton = document.getElementById("btn-add-ev-lsnr");

// // addEventListener(이벤트 타입, 콜백함수);
// addEvLsnrButton.addEventListener("click", buttonHandler);

// function buttonHandler() {
//   console.log("button clicked~~~!!");
// }

// 실제 사용 코드 => 화살표 함수
addEvLsnrButton.addEventListener("click", () =>
  console.log("button clicked~~~!!")
);
