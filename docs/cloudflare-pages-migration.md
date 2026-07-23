# Cloudflare Pages 이전 계획 및 절차

## 배경 및 목적

현재 샘플교회 홈페이지(`church-home`)는 **GitHub Pages**로 서비스 중입니다. 향후 Decap CMS Admin 페이지 운영의 편의성과 사이트 성능 향상을 위해 **Cloudflare Pages**로 이전을 결정하였습니다.

---

## 📊 서비스 구조 비교

### 현재 구조 (GitHub Pages)
```
GitHub Repo → GitHub Actions (빌드/배포) → GitHub Pages CDN → 사용자
Admin 로그인 → Cloudflare Workers (OAuth 중계) → GitHub 인증
```

### 이전 후 구조 (Cloudflare Pages)
```
GitHub Repo → Cloudflare Pages 자동 빌드 → 전 세계 CDN 330+ → 사용자
Admin 로그인 → Cloudflare Pages 내장 OAuth → GitHub 인증 (더 간단)
```

---

## 🔑 GitHub Pages vs Cloudflare Pages 비교

| 항목 | GitHub Pages | Cloudflare Pages |
|------|-------------|-----------------|
| **속도** | 미국 서버 1곳 | 전 세계 330+ CDN 엣지 |
| **빌드** | GitHub Actions 별도 설정 | Cloudflare가 자동 빌드 |
| **Admin OAuth** | 별도 Cloudflare Worker 필요 | Pages 내 동일 계정 처리 (간소화) |
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
4. 빌드 설정 입력:

| 항목 | 값 |
|------|-----|
| Framework preset | `Hugo` |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |

5. **"Environment variables (advanced)"** 클릭 후 추가:

| Variable name | Value |
|---------------|-------|
| `HUGO_VERSION` | `0.164.0` |

6. **"Save and Deploy"** 클릭 → 약 2분 후 `xxxx.pages.dev` 주소 발급

---

### STEP 2 — baseURL 및 Admin config 업데이트 (코드 수정)

Cloudflare Pages 주소 발급 후 아래 두 파일 수정:

#### `config/_default/hugo.yaml`
```yaml
# 변경 전
baseURL: 'https://ccumgol.github.io/church-home/'

# 변경 후 (Cloudflare Pages 주소로)
baseURL: 'https://church-home.pages.dev/'
# 또는 커스텀 도메인:
# baseURL: 'https://yourdomain.com/'
```

#### `static/admin/config.yml`
```yaml
# base_url을 실제 Cloudflare Worker OAuth 주소로 교체
base_url: https://church-admin-auth.YOUR-SUBDOMAIN.workers.dev
```

---

### STEP 3 — GitHub Actions 워크플로우 처리

Cloudflare Pages가 자동으로 빌드·배포를 담당하므로 `.github/workflows/deploy.yaml`이 중복됩니다.

> **템플릿 정책:** GitHub Pages 사용자를 위해 `deploy.yaml` 파일은 **삭제하지 않고 리포지터리에 유지**합니다.
> Cloudflare Pages를 쓰는 경우 파일 상단의 `on:` 트리거를 주석 처리하면 비활성화됩니다.

파일 상단 안내 주석이 추가되었습니다 (2026-07-23 완료):
```yaml
# Cloudflare Pages를 사용한다면: 아래 'on:' 트리거를 주석 처리하세요.
# Cloudflare Pages는 자체 빌드 파이프라인을 사용합니다.
```

---

### STEP 4 — Admin OAuth 설정 (별도 가이드 참조)

[admin-setup-guide.md](./admin-setup-guide.md) 참고.
Cloudflare Pages 환경에서는 동일 계정 내 Worker 연결이 더 간단합니다.

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
| STEP 3 | 최종 배포 및 OAuth 연결 확인 | ✅ 완료 (2026-07-23) |

---

## 🔗 관련 문서

- [README.md](./README.md) — 전체 문서 인덱스
- [admin-plan.md](./admin-plan.md) — Admin CMS 구축 계획
- [admin-setup-guide.md](./admin-setup-guide.md) — Admin 활성화 가이드 (OAuth + Workers)
