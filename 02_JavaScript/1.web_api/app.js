// DOM 객체 출력 -> index.html의 개발자도구 - console에서 확인 가능
console.log(document);

// 객체의 프로퍼티 조회하고 싶을 때?
console.dir(document);

console.log(window);

// 윈도우의 document와 document는 동일하다.
console.log(window.document === document);

// alert("hello!");

// h1 태그 가져오기
const h1 = document.querySelector("h1");
console.log(h1);

console.log(h1.textContent);

// h1의 텍스트 값을 변경, 조작
h1.textContent = "CSS란?";

// 가독성 측면에서 사용 권장 (id로 가져옴)
const h1Tag = document.getElementById("main-title");
console.log(h1Tag);

// class 이름으로 가저옴
const liList = document.getElementsByClassName("list-item");
console.log(liList);

// liList.map((li) => console.log(li));
// liList의 타입 HTMLCollection은 배열이 아님
console.log(typeof liList); // JS는 배열도 객체로 취급

// 진짜 배열인지 확인하려면? Array 클래스의 메서드를 활용
console.log(Array.isArray(liList));
//HTMLCollection을 배열 타입으로 변환하거나 해서 작성해야한다.

const liList2 = document.querySelectorAll(".list-item");
console.log(Array.isArray(liList2));
liList2.forEach((li) => console.log(li));

// 특정 HTML 엘리먼트의 위계를 활용해서 가져오기
console.log(document.querySelector("ul li:first-of-type"));
