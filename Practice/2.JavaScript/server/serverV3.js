const express = require("express"); // 웹 서버 프레임워크

const app = express();
const port = 3000;

// public이라는 이름의 폴더를 정적 리소스가 제공되는 곳으로 적용
app.use(express.static("../public"));
app.use(express.json()); // 역직렬화 모듈

// 화살표 함수를 rootHandler에 할당
const rootHandler = (req, res) => {
  res.sendFile("index.html"); // /public/index.html의 파일을 응답하게 됨
};

// 루트 경로 요청하면 index.html을 반환하는 핸들러 어딘가에서 localhost:3000'/' 라는 경로로 요청 이벤트가 발생하면 rootHandler함수가 동작
app.get("/", rootHandler);

// TODO : 언어 감지 요청 처리할 핸들러
app.post("/detect", (request, response) => {
  // 언어 감지 요청 처리 로직 작성 부분
  console.log(request.body);
});
// TODO : 언어 번역 요청 처리할 핸들러
app.post("/translate", () => {});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
