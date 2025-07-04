const express = require("express"); // 웹 서버 프레임워크

const app = express();
const port = 3000;

// public이라는 이름의 폴더를 정적 리소스가 제공되는 곳으로 적용
app.use(express.static("../public"));

// 화살표 함수를 rootHandler에 할당
const rootHandler = (req, res) => {
  res.sendFile("index.html"); // /public/index.html의 파일을 응답하게 됨
};

// 어딘가에서 localhost:3000'/' 라는 경로로 요청 이벤트가 발생하면 rootHandler함수가 동작
app.get("/", rootHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
