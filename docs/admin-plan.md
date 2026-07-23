# Admin 콘텐츠 관리 페이지 구축 계획

## 배경 및 목적
샘플교회 홈페이지(`church-home`)는 Hugo 정적 사이트로, 현재 콘텐츠 추가·수정 시 관리자가 직접 GitHub의 파일을 편집하거나 로컬에서 마크다운 파일을 작성해야 합니다. 여러 담당자가 **설교 자료**와 **행사 안내**를 온라인에서 직접 입력할 수 있는 Admin 페이지가 필요합니다.

---

## 🔑 기술 방식 비교 및 추천

Hugo + GitHub Pages 조합에서 Admin 페이지를 구현하는 방식은 크게 두 가지입니다.

| 방식 | 설명 | 장점 | 단점 | 적합도 |
|------|------|------|------|--------|
| **① Decap CMS (구 Netlify CMS)** | GitHub 저장소에 직접 PR/커밋하는 오픈소스 Git 기반 CMS | 완전 무료, Hugo에 최적화, 추가 서버 불필요 | 관리자 전원 GitHub 계정 필요 | ✅ 추천 |
| **② Firebase + 커스텀 Admin UI** | Firestore에 콘텐츠 저장 → GitHub Actions로 Hugo 빌드 트리거 | 이메일 로그인 가능, UI 자유롭게 디자인 가능 | 개발 공수 매우 높음, Firebase 유지비용 | ⚠️ 과도한 복잡도 |

### 추천: Decap CMS 방식
서버 비용 없이, 현재 GitHub Pages 구조 그대로 유지하면서 웹 브라우저에서 `/admin/` 페이지에 접속해 GitHub 계정으로 로그인하면 설교·행사 콘텐츠를 GUI로 입력할 수 있습니다.

---

## 🔐 인증 방식

GitHub Pages에서 Decap CMS를 사용할 때 OAuth 처리를 위한 무료 서비스가 필요합니다.

- **`sveltia-cms-auth`** — Cloudflare Workers에 무료 배포하는 OAuth 중계 서비스
- **또는 `oauth-popup-flow`** — GitHub OAuth App 직접 생성 방식 (추가 서버 없이 동작)

> **주의:** 관리자로 등록할 모든 사용자는 **GitHub 계정**이 있어야 하며, 리포지터리에 **Collaborator 권한**이 부여되어 있어야 합니다.

---

## 📋 구현 범위

### 1단계 — 메뉴 변경 ✅ 완료 (2026-07-23)
- `행사안내`를 독립 최상위 메뉴(weight: 30)에서 `커뮤니티` 하위 메뉴(weight: 76)로 이동

### 2단계 — Decap CMS Admin 페이지 설치

#### [NEW] `static/admin/index.html`
- Decap CMS 진입점. GitHub OAuth 로그인 UI를 렌더링하는 단일 HTML 파일

#### [NEW] `static/admin/config.yml`
- CMS 설정 파일. 컬렉션(설교, 행사) 정의, 입력 필드 매핑

**설교(sermons) 컬렉션 필드:**
- `title` — 설교 제목
- `date` — 예배일
- `speaker` — 설교자
- `passage` — 성경본문 (예: 요한복음 1:14-18)
- `book` — 성경권 (성경권별 태그 필터용)
- `youtube_url` — 유튜브 영상 링크
- `tags` — 절기/카테고리 태그 목록
- `body` — 설교 원고 (마크다운)

**행사안내(events) 컬렉션 필드:**
- `title` — 행사 제목
- `date` — 행사 시작일
- `end_date` — 행사 종료일
- `location` — 장소
- `description` — 간단 설명
- `image` — 행사 이미지
- `body` — 상세 내용 (마크다운)

### 3단계 — GitHub OAuth App 설정 (사용자 직접 수행)

아래 두 가지는 **사용자가 직접** GitHub 설정에서 수행해야 합니다.

1. **GitHub OAuth App 생성:**
   - 경로: `GitHub Settings > Developer Settings > OAuth Apps > New OAuth App`
   - Application name: `샘플교회 Admin`
   - Homepage URL: `https://ccumgol.github.io/church-home/`
   - Authorization callback URL: `https://{your-worker}.workers.dev/callback`

2. **리포지터리 Collaborator 추가:**
   - 경로: `ccumgol/church-home > Settings > Collaborators`
   - 관리자로 추가할 GitHub 사용자를 초대

### 4단계 — OAuth Proxy 배포 (Cloudflare Workers 무료 플랜)

- Cloudflare Workers 무료 플랜으로 OAuth 중계 서비스(`sveltia-cms-auth`)를 배포
- 매달 10만 요청 무료 → 교회 규모에 충분
- Cloudflare 계정이 없는 경우 무료 가입 후 진행

---

## ❓ 진행 전 확인 사항

1. **관리자 인원 수와 GitHub 계정 보유 여부**
   - 설교/행사를 입력할 담당자들이 GitHub 계정이 있나요?
   - 없다면 Firebase 방식(이메일 로그인)이 더 적합할 수 있습니다.

2. **Cloudflare 계정 보유 여부**
   - OAuth Proxy 배포에 Cloudflare 계정이 필요합니다 (무료 가입 가능).
   - 없다면 대안 방식(Netlify OAuth Proxy)을 사용할 수 있습니다.

3. **행사안내 페이지 현재 상태**
   - `/event/` 경로에 별도 콘텐츠 파일이 있나요?
   - 없다면 이번에 Admin과 함께 구성할 수 있습니다.

---

## 🔍 검증 계획

- `hugo server -D`로 `/admin/` 경로 접근 확인
- GitHub 로그인 → 설교 신규 작성 → 마크다운 자동 생성 확인
- 자동 배포(GitHub Actions) 트리거 확인 → 10~15분 내 라이브 사이트 반영 확인

---

## 📅 작성 일시
2026-07-23
