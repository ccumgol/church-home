# Cloudflare Pages 이전 계획 및 절차

## 배경 및 목적

현재 샘플교회 홈페이지(`church-home`)는 **GitHub Pages**로 서비스 중입니다. 향후 Decap CMS Admin 페이지 운영의 편의성과 사이트 성능 향상을 위해 **Cloudflare Pages**로 이전을 결정하였습니다.

---

## 🏗️ Cloudflare 프로젝트 구조

Cloudflare에서는 총 **2개의 프로젝트**를 생성해야 합니다.

```
Cloudflare 계정
├── 📄 Pages:   "church-home"          ← 홈페이지 본체 (Hugo 빌드 + 배포)
└── ⚙️ Workers: "church-admin-auth"    ← Admin 로그인 중계 (OAuth Proxy)
```

### 📄 1. Cloudflare Pages — `church-home`

**역할:** GitHub 저장소의 Hugo 코드를 자동 빌드하여 웹사이트로 서비스 (웹 호스팅)

| 항목 | 내용 |
|------|------|
| **무엇을 하나** | GitHub 저장소의 코드를 자동 빌드하여 웹사이트로 서비스 |
| **생성 위치** | Cloudflare 대시보드 → Workers & Pages → **Create → Pages → Connect to Git** |
| **연결 대상** | GitHub `ccumgol/church-home` 저장소 |
| **자동 배포** | `main` 브랜치에 Push될 때마다 자동으로 빌드 + 배포 |
| **발급 주소** | `https://church-home.pages.dev/` |

#### 빌드 설정

| 설정 항목 | 값 |
|-----------|-----|
| Framework preset | `Hugo` |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| 환경변수 `HUGO_VERSION` | `0.164.0` |

### ⚙️ 2. Cloudflare Workers — `church-admin-auth`

**역할:** Admin 페이지(`/admin/`)에서 "GitHub 로 로그인" 버튼을 누를 때, GitHub OAuth 인증을 안전하게 중계해주는 작은 서버

| 항목 | 내용 |
|------|------|
| **무엇을 하나** | Decap CMS ↔ GitHub 사이의 OAuth 로그인을 중계 |
| **생성 위치** | Cloudflare 대시보드 → Workers & Pages → **Create → "Start with Hello World!"** |
| **코드** | [admin-setup-guide.md](./admin-setup-guide.md)에 있는 JavaScript 코드를 붙여넣기 |
| **발급 주소** | `https://church-admin-auth.office-a67.workers.dev/` |

#### 환경변수 설정 (Settings → Variables & Secrets)

| Variable name | Value | 비고 |
|---------------|-------|------|
| `GITHUB_CLIENT_ID` | GitHub OAuth App에서 복사 | 평문 |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App에서 복사 | **Encrypt 체크** |

#### 왜 Worker가 필요한가?

GitHub OAuth 인증에는 `Client Secret`이라는 비밀 키가 필요합니다. 이 키는 **절대로 브라우저(프론트엔드)에 노출되면 안 됩니다.** Worker가 이 비밀 키를 안전하게 보관하면서, 브라우저 대신 GitHub에 인증 요청을 보내주는 "중간 다리" 역할을 합니다.

```
사용자 브라우저                    Cloudflare Worker              GitHub
  │                                   │                           │
  │ 1. "로그인" 클릭                    │                           │
  │ ──────────────────────────────────>│                           │
  │                                   │ 2. GitHub 로그인 페이지로   │
  │                                   │    리다이렉트               │
  │                                   │ ──────────────────────────>│
  │                                   │                           │
  │ 3. 사용자가 GitHub에서 허가         │                           │
  │ <──────────────────────────────────────────────────────────────│
  │                                   │                           │
  │ 4. 인증코드를 Worker에게 전달       │                           │
  │ ──────────────────────────────────>│                           │
  │                                   │ 5. Secret 키 + 인증코드로  │
  │                                   │    토큰 요청 (비밀 통신)    │
  │                                   │ ──────────────────────────>│
  │                                   │                           │
  │                                   │ 6. 토큰 수신               │
  │                                   │ <──────────────────────────│
  │ 7. 토큰 전달 → 로그인 완료!         │                           │
  │ <──────────────────────────────────│                           │
```

> **참고:** Admin 기능을 사용하지 않는다면 Workers는 필요 없고 Pages만 있으면 됩니다.

### 두 프로젝트의 연결 관계

`static/admin/config.yml` 파일 안에서 두 프로젝트가 연결됩니다:

```yaml
backend:
  base_url: https://church-admin-auth.office-a67.workers.dev  # ← Worker 주소

site_url: https://church-home.pages.dev/  # ← Pages 주소
```

---

## 📊 서비스 구조 비교

### 이전 전 (GitHub Pages)
```
GitHub Repo → GitHub Actions (빌드/배포) → GitHub Pages CDN → 사용자
Admin 로그인 → Cloudflare Workers (OAuth 중계) → GitHub 인증
```

