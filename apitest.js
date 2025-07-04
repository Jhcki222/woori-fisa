// superagent 모듈을 HTTP라는 이름으로 사용하기 위해 import
import HTTP from "superagent";

const DETECT_LANGUAGE_URL = "https://papago.apigw.ntruss.com/langs/v1/dect";
const TRANSLATE_LANGUAGE_URL =
  "https://papago.apigw.ntruss.com/nmt/v1/translation";
const CLIENT_ID = "g1ns2d9lat";
const CLIENT_SECRET = "yuMGLhvPatsfiY3vZ1MtHOAw3PGmQEjgFw5Vf87N";

// 언어 감지
export const detectLangs = (query, callback) => {
  HTTP.post(DETECT_LANGUAGE_URL) // 보낼 엔드포인트(주소)
    .send({ query }) // 보낼 데이터
    .set("X-NCP-APIGW-API-KEY-ID", CLIENT_ID)
    .set("X-NCP-APIGW-API-KEY", CLIENT_SECRET)
    // error가 발생했을 때는 콜백 함수의 인수 중 error에 넣어줌
    // 결과값은 result에 넣어줌
    .end((error, response) => {
      if (error) return callback(error, null);
      callback(null, response.body);
    });
};

export const translate = (payload, callback) => {
  HTTP.post(TRANSLATE_LANGUAGE_URL)
    .send(payload)
    .set("X-NCP-APIGW-API-KEY-ID", CLIENT_ID)
    .set("X-NCP-APIGW-API-KEY", CLIENT_SECRET)
    .end((error, response) => {
      if (error) return callback(error, null);
      callback(null, response.body);
    });
};
// detectLangs();
// translate();
