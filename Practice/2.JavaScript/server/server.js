const express = require("express"); // 웹 서버 프레임워크

const app = express();
const port = 3000;

// 화살표 함수를 rootHandler에 할당
const rootHandler = (req, res) => {
  res.send("Hello World!");
};

// 어딘가에서 localhost:3000'/' 라는 경로로 요청 이벤트가 발생하면 rootHandler함수가 동작
app.get("/", rootHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