### 이전 후 (Cloudflare Pages)
```
GitHub Repo → Cloudflare Pages 자동 빌드 → 전 세계 CDN 330+ → 사용자
Admin 로그인 → Cloudflare Workers (OAuth 중계) → GitHub 인증
```

---

## 🔑 GitHub Pages vs Cloudflare Pages 비교

| 항목 | GitHub Pages | Cloudflare Pages |
|------|-------------|-----------------|
| **속도** | 미국 서버 1곳 | 전 세계 330+ CDN 엣지 |
| **빌드** | GitHub Actions 별도 설정 | Cloudflare가 자동 빌드 |
| **Admin OAuth** | 별도 Cloudflare Worker 필요 | 동일 (Worker 필요) |
| **커스텀 도메인** | 가능 | 가능 + 무료 SSL 자동 설정 |
| **PR 미리보기** | 없음 | PR마다 자동 미리보기 URL 생성 |
| **비용** | 무료 | 무료 (500 빌드/월) |
| **GitHub Actions** | 필요 | 불필요 (Cloudflare가 대체) |

---

## 📋 이전 절차

### STEP 1 — Cloudflare Pages 프로젝트 생성 (브라우저 직접 수행)

1. **[https://dash.cloudflare.com](https://dash.cloudflare.com)** 로그인
2. 왼쪽 메뉴 → **Workers & Pages** → **Create → Pages → Connect to Git**
3. GitHub 계정 연결 → `ccumgol/church-home` 저장소 선택 → **Begin setup**
4. 빌드 설정 입력 (위의 "빌드 설정" 표 참고)
5. **"Environment variables (advanced)"** 클릭 후 `HUGO_VERSION` = `0.164.0` 추가
6. **"Save and Deploy"** 클릭 → 약 2분 후 `xxxx.pages.dev` 주소 발급

---

### STEP 2 — baseURL 업데이트 (코드 수정)

Cloudflare Pages 주소 발급 후 아래 파일들의 `baseURL`을 수정:

#### `hugo.toml` (프로젝트 루트)
```toml
baseURL = 'https://church-home.pages.dev/'
```

#### `config/_default/hugo.yaml`
```yaml
baseURL: 'https://church-home.pages.dev/'
```

#### `static/admin/config.yml`
```yaml
site_url: https://church-home.pages.dev/
```

---

### STEP 3 — Cloudflare Workers (OAuth Proxy) 생성

[admin-setup-guide.md](./admin-setup-guide.md)의 STEP 2를 참고하여 Worker를 생성합니다.

---

### STEP 4 — GitHub Actions 워크플로우 처리

Cloudflare Pages가 자동으로 빌드·배포를 담당하므로 `.github/workflows/deploy.yaml`이 중복됩니다.

> **템플릿 정책:** GitHub Pages 사용자를 위해 `deploy.yaml` 파일은 **삭제하지 않고 리포지터리에 유지**합니다.
> Cloudflare Pages를 쓰는 경우 파일 상단의 `on:` 트리거를 주석 처리하면 비활성화됩니다.

---

## 🔗 템플릿 사용자 안내

> **이 리포지터리는 교회 홈페이지 템플릿입니다.**
> Fork 후 본인의 호스팅 환경에 맞게 선택하세요.

| 호스팅 선택 | 필요 작업 |
|------------|----------|
| **GitHub Pages** | `baseURL` 변경 + GitHub Pages 설정 활성화 |
| **Cloudflare Pages** | `baseURL` 변경 + Cloudflare Pages 프로젝트 생성 + `deploy.yaml` 비활성화 |

`baseURL`은 어느 호스팅을 선택하든 **반드시 본인 주소로 변경**해야 합니다.

---

## 📅 진행 현황

| 단계 | 내용 | 상태 |
|------|------|------|
| STEP 0 | 이전 계획 수립 및 비교 분석 | ✅ 완료 (2026-07-23) |
| STEP 0-1 | `deploy.yaml` 템플릿 안내 주석 추가 | ✅ 완료 (2026-07-23) |
| STEP 1 | Cloudflare Pages 프로젝트 생성 | ✅ 완료 (2026-07-23) |
| STEP 2 | `baseURL` 및 Admin config 업데이트 | ✅ 완료 (2026-07-23) |
| STEP 3 | Cloudflare Workers (OAuth Proxy) 생성 | ✅ 완료 (2026-07-23) |
| STEP 4 | 최종 배포 및 OAuth 연결 확인 | ✅ 완료 (2026-07-23) |

---

## 🔗 관련 문서

- [README.md](./README.md) — 전체 문서 인덱스
- [admin-plan.md](./admin-plan.md) — Admin CMS 구축 계획
- [admin-setup-guide.md](./admin-setup-guide.md) — Admin 활성화 가이드 (OAuth + Workers)
