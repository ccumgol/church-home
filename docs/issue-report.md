# 샘플교회 (church-home) 이슈 트래킹 및 트러블슈팅 종합 보고서

본 문서는 **샘플교회(church-home)** 프로젝트 개발 및 디자인 고도화 과정에서 발생했던 주요 문제, 기술적 원인 분석, 그리고 이를 완벽히 해결한 과정을 체계적으로 기록한 보고서입니다.

---

## 📋 목차
1. [이슈 1: 다크 모드 및 다크 섹션 내 텍스트 가독성 소멸 문제](#이슈-1-다크-모드-및-다크-섹션-내-텍스트-가독성-소멸-문제)
2. [이슈 2: 하단 CTA 검은 박스의 너비 오버플로우 및 타이틀 소멸 현상](#이슈-2-하단-cta-검은-박스의-너비-오버플로우-및-타이틀-소멸-현상)
3. [이슈 3: 상단 메뉴바(Navbar) 배경색과 바디 배경색 이질감 현상](#이슈-3-상단-메뉴바navbar-배경색과-바디-배경색-이질감-현상)
4. [이슈 4: 히어로(Hero) 영역 배경 이미지 미출력 문제](#이슈-4-히어로hero-영역-배경-이미지-미출력-문제)
5. [이슈 5: 섹션 상하 여백 과다 및 섹션 타이틀 서식 파편화](#이슈-5-섹션-상하-여백-과다-및-섹션-타이틀-서식-파편화)
6. [이슈 6: 정적 미디어 자산 WebP 일괄 변환 및 웹 표준 도입](#이슈-6-정적-미디어-자산-webp-일괄-변환-및-웹-표준-도입)
7. [이슈 7: GitHub Pages 서비스 연동 및 CI/CD 워크플로우 세팅](#이슈-7-github-pages-서비스-연동-및-cicd-워크플로우-세팅)
8. [이슈 8: config/_default/hugo.yaml 내 3가지 스키마 및 디프리케이션 문제 수정](#이슈-8-configdefaulthugoyaml-내-3가지-스키마-및-디프리케이션-문제-수정)

---

## 이슈 1: 다크 모드 및 다크 섹션 내 텍스트 가독성 소멸 문제

### 🔴 증상
- 다크 모드 전환 시, 또는 어두운 배경(Hero, CTA 등)을 가진 섹션에서 제목, 설명문, 링크 텍스트가 어두운 바탕색과 동일한 색상(`#221e1a` / `#292524`)으로 표시되어 글씨가 전혀 보이지 않는 현상 발생.

### 🔍 근본 원인
- CSS 전역 규칙에서 `p, span, li, div { color: #292524; }`로 덮어쓰면서, 부모 요소가 `.dark`이거나 dark 계열 테마 클래스를 가져도 자식 텍스트 요소가 검은색 계열을 유지했습니다.

### 💡 해결 조치
- [`assets/css/custom.css`](file:///Users/gihyunpark/Desktop/Workspace/church-home/assets/css/custom.css) 내 `.dark` 전역 명암 반전 규칙 체계화:
  - 다크 모드 전역 제목: `color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;`
  - 다크 모드 본문/설명: `color: #e2e8f0 !important;`
  - 카드 및 아코디언: 배경 `#1e293b`, 텍스트 `#f8fafc` 고대비 보정.

---

## 이슈 2: 하단 CTA 검은 박스의 너비 오버플로우 및 타이틀 소멸 현상

### 🔴 증상
- 메인 페이지 하단 CTA 박스가 상단 FAQ 등 일반 컨텐츠 영역(1024px)보다 좌우로 크게 튀어나오고, 검은 배경 안의 제목("참된 은혜와 평안이 있는 예배에 초청합니다")이 보이지 않는 현상.

### 🔍 근본 원인
- HugoBlox `cta-card` 블록의 바깥쪽 섹션 배경(`home-section-bg`)이 뷰포트 전체 100% 너비로 검게 확장되었습니다.
- 또한 Preact `cta-card` 내부 `<h2>` 태그가 Tailwind 디폴트 검은색 스타일로 렌더링되어 검은 카드 배경에 묻혔습니다.

### 💡 해결 조치
1. 섹션 바깥 배경을 투명(`transparent`) 처리하고, 내부 카드 컨테이너에 직접 `max-width: 64rem !important;` (1024px) 및 `margin: 0 auto !important;`를 부여하여 상단 섹션과 **1:1 정렬**되도록 보정했습니다.
2. `[data-block-type="cta-card"] h2` 및 `section[id*="cta"] h2`에 `color: #ffffff !important;`를 적용하여 100% 흰색 글자로 도드라지게 수정하였습니다.

---

## 이슈 3: 상단 메뉴바(Navbar) 배경색과 바디 배경색 이질감 현상

### 🔴 증상
- 상단 메뉴바 영역이 메인 페이지 배경색(`var(--color-paper)` / `#faf8f5`)과 미세하게 다른 이질적인 사각형 직사각형 띠 형태로 도드라져 보임.

### 🔍 근본 원인
- 메뉴바 CSS에 `rgba(250, 248, 245, 0.95)` 반투명 레이어와 `backdrop-filter: blur(...)`가 적용되어 있어, 부모 배경 투과로 인해 색상 차이가 생겼습니다.

### 💡 해결 조치
- `header`, `#site-header`, `nav.navbar`, `header .container` 전체에 배경색을 바디 배경색 변수인 **`var(--color-paper) !important;` (`#faf8f5`)**로 100% 명시적 동일화하여 경계 없이 자연스럽게 이어지도록 조치하였습니다.

---

## 이슈 4: 히어로(Hero) 영역 배경 이미지 미출력 문제

### 🔴 증상
- CSS에 `url('/media/bright_sky_bg.jpg')` 배경 이미지를 지정했음에도 불구하고 히어로 섹션에 이미지가 노출되지 않고 어두운 단색 배경만 표시됨.

### 🔍 근본 원인
1. **자산 경로 서빙 오류:** 이미지가 `assets/media/` 폴더에만 놓여 있어 Hugo Web 루트(`/media/...`)로 직접 서빙되지 않고 **404 에러**가 났습니다.
2. **템플릿 인라인 배경색 가림:** HugoBlox 히어로 템플릿 내부의 `<div class="home-section-bg" style="background-color:#1a1614">` 레이어가 인라인 스타일로 배경을 덮고 있었습니다.

### 💡 해결 조치
1. 이미지 파일(`bright_sky_bg.webp`)을 정적 서빙 폴더인 **`static/media/`** 경로로 복사 배치하여 `/media/bright_sky_bg.webp`로 정상 서빙되도록 해결했습니다 (Hugo 빌드 결과 `Static files: 4` 확인).
2. `custom.css`에서 `#section-hero .home-section-bg`를 직접 타깃으로 지정하여 `background-image` 규칙 및 `background-color: transparent !important;`를 부여해 배경 이미지가 정상 노출되도록 조치했습니다.

---

## 이슈 5: 섹션 상하 여백 과다 및 섹션 타이틀 서식 파편화

### 🔴 증상
- 메인 페이지 섹션들의 상하 padding이 지나치게 커서 화면 스크롤 시 공간이 낭비되었고, 각 섹션의 제목 포맷(영문, 한글, 설명)이 제각각이었습니다.

### 💡 해결 조치
1. **여백 축소:** 일반 섹션 상하 여백을 기존 ~6rem에서 **1.75rem (~28px)** 수준으로 약 1/3 축소하고, '예배 및 모임 시간' 섹션은 **0.85rem**로 타이트하게 정돈했습니다.
2. **타이틀 포맷 통일:** 모든 섹션 헤더를 **`영문 서브타이틀 (Terracotta Uppercase) + 한국어 타이틀 (MaruBuri Serif) + 설명문`** 스타일로 통일하였습니다.

---

## 이슈 6: 정적 미디어 자산 WebP 일괄 변환 및 웹 표준 도입

### 🔴 증상
- 기존 JPG, PNG 확장자 사용으로 인한 용량 비효율 및 로딩 속도 개선 필요.

### 💡 해결 조치
- Python Pillow 라이브러리를 활용하여 `static/media/`, `assets/media/` 내의 모든 JPG/PNG 파일을 **.webp** 포맷으로 일괄 변환하고, CSS 및 템플릿 코드 참조 경로를 `.webp`로 최종 업데이트하였습니다.

---

## 이슈 7: GitHub Pages 서비스 연동 및 CI/CD 워크플로우 세팅

### 🔴 증상
- 개발된 웹사이트를 웹상에서 누구나 접속하여 볼 수 있는 호스팅 환경 필요.

### 💡 해결 조치
1. GitHub API (`gh api -X POST repos/ccumgol/church-home/pages`)를 통해 GitHub Pages build_type을 `workflow`로 성공적으로 활성화했습니다.
2. `hugo.toml` 및 `config/_default/hugo.yaml` 내 baseURL을 **`https://ccumgol.github.io/church-home/`**로 설정했습니다.
3. [`.github/workflows/deploy.yaml`](file:///Users/gihyunpark/Desktop/Workspace/church-home/.github/workflows/deploy.yaml) CI/CD 파일 작성을 통해 `main` 브랜치 push 시 자동 릴리스 빌드 & 배포되도록 완수하였습니다.

---

## 이슈 8: config/_default/hugo.yaml 내 3가지 스키마 및 디프리케이션 문제 수정

### 🔴 증상
- VSCode / YAML Linter에서 `hugo.yaml` 파일에 3가지 경고/에러가 표시됨.

### 🔍 원인 3가지
1. **`cascade` 내 커스텀 파라미터 계층 누락:** `cascade` 항목의 `show_date`, `reading_time`, `pager`, `view` 등의 파라미터가 `params:` 서브 블록 아래에 작성되지 않아 스키마 에러 발생.
2. **`timeout` 숫자형 타임아웃 경고:** 숫자형 밀리초 값(`600000`) 사용 시 Hugo 및 YAML 스키마에서 문자열 시간 단위(`'600s'`) 지정을 권장하는 디프리케이션 경고 발생.
3. **상위 디프리케이션 키 선언:** `footnotereturnlinkcontents: <sup>^</sup>` 구식 옵션이 최상위 키로 잔재함.

### 💡 해결 조치
1. `cascade` 하위 항목들에 **`params:` 계층 구조**를 명확히 부여하여 YAML 스키마 준수.
2. `timeout: 600000` ➔ **`timeout: '600s'`**로 표준 지속 시간 형식으로 변경.
3. 최상단 잔재 레거시 키 정돈 및 스키마 검증 완수 (Hugo 빌드 `39 pages built in 630 ms` 확인 완료).

---

## 🌐 최종 프로젝트 상태

- **공개 웹사이트 URL:** 👉 **[https://ccumgol.github.io/church-home/](https://ccumgol.github.io/church-home/)**
- **소스 리포지터리:** [`ccumgol/church-home`](https://github.com/ccumgol/church-home)
