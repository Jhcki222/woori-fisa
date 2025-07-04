const express = require("express"); // 웹 서버 프레임워크
const cors = require("cors"); // CORS(Cross-Origin Resource Sharing) 허용 미들웨어
const dotenv = require("dotenv"); // 환경 변수(.env) 로드용 모듈
const bodyParser = require("body-parser"); // HTTP 요청 본문(body) 파싱용 미들웨어
const request = require("request"); // 외부 API 요청을 위한 HTTP 클라이언트

// .env 파일에 정의된 환경변수들을 process.env로 불러오기
dotenv.config();

const app = express(); // Express 앱 객체 생성
const PORT = 3000; // 서버가 실행될 포트 번호

app.use(cors()); // 모든 도메인에서의 요청 허용
app.use(bodyParser.json()); // JSON 형식 요청 파싱
app.use(bodyParser.urlencoded({ extended: true })); // 폼 데이터 파싱

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

/**
 * 공통 에러 응답 함수
 */
const sendError = (res, code, message) => {
  res.status(code).json({ error: message });
};

/**
 * 언어 감지 프록시
 */
app.post("/detect", (req, res) => {
  const { text } = req.body;
  if (!text) return sendError(res, 400, "text 필드는 필수입니다.");

  request(
    {
      url: "https://papago.apigw.ntruss.com/langs/v1/dect",
      method: "POST",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: { query: text },
    },
    (error, response, body) => {
      if (error) return console.log("언어 감지 서버 요청 실패");

      try {
        res.status(response.statusCode).json(JSON.parse(body));
      } catch {
        console.log("언어 감지 서버 응답 파싱 실패");
      }
    }
  );
});

/**
 * 텍스트 번역 프록시
 */
app.post("/translate", (req, res) => {
  const { source, target, text } = req.body;
  if (!source || !target || !text)
    return console.log("source, target, text는 모두 필수입니다.");

  request(
    {
      url: "https://papago.apigw.ntruss.com/nmt/v1/translation",
      method: "POST",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: { source, target, text },
    },
    (error, response, body) => {
      if (error) return console.log("번역 서버 요청 실패");

      try {
        res.status(response.statusCode).json(JSON.parse(body));
      } catch {
        console.log("번역 서버 응답 파싱 실패");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: PORT : ${PORT}`);
});
