# 샘플교회 (church-home) 프로젝트 매뉴얼 & 운영 지침서

본 매뉴얼은 **샘플교회(church-home)** 홈페이지의 구조, 콘텐츠 관리 방법, 디자인 시스템, 그리고 주요 기능의 유지보수를 위한 종합 지침서입니다.

---

## 📌 목차
1. [프로젝트 개요 및 기술 스택](#프로젝트-개요-및-기술-스택)
2. [디자인 시스템 및 테마 구성](#디자인-시스템-및-테마-구성)
3. [콘텐츠 수정 및 파일 구조](#콘텐츠-수정-및-파일-구조)
4. [유튜브 최신 설교/찬양 플레이리스트 연동 가이드](#유튜브-최신-설교찬양-플레이리스트-연동-가이드)
5. [이미지 자산 최적화 (WebP 가이드)](#이미지-자산-최적화-webp-가이드)
6. [배포 및 GitHub Pages 연동](#배포-및-github-pages-연동)
7. [자주 묻는 질문 (FAQ) & 유지보수](#자주-묻는-질문-faq--유지보수)

---

## 1. 프로젝트 개요 및 기술 스택

- **Static Site Generator:** Hugo v0.164.0+extended
- **Theme/Framework:** HugoBlox (TailwindCSS기반 모듈형 프레임워크)
- **Primary Color:** Warm Terracotta (`#D95D12`)
- **Base Background:** Creamy Warm Paper (`#faf8f5` / Dark: `#0f172a`)
- **Hosting/CI:** GitHub Pages & GitHub Actions (`.github/workflows/deploy.yaml`)
- **Live URL:** `https://ccumgol.github.io/church-home/`

---

## 4. 유튜브 최신 설교/찬양 플레이리스트 연동 가이드

히어로(Hero) 섹션 바로 아래에는 유튜브 채널의 특정 플레이리스트에 새로 올라오는 **최신 설교/찬양 영상이 자동으로 연속 갱신되어 상단 노출**되는 플레이어가 탑재되어 있습니다.

### 플레이리스트 변경 방법
1. [`content/_index.md`](file:///Users/gihyunpark/Desktop/Workspace/church-home/content/_index.md) 파일을 엽니다.
2. `latest-sermon` 섹션 내부의 `youtube_playlist` 숏코드 `list` 값을 원하는 유튜브 재생목록 ID로 변경합니다:
   ```yaml
   {{< youtube_playlist list="변경할_재생목록_ID" title="샘플교회 최신 설교 영상" >}}
   ```
3. 수정 후 커밋 & 푸시하면 페이지 첫 화면에 해당 플레이리스트의 최신 영상이 자동으로 떠서 재생됩니다.

---

## 5. 이미지 자산 최적화 (WebP 가이드)

- 모든 배경 이미지 및 미디어 자산은 **WebP 포맷**을 사용합니다.
- 이미지는 **`static/media/`** 경로에 위치해야 정적 서버 URL (`/media/파일명.webp`)로 직접 서빙됩니다.

---

## 6. 배포 및 GitHub Pages 연동

- **자동 배포:** `main` 브랜치에 `git push` 시 GitHub Actions가 자동 작동하여 사이트를 미니파이 빌드 및 GitHub Pages로 업로드합니다.
- **수동 검증 빌드:**
  ```bash
  hugo --gc --minify
  ```
