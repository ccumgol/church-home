# 샘플교회 (church-home) 프로젝트 매뉴얼 & 운영 지침서

본 매뉴얼은 **샘플교회(church-home)** 홈페이지의 구조, 콘텐츠 관리 방법, 디자인 시스템, 그리고 주요 기능의 유지보수를 위한 종합 지침서입니다.

---

## 📌 목차
1. [프로젝트 개요 및 기술 스택](#프로젝트-개요-및-기술-스택)
2. [디자인 시스템 및 테마 구성](#디자인-시스템-및-테마-구성)
3. [콘텐츠 수정 및 파일 구조](#콘텐츠-수정-및-파일-구조)
4. [주일설교 영상 축적 및 신규 등록 가이드](#주일설교-영상-축적-및-신규-등록-가이드)
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

## 4. 주일설교 영상 축적 및 신규 등록 가이드

`content/sermons/` 디렉터리에 새로운 `.md` 파일을 추가하는 것만으로 유튜브 썸네일 자동 추출, 주일설교 목록 카드 생성, 그리고 상세 페이지 영상/원고 배치가 자동으로 처리됩니다.

### 4.1 새 주일설교 생성 명령어 (Archetype)
터미널에서 아래 명령어를 실행하여 새 주일설교 양식을 자동 생성합니다:
```bash
hugo new sermons/2026-07-26-sermon-title.md
```

### 4.2 주일설교 `.md` 작성 양식 예시
```yaml
---
title: "은혜 위에 더하는 은혜"
date: 2026-07-19
speaker: "담임목사"
passage: "요한복음 1:14-18"
youtube_url: "https://www.youtube.com/watch?v=SCY3qabS1XQ"
draft: false
---

### 설교 개요
여기에 설교 원고 본문 내용을 자유롭게 작성합니다.
```

### 4.3 자동 처리되는 표시 항목
- **목록 페이지 (`/sermons/`):** 유튜브 URL에서 고화질 썸네일(`hqdefault.jpg`)을 자동 추출하여 `썸네일 + 제목 + 성경본문 + 설교자 + 예배일`이 카드형 그리드로 표시됩니다.
- **상세 페이지 (`/sermons/상세주소`):** 상단부터 `제목 + 성경본문 뱃지 + 유튜브 16:9 반응형 영상 화면 + 설교자/예배일 메타바 + 설교 원고 카드` 순으로 자동 배치됩니다.

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
