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
9. [이슈 9: 스크롤 시 스티키 메뉴바(Sticky Navbar) 배경 미적용으로 인한 텍스트 겹침 문제](#이슈-9-스크롤-시-스티키-메뉴바sticky-navbar-배경-미적용으로-인한-텍스트-겹침-문제)
10. [이슈 10: 상단 드롭다운 서브메뉴(Submenu) 일괄 강제 노출 및 화면 겹침 오류](#이슈-10-상단-드롭다운-서브메뉴submenu-일괄-강제-노출-및-화면-겹침-오류)
11. [이슈 11: 상단 메뉴 버튼 외곽 테두리(Border) 박스 노출 제거](#이슈-11-상단-메뉴-버튼-외곽-테두리border-박스-노출-제거)
12. [이슈 12: 하단 CTA 초대 카드의 이중 테두리(Double Border) 및 1040px 오버플로우 문제](#이슈-12-하단-cta-초대-카드의-이중-테두리double-border-및-1040px-오버플로우-문제)
13. [이슈 13: 모바일 화면 푸터 메뉴 2단 세로 수평 배치 개편](#이슈-13-모바일-화면-푸터-메뉴-2단-세로-수평-배치-개편)
14. [이슈 14: 푸터 하단 Hugo Blox 관련 외부 링크 문구 완전 제거](#이슈-14-푸터-하단-hugo-blox-관련-외부-링크-문구-완전-제거)

---

## 이슈 1: 다크 모드 및 다크 섹션 내 텍스트 가독성 소멸 문제

### 🔴 증상
- 다크 모드 전환 시, 또는 어두운 배경(Hero, CTA 등)을 가진 섹션에서 제목, 설명문, 링크 텍스트가 어두운 바탕색과 동일한 색상(`#221e1a` / `#292524`)으로 표시되어 글씨가 전혀 보이지 않는 현상 발생.

### 💡 해결 조치
- [`assets/css/custom.css`](file:///Users/gihyunpark/Desktop/Workspace/church-home/assets/css/custom.css) 내 `.dark` 전역 명암 반전 규칙 체계화:
  - 다크 모드 전역 제목: `color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;`
  - 다크 모드 본문/설명: `color: #e2e8f0 !important;`
  - 카드 및 아코디언: 배경 `#1e293b`, 텍스트 `#f8fafc` 고대비 보정.

---

## 이슈 2: 하단 CTA 검은 박스의 너비 오버플로우 및 타이틀 소멸 현상

### 💡 해결 조치
1. 섹션 바깥 배경을 투명(`transparent`) 처리하고, 내부 카드 컨테이너에 직접 `max-width: 64rem !important;` (1024px) 부여.
2. `[data-block-type="cta-card"] h2`에 `color: #ffffff !important;` 적용.

---

## 이슈 3: 상단 메뉴바(Navbar) 배경색과 바디 배경색 이질감 현상

### 💡 해결 조치
- `header`, `#site-header`, `nav.navbar` 전체 배경색을 **`var(--color-paper) !important;` (`#faf8f5`)**로 동일화.

---

## 이슈 4: 히어로(Hero) 영역 배경 이미지 미출력 문제

### 💡 해결 조치
1. 이미지 파일(`bright_sky_bg.webp`)을 정적 서빙 폴더인 **`static/media/`** 경로로 복사 배치.
2. `custom.css`에서 `#section-hero .home-section-bg`에 `background-image` 부여.

---

## 이슈 5: 섹션 상하 여백 과다 및 섹션 타이틀 서식 파편화

### 💡 해결 조치
1. **여백 축소:** 일반 섹션 상하 여백을 **1.75rem (~28px)** 수준으로 축소.
2. **타이틀 포맷 통일:** 모든 섹션 헤더를 **`영문 서브타이틀 + 한국어 타이틀 + 설명문`** 스타일로 통일.

---

## 이슈 6: 정적 미디어 자산 WebP 일괄 변환 및 웹 표준 도입

### 💡 해결 조치
- Python Pillow 라이브러리로 모든 JPG/PNG를 **.webp** 포맷으로 일괄 변환 및 적용.

---

## 이슈 7: GitHub Pages 서비스 연동 및 CI/CD 워크플로우 세팅

### 💡 해결 조치
- GitHub Pages 활성화 및 [`.github/workflows/deploy.yaml`](file:///Users/gihyunpark/Desktop/Workspace/church-home/.github/workflows/deploy.yaml) 자동 배포 구축.

---

## 이슈 8: config/_default/hugo.yaml 내 3가지 스키마 및 디프리케이션 문제 수정

### 💡 해결 조치
- `cascade` 내 `params:` 계층화, `timeout: '600s'`, `Lanczos`, `Smart` 대소문자 규격화 완료.

---

## 이슈 9: 스크롤 시 스티키 메뉴바(Sticky Navbar) 배경 미적용으로 인한 텍스트 겹침 문제

### 💡 해결 조치
- `.page-header` 불투명 배경색 및 그림자 적용.

---

## 이슈 10: 상단 드롭다운 서브메뉴(Submenu) 일괄 강제 노출 및 화면 겹침 오류

### 💡 해결 조치
- `nav.navbar ul` 과잉 `visibility: visible` 제거 후 기본 마우스 호버 동작 복원.

---

## 이슈 11: 상단 메뉴 버튼 외곽 테두리(Border) 박스 노출 제거

### 💡 해결 조치
- 상단 메뉴 버튼 테두리 박스 및 배경 제거.

---

## 이슈 12: 하단 CTA 초대 카드의 이중 테두리(Double Border) 및 1040px 오버플로우 문제

### 💡 해결 조치
- 외부 Wrapper 투명화 및 단일 카드 타깃 1024px 너비 제한 완수.

---

## 이슈 13: 모바일 화면 푸터 메뉴 2단 세로 수평 배치 개편

### 💡 해결 조치
- 모바일 푸터 서브 메뉴를 가로 2단(`grid-cols-2`) 병렬 레이아웃으로 변경.

---

## 이슈 14: 푸터 하단 Hugo Blox 관련 외부 링크 문구 완전 제거

### 🔴 증상
- 푸터 최하단에 "Made with Hugo Blox..." 외부 템플릿 링크 텍스트가 노출되는 현상.

### 💡 해결 조치
- [`layouts/_partials/site_footer.html`](file:///Users/gihyunpark/Desktop/Workspace/church-home/layouts/_partials/site_footer.html) 내 어트리뷰션 렌더링 블록을 완전히 삭제하고, `custom.css`에 `.powered-by { display: none !important; }` 규칙을 선언하여 해당 어트리뷰션 문구를 100% 제거했습니다.

---

## 🌐 최종 프로젝트 상태

- **공개 웹사이트 URL:** 👉 **[https://ccumgol.github.io/church-home/](https://ccumgol.github.io/church-home/)**
- **소스 리포지터리:** [`ccumgol/church-home`](https://github.com/ccumgol/church-home)
