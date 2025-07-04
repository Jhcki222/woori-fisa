/**
 * html UI 요소 선택
 */
const sourceTextarea = document.querySelector("#translate-box"); // 사용자 입력 텍스트 박스
const targetTextarea = document.querySelector('[data-cy="target-textarea"]'); // 번역 결과 출력 박스
const targetLangSelect = document.querySelector("#select-box"); // 번역 대상 언어 선택
const sourceLangSelect = document.querySelector("#source-lang-select"); // 감지된 언어 표시

let timeoutId = null; // 타이핑 후 호출 딜레이를 위한 타이머 ID

/**
 * 감지 및 번역을 수행할 지원 언어 코드 리스트(예제에서 3개만 지원하므로)
 */
const SUPPORTED_LANGUAGES = ["ko", "en", "ja"];

/**
 * 타이핑 입력 이벤트 등록
 * 사용자가 입력을 멈춘 뒤 600ms 후 언어 감지 및 번역을 시작한다.
 */
sourceTextarea.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(handleTypingInput, 600); // 타이핑 멈춘 뒤 600ms 후 실행
});

/**
 * 사용자 입력을 처리하고 언어 감지 및 번역을 수행하는 함수
 */
function handleTypingInput() {
  const text = sourceTextarea.value.trim(); // 입력된 텍스트
  const targetLang = targetLangSelect.value; // 선택된 번역 대상 언어

  if (targetLang === "번역할 언어") return;

  // 입력이 없을 경우: 번역 결과창도 비운다.
  if (!text) {
    targetTextarea.value = ""; // 번역 창 초기화
    return;
  }
  detectLanguage(text); // 언어 감지 요청
}

/**
 * 서버에 언어 감지 요청 함수
 */
function detectLanguage(text) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/detect"); // 프록시 서버 라우터
  xhr.setRequestHeader("Content-Type", "application/json");

  /**
   * 서버로부터 응답이 성공적으로 도착했을 때 실행
   */
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      try {
        const result = JSON.parse(xhr.responseText);
        const detectedLang = result.langCode;

        // 지원 언어면 자동 선택
        if (SUPPORTED_LANGUAGES.includes(detectedLang)) {
          sourceLangSelect.value = detectedLang;
        }

        const targetLang = targetLangSelect.value;

        // 감지된 언어와 번역 대상 언어가 같다면 그대로 복사
        if (detectedLang === targetLang) {
          targetTextarea.value = text;
        } else {
          translateText(detectedLang, targetLang, text); // 번역 요청
        }
      } catch {
        console.error("언어 감지 응답 파싱 오류");
      }
    } else {
      console.error(`언어 감지 실패 (status: ${xhr.status})`);
    }
  };

  /**
   * 네트워크 오류 발생 시 실행
   */
  xhr.onerror = () => console.error("언어 감지 요청 실패");

  xhr.send(JSON.stringify({ text }));
}

/**
 * 서버에 번역 요청을 보내고 결과를 출력창에 표시
 */
function translateText(source, target, text) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/translate"); // 프록시 서버 라우터
  xhr.setRequestHeader("Content-Type", "application/json");

  /**
   * 서버 응답 수신 시 실행
   */
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      try {
        const result = JSON.parse(xhr.responseText);
        const translatedText = result.message.result.translatedText;
        targetTextarea.value = translatedText;
      } catch {
        console.error("번역 응답 파싱 오류");
      }
    } else {
      console.error(`번역 실패 (status: ${xhr.status})`);
    }
  };

  /**
   * 네트워크 오류 발생 시 실행
   */
  xhr.onerror = () => console.error("번역 요청 실패");

  xhr.send(JSON.stringify({ source, target, text }));
}
