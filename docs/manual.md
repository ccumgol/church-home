# 샘플교회 (church-home) 프로젝트 매뉴얼 & 운영 지침서

본 매뉴얼은 **샘플교회(church-home)** 홈페이지의 구조, 콘텐츠 관리 방법, 디자인 시스템, 그리고 주요 기능의 유지보수를 위한 종합 지침서입니다.

---

## 📌 목차
1. [프로젝트 개요 및 기술 스택](#프로젝트-개요-및-기술-스택)
2. [디자인 시스템 및 테마 구성](#디자인-시스템-및-테마-구성)
3. [콘텐츠 수정 및 파일 구조](#콘텐츠-수정-및-파일-구조)
4. [주일설교 4단 레이아웃 & 영상 축적 가이드](#주일설교-4단-레이아웃--영상-축적-가이드)
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

## 4. 주일설교 4단 레이아웃 & 영상 축적 가이드

`content/sermons/` 디렉터리에 새로운 `.md` 파일을 추가하는 것만으로 4단 분할(좌측 3단 설교 카드 + 우측 4번째 단 태그 사이드바) 레이아웃에 자동 축적됩니다.

### 4.1 주일설교 목록 4단 분할 구조
- **좌측 3단 (col-span-3):** 유튜브 썸네일, 제목, 성경본문, 설교자, 예배일이 담긴 설교 포스트 카드 목록.
- **우측 4번째 단 (col-span-1):** 은은한 배경색의 사이드바 컨테이너 내부에 **`성경권별, 설교자별, 절기별`** 태그가 흰색 바탕 버튼 형태(`text-xs`)로 도드라지게 정렬됩니다.

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
