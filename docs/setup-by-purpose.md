# 용도별 설정 가이드

이 문서는 교회 홈페이지 템플릿(`church-home`)을 사용할 때, **용도에 따라 어떤 설정이 필요한지** 단계별로 정리한 가이드입니다.

---

## 📋 전체 요약

| 용도 | GitHub 설정 | Cloudflare 설정 | 난이도 |
|------|------------|----------------|--------|
| **① 코드 저장만** | 리포지터리 생성 | 없음 | ⭐ |
| **② 홈페이지 서비스** | 리포지터리 + Pages 연결 허용 | Pages 프로젝트 생성 | ⭐⭐ |
| **③ Admin CMS 추가** | ② + OAuth App 생성 | ② + Workers 생성 | ⭐⭐⭐ |
| **④ 커스텀 도메인 연결** | 없음 (Cloudflare에서 처리) | ② + 도메인 설정 | ⭐⭐ |
| **⑤ 여러 관리자 운영** | ③ + Collaborator 초대 | 추가 없음 | ⭐ |

---

## ① 코드 저장만 (GitHub만 사용)

**목적:** Hugo 소스 코드를 GitHub에 보관. 웹사이트 서비스는 하지 않음.

### GitHub 설정

| 설정 | 값 |
|------|-----|
| 리포지터리 생성 | `New repository` → 이름 입력 (예: `church-home`) |
| 공개 여부 | Public (무료) 또는 Private |

### Cloudflare 설정

없음.

### 필요한 파일 수정

없음. Fork 또는 Clone만 하면 끝.

---

## ② 홈페이지 웹 서비스 (GitHub + Cloudflare Pages)

**목적:** Hugo로 빌드된 교회 홈페이지를 인터넷에 공개

### GitHub 설정

| 설정 | 위치 | 설명 |
|------|------|------|
| 리포지터리 | github.com | ①과 동일 |
| Cloudflare 앱 연결 허용 | 리포지터리 Settings → Integrations | Cloudflare Pages가 코드를 읽을 수 있도록 허용 (Pages 생성 시 자동으로 요청됨) |

### Cloudflare 설정

| 설정 | 위치 | 값 |
|------|------|-----|
| **Pages 프로젝트 생성** | Workers & Pages → Create → Pages | GitHub 저장소 연결 |
| Framework preset | 빌드 설정 화면 | `Hugo` |
| Build command | 빌드 설정 화면 | `hugo --gc --minify` |
| Build output directory | 빌드 설정 화면 | `public` |
| 환경변수 `HUGO_VERSION` | 빌드 설정 → Environment variables | `0.164.0` |

### 필요한 파일 수정

| 파일 | 수정 내용 |
|------|----------|
| `hugo.toml` | `baseURL`을 발급받은 `xxxx.pages.dev` 주소로 변경 |
| `config/_default/hugo.yaml` | `baseURL`을 동일하게 변경 |
| `config/_default/params.yaml` | 교회 이름, 주소, 전화번호 등 본인 정보로 변경 |

### 작동 원리

```
코드 Push → Cloudflare가 자동 감지 → Hugo 빌드 → 전 세계 CDN 배포 → 사용자 접속
```

> **이 단계까지만 설정하면** 홈페이지가 인터넷에 공개됩니다. Admin 기능 없이 코드를 직접 수정해서 콘텐츠를 관리하는 방식입니다.

---

## ③ Admin CMS 추가 (② + GitHub OAuth App + Cloudflare Workers)

**목적:** 코드를 몰라도 웹 브라우저에서 설교/행사를 입력·관리할 수 있는 Admin 페이지 활성화

> ⚠️ **반드시 ②번 설정이 완료된 상태**에서 진행하세요.

### GitHub 추가 설정

| 설정 | 위치 | 값 |
|------|------|-----|
| **OAuth App 생성** | Settings → Developer Settings → OAuth Apps → New | 아래 표 참고 |

#### OAuth App 입력값

| 항목 | 값 |
|------|-----|
| Application name | `교회이름 Admin` (자유롭게) |
| Homepage URL | `https://xxxx.pages.dev/` (②에서 발급받은 주소) |
| Authorization callback URL | `https://Worker이름.서브도메인.workers.dev/callback` (Worker 생성 후 입력) |

