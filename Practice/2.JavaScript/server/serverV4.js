import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";
import HTTP from "superagent";

// __dirname 대체 (ESM 방식)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_ID = "g1ns2d9lat";
const CLIENT_SECRET = "yuMGLhvPatsfiY3vZ1MtHOAw3PGmQEjgFw5Vf87N";

const app = express();
const port = 3000;

// 정적 파일 제공 경로 지정
app.use(express.static(path.join(__dirname, "../public")));
app.use(json());

// 루트 경로 요청 시 index.html 반환 (절대 경로로 지정)
app.get("/", (_, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

// 언어 감지 처리 API
app.post("/detect", (req, res) => {
  const url = "https://papago.apigw.ntruss.com/langs/v1/dect";

  HTTP.post(url)
    .send(req.body)
    .set("Content-Type", "application/json")
    .set("X-NCP-APIGW-API-KEY-ID", CLIENT_ID)
    .set("X-NCP-APIGW-API-KEY", CLIENT_SECRET)
    .end((err, result) => {
      if (result?.statusCode === 200) {
        res.send(result.body);
      } else {
        console.error("[감지 에러]", err);
        res.status(500).json({ error: "언어 감지 실패" });
      }
    });
});

// 번역 요청 처리 API
app.post("/translate", (req, res) => {
  const url = "https://papago.apigw.ntruss.com/nmt/v1/translation";

  HTTP.post(url)
    .send(req.body)
    .set("Content-Type", "application/json")
    .set("X-NCP-APIGW-API-KEY-ID", CLIENT_ID)
    .set("X-NCP-APIGW-API-KEY", CLIENT_SECRET)
    .end((err, result) => {
      if (result?.statusCode === 200) {
        const { message } = result.body;
        const { result: translation } = message;

        res.send({
          detectedLanguage: translation.srcLangType,
          targetLanguage: translation.tarLangType,
          translatedText: translation.translatedText,
        });
      } else {
        console.error("[번역 에러]", err);
        res.status(500).json({ error: "번역 실패" });
      }
    });
});

// 서버 시작
app.listen(port, () => {
  console.log(`✅ http://127.0.0.1:${port}/ 에서 서버 실행 중`);
});
