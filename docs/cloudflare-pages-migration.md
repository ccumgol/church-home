# Cloudflare Pages 이전 계획

## 배경 및 목적

현재 샘플교회 홈페이지(`church-home`)는 **GitHub Pages**로 서비스 중입니다. 향후 Decap CMS Admin 페이지 운영의 편의성과 사이트 성능 향상을 위해 **Cloudflare Pages**로 이전을 검토합니다.

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

> **결론:** 성능, 편의성, Admin 연동 모든 면에서 Cloudflare Pages가 유리합니다.

---

## 📋 이전 절차 (4단계)

### STEP 1 — Cloudflare Pages 프로젝트 생성 (사용자 직접)
1. Cloudflare 대시보드 → **Workers & Pages → Pages → Create**
2. **"Connect to Git"** → GitHub 계정 연결 → `ccumgol/church-home` 저장소 선택
3. 빌드 설정 입력:

| 항목 | 값 |
|------|-----|
| Framework preset | `Hugo` |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| Environment variable 이름 | `HUGO_VERSION` |
| Environment variable 값 | `0.164.0` |

4. **"Save and Deploy"** 클릭 → 약 2분 후 `church-home.pages.dev` 주소 발급

### STEP 2 — Hugo baseURL 변경 (코드 수정, 자동 처리 가능)
`config/_default/hugo.yaml`의 `baseURL`을 새 주소로 변경:

```yaml
# 변경 전
baseURL: 'https://ccumgol.github.io/church-home/'

# 변경 후 (Cloudflare Pages 기본 도메인)
baseURL: 'https://church-home.pages.dev/'

# 커스텀 도메인을 연결한다면:
# baseURL: 'https://yourdomain.com/'
```

### STEP 3 — GitHub Actions 워크플로우 비활성화 (코드 수정, 자동 처리 가능)
Cloudflare Pages가 자동으로 빌드·배포를 담당하므로 `.github/workflows/deploy.yaml`이 중복됩니다.
- 파일 삭제 또는 비활성화 처리

### STEP 4 — Admin OAuth 재설정 (Cloudflare Pages 내에서 처리)
Cloudflare Pages 환경에서는 별도 Worker 없이 더 간단하게 OAuth를 구성할 수 있습니다.
- `static/admin/config.yml`의 `base_url` 업데이트
- GitHub OAuth App의 Callback URL 업데이트

---

## ❓ 이전 전 확인 사항

1. **커스텀 도메인 보유 여부**
   - 도메인이 있다면 `baseURL`을 해당 도메인으로 설정하고 Cloudflare에 연결 가능
   - 없다면 `church-home.pages.dev` 무료 도메인 사용

2. **GitHub Pages 유지 여부**
   - Cloudflare Pages로 완전 이전 시 GitHub Pages 설정을 비활성화하는 것이 권장됩니다

---

## 📅 작성 일시
2026-07-23

## 🔗 관련 문서
- [admin-plan.md](./admin-plan.md) — Admin CMS 구축 계획
- [admin-setup-guide.md](./admin-setup-guide.md) — Admin 활성화 가이드
