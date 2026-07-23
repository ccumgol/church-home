# 샘플교회 (church-home) 매뉴얼 & 개발 운영 가이드

본 매뉴얼은 **샘플교회(church-home)** 웹사이트 프로젝트의 시스템 구조, 디자인 시스템, 콘텐츠 관리 방법 및 로컬/배포 운영 절차를 종합적으로 정리한 가이드입니다.

---

## 1. 📌 프로젝트 개요 및 기술 스택

- **프로젝트 명:** 샘플교회 공식 홈페이지 (`church-home`)
- **주요 프레임워크:** Hugo Extended `v0.164.0` + HugoBlox Kit
- **웹 호스팅 & 배포:** GitHub Pages (`https://ccumgol.github.io/church-home/`) + GitHub Actions
- **디자인 컨셉:** Hallmark Design System (Sacred Warmth & Editorial Clarity)
- **주요 폰트:**
  - Display/Headings: **MaruBuri (마루부리)** / Nanum Myeongjo (나눔명조)
  - Body: **Noto Sans KR**
- **주요 컬러 팔레트:**
  - Warm Paper (배경): `#faf8f5` / `#f4efe9`
  - Terracotta Accent (주 포인트): `#d95d12` (Hover: `#c24e09`)
  - Warm Ink (텍스트): `#221e1a` / `#292524`
  - Dark Mode Paper: `#0f172a` / `#1e293b`

---

## 2. 📂 디렉터리 구조 및 핵심 파일

```
church-home/
├── .github/
│   └── workflows/
│       └── deploy.yaml         # GitHub Pages 자동 배포 CI/CD 워크플로우
├── assets/
│   ├── css/
│   │   └── custom.css          # 전역 디자인 시스템 및 고대비 커스텀 스타일
│   └── media/                  # 미디어 원본 자산 디렉터리 (WebP)
├── config/_default/
│   ├── hugo.yaml               # Hugo 기본 설정 (baseURL, title 등)
│   ├── languages.yaml          # 언어 설정
│   ├── menus.yaml              # 네비게이션 상단/하단 메뉴 구조
│   └── params.yaml             # HugoBlox 테마 파라미터
├── content/
│   ├── _index.md               # 메인 랜딩 페이지 (Hero, Schedule, Values, FAQ, CTA)
│   ├── about/                  # 교회소개, 섬기는 사람들, 오시는 길
│   ├── sermons/                # 주일 설교 / 말씀
│   └── ...
├── docs/                       # 프로젝트 운영 및 이슈 보고 문서
│   ├── manual.md               # [현재 파일] 개발 운영 매뉴얼
│   └── issue-report.md         # 이슈 트래킹 및 트러블슈팅 보고서
├── layouts/                    # 템플릿 커스텀 숏코드 (pastor_greeting 등)
├── static/
│   └── media/                  # Web 루트(/media/...) 직접 서빙 미디어 자산
└── hugo.toml                   # Root Hugo 설정 파일
```

---

## 3. 🎨 디자인 규칙 및 레이아웃 지침

1. **컨텐츠 영역 너비 제한 (Max Width 1024px)**
   - 모든 메인 섹션 및 하단 CTA 박스는 `max-w-5xl` (1024px) 및 `mx-auto`로 제한되어 수평 1:1 라인을 형성합니다.
2. **타이틀 표시 규격 통일**
   - 각 섹션 헤더는 **`영문 서브타이틀 (Terracotta Uppercase) + 한국어 타이틀 (MaruBuri Serif) + 설명문`** 3단 구조로 표시됩니다.
3. **컴팩트 섹션 여백**
   - 일반 섹션 상하 padding: 모바일 `1.25rem (~20px)`, 데스크톱 `1.75rem (~28px)`
   - '예배 및 모임 시간' 섹션: 상하 `0.6rem` ~ `0.85rem`로 타이트하게 밀착.
4. **이미지 표준 포맷 (WebP)**
   - 웹사이트 내 모든 정적 이미지는 차세대 표준 포맷인 **`.webp`**를 사용합니다.

---

## 4. 📝 콘텐츠 변경 가이드

### 4.1 메인 랜딩 페이지 (`content/_index.md`)

- **히어로 영역 배경 변경:**
  - 이미지 파일 위치: `static/media/bright_sky_bg.webp`
  - CSS 적용 위치: `assets/css/custom.css` 내 `.block-hero .home-section-bg`

- **예배 및 모임 시간 카드 줄바꿈:**
  - 카드의 시간과 장소를 구분할 때 명시적 `<br />` 태그를 사용합니다.
  - 예시: `"**매주 주일 오전 11:00 AM**<br />본당 2층 & YouTube Live 생중계"`

---

## 5. 🛠️ 로컬 개발 및 실행 방법

### 로컬 테스트 서버 실행
```bash
hugo server -D
```
- 접속 주소: `http://localhost:1313/` (포트 사용 중일 경우 자동 변경)

### Production 빌드 검증
```bash
hugo --gc --minify
```

---

## 6. 🚀 GitHub Pages 배포 절차

1. 소스 수정 후 Git Commit & Push:
   ```bash
   git add .
   git commit -m "feat: 업데이트 내역 작성"
   git push origin main
   ```
2. `main` 브랜치에 푸시가 완료되면 `.github/workflows/deploy.yaml`이 자동으로 동작합니다.
3. 약 1분 후 **[https://ccumgol.github.io/church-home/](https://ccumgol.github.io/church-home/)**에서 라이브 웹사이트를 확인하실 수 있습니다.