> 생성 후 **Client ID**와 **Client Secret**을 반드시 복사해 두세요.

### Cloudflare 추가 설정

| 설정 | 위치 | 값 |
|------|------|-----|
| **Worker 생성** | Workers & Pages → Create → "Start with Hello World!" | 이름: `church-admin-auth` 등 |
| Worker 코드 입력 | Worker → Edit Code | [admin-setup-guide.md](./admin-setup-guide.md)의 JavaScript 코드 붙여넣기 |
| 환경변수 `GITHUB_CLIENT_ID` | Worker → Settings → Variables & Secrets | GitHub에서 복사한 Client ID |
| 환경변수 `GITHUB_CLIENT_SECRET` | Worker → Settings → Variables & Secrets | GitHub에서 복사한 Secret (**Encrypt 체크**) |

### 필요한 파일 수정

| 파일 | 수정 내용 |
|------|----------|
| `static/admin/config.yml` | `base_url`을 실제 Worker 주소로 변경 |
| `static/admin/config.yml` | `site_url`을 실제 Pages 주소로 변경 |
| `static/admin/config.yml` | `repo`를 본인 GitHub 리포지터리로 변경 |

#### config.yml 수정 예시
```yaml
backend:
  name: github
  repo: 본인계정/리포지터리이름        # ← 변경
  branch: main
  base_url: https://Worker이름.서브도메인.workers.dev  # ← Worker 주소
  auth_endpoint: /auth

site_url: https://xxxx.pages.dev/  # ← Pages 주소
```

### 작동 원리

```
Admin 접속 → "GitHub 로그인" 클릭
  → Cloudflare Worker가 GitHub OAuth 중계
  → 로그인 성공 → Decap CMS 화면 표시
  → 설교/행사 입력 → "Publish" 클릭
  → GitHub에 자동 커밋 → Cloudflare Pages 자동 빌드
  → 약 2분 후 홈페이지에 반영
```

---

## ④ 커스텀 도메인 연결 (② + 도메인 설정)

**목적:** `xxxx.pages.dev` 대신 `www.우리교회.com` 같은 자체 도메인 사용

> ⚠️ **반드시 ②번 설정이 완료된 상태**에서 진행하세요.

### 사전 준비

- 도메인 구매 (Cloudflare Registrar, Namecheap, GoDaddy 등)

### GitHub 설정

추가 없음.

### Cloudflare 설정

| 설정 | 위치 | 설명 |
|------|------|------|
| **커스텀 도메인 추가** | Pages 프로젝트 → Custom domains → Set up a domain | 구매한 도메인 입력 |
| DNS 설정 | Cloudflare DNS 대시보드 | CNAME 레코드 자동 추가됨 (도메인이 Cloudflare에 있는 경우) |
| SSL 인증서 | 자동 | Cloudflare가 무료 SSL 인증서를 자동 발급 |

### 필요한 파일 수정

| 파일 | 수정 내용 |
|------|----------|
| `hugo.toml` | `baseURL`을 커스텀 도메인으로 변경 |
| `config/_default/hugo.yaml` | `baseURL`을 커스텀 도메인으로 변경 |
| `static/admin/config.yml` | `site_url`을 커스텀 도메인으로 변경 (Admin 사용 시) |

```toml
# hugo.toml 예시
baseURL = 'https://www.우리교회.com/'
```

> ③번(Admin)도 사용 중이라면, GitHub OAuth App의 **Homepage URL**도 커스텀 도메인으로 업데이트하세요.

---

## ⑤ 여러 관리자 운영 (③ + Collaborator 초대)

**목적:** 여러 사람이 각자 Admin 페이지에서 설교/행사를 입력

> ⚠️ **반드시 ③번 설정이 완료된 상태**에서 진행하세요.

### GitHub 추가 설정

| 설정 | 위치 | 설명 |
|------|------|------|
| **Collaborator 초대** | 리포지터리 → Settings → Collaborators → "Add people" | 관리자 GitHub 계정을 초대 |

