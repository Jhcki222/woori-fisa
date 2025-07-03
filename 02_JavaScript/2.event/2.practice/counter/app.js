const valueEl = document.getElementById("value");
const decreaseBtn = document.querySelector(".btn-decrease");
const resetBtn = document.querySelector(".btn-reset");
const increaseBtn = document.querySelector(".btn-increase");

let count = 0;

function render() {
  // value에 count 할당
  valueEl.textContent = count;
  // value의 색깔 변경
  if (count < 0) {
    valueEl.style.color = "red";
  } else if (count == 0) {
    valueEl.style.color = "gray";
  } else {
    valueEl.style.color = "green";
  }
}

decreaseBtn.addEventListener("click", () => {
  count--;
  render();
});

increaseBtn.addEventListener("click", () => {
  count++;
  render();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  render();
});
