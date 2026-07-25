# Design System — 샘플교회 (church-home)

**컨셉: Sacred Warmth & Editorial Clarity — "따뜻한 활자"**

따뜻한 리넨 종이 위에 명조 활자를 얹은 *편집물* 느낌.
장식이 아니라 **여백·활자·얇은 규칙선**으로 격조를 만듭니다.
교회 홈페이지는 화려할 필요가 없고, 단정하고 읽기 좋으면 신뢰가 생깁니다.

---

## 1. 색은 한 곳에서만 정합니다

| 파일 | 역할 |
|------|------|
| `data/themes/church-warm.yaml` | **팔레트의 유일한 출처.** 색을 바꾸려면 여기만 고칩니다 |
| `config/_default/params.yaml` | `theme.pack: "church-warm"` 로 위 파일을 가리킴 |
| `assets/css/custom.css` | 색을 *정하지 않고* 변수를 **쓰기만** 함 |

프레임워크(HugoBlox)가 테마팩을 읽어 `--color-primary-*`, `--color-gray-*`,
`--hb-color-*` 변수를 만들어 뿌립니다. 그래서 버튼·카드·배지처럼
프레임워크가 그리는 요소도 저절로 이 팔레트를 따릅니다.

> **왜 이렇게 바꿨나**
> 예전에는 기본 테마(indigo/teal + 남색 `#0f172a`)를 그대로 두고
> `custom.css` 에서 `!important` 243개로 덧칠하고 있었습니다.
> 그래서 곳곳에 차가운 라벤더·남색이 배어 나왔고, 밝은 모드는 따뜻한데
> 어두운 모드는 남색인 모순이 생겼습니다. 지금은 24개만 남았습니다.

### 팔레트

| 역할 | 밝은 모드 | 어두운 모드 |
|------|-----------|-------------|
| 강조 (primary) | `#d95d12` Warm Terracotta | `#e8752b` |
| 보조 (secondary) | `#b45309` Sacred Amber | `#d9a441` Warm Gold |
| 무채색 (neutral) | `stone` — 따뜻한 회색 | `stone` |
| 배경 | `#faf8f5` Warm Linen | `#17130f` Deep Espresso |
| 본문 | `#221e1a` Deep Espresso | `#f2ece4` Warm Paper |
| 푸터 | `#1c1714` | `#100d0a` |

`neutral: stone` 이 핵심입니다. 프레임워크 블록이 쓰는 `bg-gray-*`,
`text-gray-*` 가 전부 따뜻한 stone 으로 치환되어, 카드 하나까지 톤이 맞습니다.

---

## 2. 활자

| 용도 | 서체 | 크기 토큰 |
|------|------|-----------|
| 제목 (Display) | `MaruBuri` → `Nanum Myeongjo` → serif | — |
| 본문 (Body) | `Noto Sans KR` | — |
| 히어로 제목 | Display 700 | `--step-hero` (2 → 3.5rem) |
| 섹션 제목 | Display 700 | `--step-section` (1.7 → 2.75rem) |
| 카드 제목 | Display 700 | `--step-card` (1.05 → 1.2rem) |
| 본문·설명 | Body 400 | `--step-lede` (1 → 1.1rem) |

- 제목에 이탤릭 금지 (한글 명조는 기울이면 무너집니다)
- **`word-break: keep-all`** 를 전역 적용 — 한글은 어절 단위로 끊어야 읽힙니다.
  (없으면 "창립 10주 / 년 감사예배" 처럼 잘립니다)
- 섹션 머리말 순서: 영문 아이브로(작게·대문자·자간 넓게, 테라코타)
  → 국문 제목(명조) → 한 줄 설명(흐린 본문색)

---

## 3. 여백과 리듬

세로 여백은 `--section-y` **하나로** 관리합니다.

```css
--section-y: clamp(3.5rem, 2rem + 6vw, 7rem);
```

> 예전에는 섹션 패딩을 1.25rem 으로 눌러 놓고 블록마다 `py-16` 을 덧붙여서
> 실제 여백이 섹션마다 들쭉날쭉했습니다.

- 읽기 폭: 본문 `--measure` 68rem, 좁은 글 `--measure-narrow` 46rem
- 섹션 구분은 **배경 톤 교차**(`.section-tint`) + **얇은 규칙선**(`.section-rule-bottom`)
- 첫 화면 배너만 화면 폭을 꽉 채웁니다 (`.church-carousel`, `#section-hero`)

---

## 4. 페이지 공통 형식

홈·설교·행사 페이지가 **같은 머리말 형식**을 씁니다.

```html
<header class="page-head">
  <p class="page-head-eyebrow">Sermons · 샘플교회 주일설교</p>
  <h1 class="page-head-title">주일설교 및 말씀</h1>
  <p class="page-head-count">총 14편 · 1 / 2 페이지</p>
</header>
```

> 예전에는 설교 목록이 주황 그라디언트 배너, 행사 목록이 파랑 그라디언트 배너로
> 서로 다른 데다 홈과도 따로 놀았습니다.

---

## 5. 금지 항목 (Anti-pattern Checklist)

- [x] 보라/파랑 그라디언트, 오로라 메시 배경 애니메이션
- [x] 그라디언트 글자(`background-clip: text`)
- [x] 서체 한 종류로 전부 처리
- [x] 똑같은 3단 카드 나열
- [x] hover 시 `scale()` 확대, 그림자 튀어오름 — 카드가 튀면 값싸 보입니다
- [x] 교회와 무관한 아이콘 (`</>` code-bracket, 로켓, 링크 등 템플릿 기본값)
- [x] 템플릿 잔재 (푸터의 "YOUR LOGO", X·GitHub·Discord·LinkedIn 링크)
- [x] 팔레트 밖의 색 (유튜브 빨강 버튼 등)

---

## 6. 접근성

- 포커스 링: `outline: 3px solid var(--color-primary-500)` + `offset 3px`
- `prefers-reduced-motion: reduce` 존중 — 전환·자동 넘김 정지
- 캐러셀: 키보드 좌우 이동, 스크린리더용 `aria-*`, 모바일 스와이프
- 어두운 배경 위 흰 글자에는 반드시 어두운 막(scrim)을 깔아 대비 확보
