# 샘플교회 (church-home) 프로젝트 매뉴얼 & 운영 지침서

본 매뉴얼은 **샘플교회(church-home)** 홈페이지의 구조, 콘텐츠 관리 방법, 디자인 시스템, 그리고 주요 기능의 유지보수를 위한 종합 지침서입니다.

---

## 📌 목차
1. [프로젝트 개요 및 기술 스택](#프로젝트-개요-및-기술-스택)
2. [디자인 시스템 및 테마 구성](#디자인-시스템-및-테마-구성)
3. [콘텐츠 수정 및 파일 구조](#콘텐츠-수정-및-파일-구조)
4. [주일설교 4단 동적 태그 레이아웃 & 필터링 연동 가이드](#주일설교-4단-동적-태그-레이아웃--필터링-연동-가이드)
5. [유튜브 최신 설교/찬양 플레이리스트 연동 가이드](#유튜브-최신-설교찬양-플레이리스트-연동-가이드)
6. [이미지 자산 최적화 (WebP 가이드)](#이미지-자산-최적화-webp-가이드)
7. [배포 및 GitHub Pages 연동](#배포-및-github-pages-연동)
8. [자주 묻는 질문 (FAQ) & 유지보수](#자주-묻는-질문-faq--유지보수)

---

## 1. 프로젝트 개요 및 기술 스택

- **Static Site Generator:** Hugo v0.164.0+extended
- **Theme/Framework:** HugoBlox (TailwindCSS기반 모듈형 프레임워크)
- **Primary Color:** Warm Terracotta (`#D95D12`)
- **Base Background:** Creamy Warm Paper (`#faf8f5` / Dark: `#0f172a`)
- **Hosting/CI:** GitHub Pages & GitHub Actions (`.github/workflows/deploy.yaml`)
- **Live URL:** `https://ccumgol.github.io/church-home/`

---

## 4. 주일설교 4단 동적 태그 레이아웃 & 필터링 연동 가이드

`content/sermons/` 디렉터리에 새로운 `.md` 파일을 추가하는 것만으로 4단 분할 레이아웃에 자동 축적되며, 우측 태그 클릭 시 즉시 해당 설교들만 필터링되어 노출됩니다.

### 4.1 필터링 동작 방식 (Client-side Data Filtering)
- **태그 클릭 시:** 우측 4번째 단의 `#마태복음`, `#요한복음`, `#담임목사` 등 흰색 태그 버튼을 클릭하면, 페이지 리로드 없이 즉시 해당 조건에 맞는 설교 카드들만 화면에 즉각적으로 필터링됩니다.
- **클릭한 태그 스타일:** 선택한 태그 버튼은 오렌지색 하이라이트 배경으로 전환되며, 상단에 `[#태그명 필터 검색 결과]` 상태바와 `[전체 설교 보기]` 리셋 버튼이 나타납니다.
- **토글 동작:** 활성화된 태그 버튼을 한 번 더 누르면 전체 보기 상태로 즉시 돌아옵니다.

---

## 5. 유튜브 최신 설교/찬양 플레이리스트 연동 가이드

- 메인 페이지 히어로 섹션 직하단에는 특정 유튜브 플레이리스트의 최신 영상이 자동으로 떠서 재생됩니다.
- [`content/_index.md`](file:///Users/gihyunpark/Desktop/Workspace/church-home/content/_index.md)의 `youtube_playlist` 숏코드 `list` 매개변수 값으로 조절할 수 있습니다.

---

## 6. 배포 및 GitHub Pages 연동

- **자동 배포:** `main` 브랜치에 `git push` 시 GitHub Actions가 자동 작동하여 사이트를 미니파이 빌드 및 GitHub Pages로 업로드합니다.
- **수동 검증 빌드:**
  ```bash
  hugo --gc --minify
  ```
