# Admin 페이지 활성화 가이드
## — GitHub OAuth App + Cloudflare Workers 설정

코드 배포는 완료되었습니다. `/admin/` 페이지가 실제로 작동하려면 아래 **2단계 설정**을 사용자가 직접 진행해야 합니다.

---

## STEP 1. GitHub OAuth App 생성

1. GitHub에 로그인 → **[Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers)**
2. **"New OAuth App"** 클릭
3. 아래와 같이 입력:

| 항목 | 값 |
|------|-----|
| Application name | `샘플교회 Admin` |
| Homepage URL | `https://ccumgol.github.io/church-home/` |
| Authorization callback URL | *(STEP 2 완료 후 입력 — 잠시 비워도 됨)* |

4. **"Register application"** 클릭
5. 생성 후 **Client ID** 와 **Client Secret** 을 복사해두세요 (STEP 2에 사용)

---

## STEP 2. Cloudflare Workers에 OAuth Proxy 배포

### 2-1. Cloudflare 가입 및 Workers 접속
1. **[cloudflare.com](https://cloudflare.com)** 에서 무료 가입 (이메일 인증)
2. 대시보드 왼쪽 메뉴 → **Workers & Pages** → **"Create"** 클릭

### 2-2. sveltia-cms-auth Worker 생성
1. **"Create Worker"** 클릭 → Worker 이름 입력 (예: `church-admin-auth`)
2. 생성 후 **"Edit Code"** 클릭
3. 기존 코드를 모두 지우고 아래 코드를 붙여넣기:

```javascript
// sveltia-cms-auth — GitHub OAuth proxy for Decap CMS
// Source: https://github.com/sveltia/sveltia-cms-auth

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
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
      });
      const { access_token } = await tokenRes.json();
      const html = `<!DOCTYPE html><html><body><script>
        window.opener.postMessage(
          'authorization:github:success:{"token":"${access_token}","provider":"github"}',
          '*'
        );
      </script></body></html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
```

4. **"Save and Deploy"** 클릭
5. Worker URL 확인 (예: `https://church-admin-auth.YOUR-SUBDOMAIN.workers.dev`)

### 2-3. 환경 변수 설정
1. Worker 대시보드 → **Settings > Variables** → **"Add variable"**
2. 아래 두 값 추가:

| Variable name | Value |
|---------------|-------|
| `GITHUB_CLIENT_ID` | STEP 1에서 복사한 Client ID |
| `GITHUB_CLIENT_SECRET` | STEP 1에서 복사한 Client Secret (**Encrypt** 체크) |

3. **"Save"** 클릭

---

## STEP 3. GitHub OAuth App Callback URL 업데이트

STEP 1에서 비워뒀던 **Authorization callback URL** 에 아래 값 입력:
```
https://church-admin-auth.YOUR-SUBDOMAIN.workers.dev/callback
```
(YOUR-SUBDOMAIN은 Cloudflare Worker의 실제 서브도메인)

---

## STEP 4. `static/admin/config.yml` 수정

리포지터리 [config.yml](file:///Users/gihyunpark/Desktop/Workspace/church-home/static/admin/config.yml) 을 열어 아래 줄을 교체:

```yaml
# 변경 전
base_url: https://sveltia-cms-auth.YOUR-WORKER.workers.dev

# 변경 후 (실제 Worker 주소로)
base_url: https://church-admin-auth.YOUR-SUBDOMAIN.workers.dev
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

1. **`https://ccumgol.github.io/church-home/admin/`** 접속
2. **"Login with GitHub"** 클릭 → GitHub 로그인
3. 좌측 메뉴에서 **📖 주일설교** 또는 **📅 행사안내** 선택
4. **"New 설교"** 또는 **"New 행사"** 버튼으로 내용 입력
5. **"Publish"** 클릭 → GitHub에 자동 커밋 → **10~15분 후** 라이브 사이트 자동 반영

> **팁:** 즉시 확인하고 싶다면 GitHub Actions 탭에서 빌드 진행 상황을 실시간으로 볼 수 있습니다.