### Cloudflare 설정

추가 없음. (Worker와 Pages는 이미 설정 완료)

### 필요한 파일 수정

없음.

### 관리자 추가 절차

1. 관리자가 될 사람이 **GitHub 계정**을 생성 (없는 경우)
2. 리포지터리 소유자가 **Collaborator로 초대**
3. 초대받은 사람이 이메일로 온 **초대 수락**
4. 이후 `https://xxxx.pages.dev/admin/` 접속 → GitHub 로그인으로 사용 가능

> **권한 레벨:** `Write` 권한이면 충분합니다. `Admin` 권한은 불필요합니다.

---

## 🗺️ 전체 설정 지도

아래 다이어그램은 모든 설정이 어디에 위치하고 서로 어떻게 연결되는지 보여줍니다.

```
┌─────────────────────────────────────────────────────────┐
│                        GitHub                           │
│                                                         │
│  ┌─── 리포지터리 (ccumgol/church-home) ──────────────┐  │
│  │  hugo.toml          → baseURL 설정                │  │
│  │  config/hugo.yaml   → baseURL 설정                │  │
│  │  static/admin/      → Decap CMS 파일              │  │
│  │    ├ index.html      → CMS 화면                   │  │
│  │    └ config.yml      → base_url, site_url, repo   │  │
│  │  content/           → 설교, 행사 콘텐츠 (md 파일)  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─── Settings ────────────────────────────────────┐   │
│  │  Collaborators     → 관리자 초대 (⑤)            │   │
│  │  OAuth Apps        → Client ID/Secret 발급 (③)  │   │
│  │    └ Callback URL  → Worker 주소/callback (③)   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Push (자동 감지)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Cloudflare                         │
│                                                         │
│  ┌─── Pages: church-home (②) ──────────────────────┐  │
│  │  GitHub 연결         → 자동 빌드 + 배포           │  │
│  │  환경변수 HUGO_VERSION → Hugo 버전 지정           │  │
│  │  Custom domains      → 커스텀 도메인 (④)         │  │
│  │  발급 주소           → https://xxxx.pages.dev     │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─── Workers: church-admin-auth (③) ──────────────┐  │
│  │  JavaScript 코드     → OAuth 중계 로직            │  │
│  │  GITHUB_CLIENT_ID    → OAuth App Client ID       │  │
│  │  GITHUB_CLIENT_SECRET→ OAuth App Secret (암호화)  │  │
│  │  발급 주소           → https://xxx.workers.dev    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## ❓ 자주 묻는 질문

### Q: GitHub Pages로 서비스하고 싶으면?
Cloudflare 설정 없이 GitHub Pages만 활성화하면 됩니다. `.github/workflows/deploy.yaml` 파일이 자동 빌드·배포를 처리합니다. 단, Admin 기능을 쓰려면 Cloudflare Workers는 여전히 필요합니다.

### Q: Admin 없이 홈페이지만 운영하고 싶으면?
②번까지만 설정하면 됩니다. 콘텐츠 수정은 GitHub에서 직접 `.md` 파일을 편집하거나, 로컬에서 Hugo 명령어로 작업 후 Push하면 됩니다.

### Q: Cloudflare 무료 플랜으로 충분한가요?
충분합니다. Pages는 월 500회 빌드, Workers는 월 10만 요청까지 무료입니다. 교회 규모의 사이트에는 넉넉합니다.

### Q: 설정값을 잘못 입력했으면?
언제든 수정 가능합니다. GitHub OAuth App 설정, Cloudflare 환경변수, `config.yml` 모두 수정 후 저장/Deploy하면 즉시 반영됩니다.

---

## 🔗 관련 문서

- [README.md](./README.md) — 전체 문서 인덱스
- [cloudflare-pages-migration.md](./cloudflare-pages-migration.md) — Cloudflare Pages 이전 계획 및 프로젝트 구조
- [admin-setup-guide.md](./admin-setup-guide.md) — Admin 활성화 상세 가이드
- [admin-plan.md](./admin-plan.md) — Admin CMS 구축 계획
