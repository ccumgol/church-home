# Admin 페이지 활성화 가이드
## — GitHub OAuth App + Cloudflare Workers 설정

코드 배포는 완료되었습니다. `/admin/` 페이지가 실제로 작동하려면 아래 설정을 사용자가 직접 진행해야 합니다.

> **전체 구조 이해:** Cloudflare에서 Pages(홈페이지)와 Workers(OAuth 중계) 두 프로젝트의 역할과 관계에 대해서는 [cloudflare-pages-migration.md](./cloudflare-pages-migration.md)의 "Cloudflare 프로젝트 구조" 섹션을 참고하세요.

---

## STEP 1. GitHub OAuth App 생성

1. GitHub에 로그인 → **[Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers)**
2. **"New OAuth App"** 클릭
3. 아래와 같이 입력:

| 항목 | 값 |
|------|-----|
| Application name | `샘플교회 Admin` (원하는 이름) |
| Homepage URL | `https://church-home.pages.dev/` |
| Authorization callback URL | *(STEP 2 완료 후 입력 — 잠시 비워도 됨)* |

4. **"Register application"** 클릭
5. 생성 후 **Client ID** 와 **Client Secret** 을 복사해두세요 (STEP 2에 사용)

> ⚠️ **Client Secret**은 생성 직후에만 볼 수 있습니다. 반드시 안전한 곳에 복사해 두세요.

---

## STEP 2. Cloudflare Workers에 OAuth Proxy 배포

### 2-1. Cloudflare 가입 및 Workers 접속
1. **[cloudflare.com](https://cloudflare.com)** 에서 무료 가입 (이메일 인증)
2. 대시보드 왼쪽 메뉴 → **Workers & Pages** → **"Create"** 클릭

### 2-2. Worker 생성
1. **"Start with Hello World!"** 선택 (세 번째 옵션, 초록색 지구본 아이콘)
2. Worker 이름 입력 (예: `church-admin-auth`) → **"Deploy"** 클릭
3. 생성 완료 후 **"Edit Code"** 클릭
4. 기존 코드를 **모두 지우고** 아래 코드를 붙여넣기:

```javascript
// GitHub OAuth proxy for Decap CMS (Cloudflare Worker)
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: 'repo,user',
        state: Math.random().toString(36).slice(2),
      });
      return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
    }
    
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ 
          client_id: env.GITHUB_CLIENT_ID, 
          client_secret: env.GITHUB_CLIENT_SECRET, 
          code 
        }),
      });
      const data = await tokenRes.json();
      
      // 에러 시 화면 표시
      if (data.error) {
        return new Response(`GitHub Error: ${data.error_description || data.error}`, { status: 400 });
      }
      
      // Decap CMS requires a 2-way handshake
      const html = `<!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Callback</title></head>
      <body>
        <script>
          function receiveMessage(e) {
            window.opener.postMessage(
              'authorization:github:success:{"token":"${data.access_token}","provider":"github"}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        </script>
      </body>
      </html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
```

5. **"Save and Deploy"** 클릭
6. Worker URL 확인 (예: `https://church-admin-auth.office-a67.workers.dev`)

### 2-3. 환경 변수 설정
1. Worker 대시보드 → **Settings > Variables & Secrets** → **"Add variable"**
2. 아래 두 값 추가:

| Variable name | Value | 비고 |
|---------------|-------|------|
| `GITHUB_CLIENT_ID` | STEP 1에서 복사한 Client ID | 평문 |
| `GITHUB_CLIENT_SECRET` | STEP 1에서 복사한 Client Secret | **Encrypt 체크** |

3. **"Deploy"** 클릭

---

## STEP 3. GitHub OAuth App Callback URL 업데이트

STEP 1에서 비워뒀던 **Authorization callback URL**을 입력합니다.

1. GitHub → **Settings > Developer Settings > OAuth Apps** → 앱 클릭
2. **Authorization callback URL** 칸에 아래 값 입력:
```
https://church-admin-auth.office-a67.workers.dev/callback
```
> ⚠️ 끝에 반드시 `/callback`을 붙여야 합니다!

3. **"Update application"** 클릭

---

## STEP 4. `static/admin/config.yml` 수정

리포지터리의 [config.yml](../static/admin/config.yml)을 열어 `base_url`을 실제 Worker 주소로 교체:

```yaml
backend:
  name: github
  repo: ccumgol/church-home
  branch: main
  base_url: https://church-admin-auth.office-a67.workers.dev  # ← 실제 Worker 주소
  auth_endpoint: /auth
```

변경 후 `git push` 하면 완료!

---

## STEP 5. 관리자 계정 추가

콘텐츠를 입력할 담당자마다:
1. GitHub 계정 생성 (없는 경우)
2. [`ccumgol/church-home > Settings > Collaborators`](https://github.com/ccumgol/church-home/settings/access) 에서 **"Add people"** 로 초대
3. 초대받은 담당자가 수락하면 완료

---

## ✅ 설정 완료 후 사용 방법

1. **`https://church-home.pages.dev/admin/`** 접속
2. **"GitHub 로 로그인"** 클릭 → GitHub 로그인
3. 좌측 메뉴에서 **📖 주일설교** 또는 **📅 행사안내** 선택
4. **"New 설교"** 또는 **"New 행사"** 버튼으로 내용 입력
5. **"Publish"** 클릭 → GitHub에 자동 커밋 → Cloudflare Pages가 자동 빌드 → **약 2분 후** 라이브 사이트 반영

> **팁:** Cloudflare 대시보드의 Workers & Pages 탭에서 빌드 진행 상황을 실시간으로 볼 수 있습니다.

---

## 🔗 관련 문서

- [README.md](./README.md) — 전체 문서 인덱스
- [admin-plan.md](./admin-plan.md) — Admin CMS 구축 계획
- [cloudflare-pages-migration.md](./cloudflare-pages-migration.md) — Cloudflare Pages 이전 계획 및 프로젝트 구조
