// colorChangeButton.addEventListener("click", () =>
//   console.log("button clicked~~~!!")
// );

const colorChangeButton = document.getElementById("btn");

const bgColor = document.getElementById("color");
// console.log(bgColor);

function random(number) {
  return Math.floor(Math.random() * number);
}

function bgChange() {
  const randomColor = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  return randomColor;
}

// colorChangeButton.addEventListener("click", (e) => {
//   e.target.style.background = bgChange();
// });
// container는 class로 선언되어있고, 복수의 객체를 가지고있기 때문에 getElementByClassName을 쓰면 배열로 받게된다. 그래서 오류가뜸!
// 가져올때 클래스면 '.', id이면, '#'
const container = document.querySelector(".container");
console.log(container);

const colorText = document.getElementById("color");
const body = document.querySelector("body");

colorChangeButton.addEventListener("click", (e) => {
  const color = bgChange();
  body.style.background = color;
  //   e.target.style.background = color;
  colorText.textContent = color;
  colorText.style.color = color;
});
