# 샘플교회 (church-home) 이슈 트래킹 및 트러블슈팅 종합 보고서

본 문서는 **샘플교회(church-home)** 프로젝트 개발 및 디자인 고도화 과정에서 발생했던 주요 문제, 기술적 원인 분석, 그리고 이를 완벽히 해결한 과정을 체계적으로 기록한 보고서입니다.

---

## 📋 목차
1. [이슈 1: 다크 모드 및 다크 섹션 내 텍스트 가독성 소멸 문제](#이슈-1-다크-모드-및-다크-섹션-내-텍스트-가독성-소멸-문제)
2. [이슈 2: 하단 CTA 검은 박스의 너비 오버플로우 및 타이틀 소멸 현상](#이슈-2-하단-cta-검은-박스의-너비-오버플로우-및-타이틀-소멸-현상)
3. [이슈 3: 상단 메뉴바(Navbar) 배경색과 바디 배경색 이질감 현상](#이슈-3-상단-메뉴바navbar-배경색과-바디-배경색-이질감-현상)
4. [이슈 4: 히어로(Hero) 영역 배경 이미지 미출력 문제](#이슈-4-히어로hero-영역-배경-이미지-미출력-문제)
5. [이슈 5: 섹션 상하 여백 과다 및 섹션 타이틀 서식 파편화](#이슈-5-섹션-상하-여백-과다-및-섹션-타이틀-서식-파편화)
6. [이슈 6: 정적 미디어 자산 WebP 일괄 변환 및 웹 표준 도입](#이슈-6-정적-미디어-자산-webp-일괄-변환-및-웹-표준-도입)
7. [이슈 7: GitHub Pages 서비스 연동 및 CI/CD 워크플로우 세팅](#이슈-7-github-pages-서비스-연동-및-cicd-워크플로우-세팅)
8. [이슈 8: config/_default/hugo.yaml 내 3가지 스키마 및 디프리케이션 문제 수정](#이슈-8-configdefaulthugoyaml-내-3가지-스키마-및-디프리케이션-문제-수정)
9. [이슈 9: 스크롤 시 스티키 메뉴바(Sticky Navbar) 배경 미적용으로 인한 텍스트 겹침 문제](#이슈-9-스크롤-시-스티키-메뉴바sticky-navbar-배경-미적용으로-인한-텍스트-겹침-문제)
10. [이슈 10: 상단 드롭다운 서브메뉴(Submenu) 일괄 강제 노출 및 화면 겹침 오류](#이슈-10-상단-드롭다운-서브메뉴submenu-일괄-강제-노출-및-화면-겹침-오류)
11. [이슈 11: 상단 메뉴 버튼 외곽 테두리(Border) 박스 노출 제거](#이슈-11-상단-메뉴-버튼-외곽-테두리border-박스-노출-제거)
12. [이슈 12: 하단 CTA 초대 카드의 이중 테두리(Double Border) 및 1040px 오버플로우 문제](#이슈-12-하단-cta-초대-카드의-이중-테두리double-border-및-1040px-오버플로우-문제)
13. [이슈 13: 모바일 화면 푸터 메뉴 2단 세로 수평 배치 개편](#이슈-13-모바일-화면-푸터-메뉴-2단-세로-수평-배치-개편)
14. [이슈 14: 푸터 하단 Hugo Blox 관련 외부 링크 문구 완전 제거](#이슈-14-푸터-하단-hugo-blox-관련-외부-링크-문구-완전-제거)
15. [이슈 15: 히어로 직하단 유튜브 특정 플레이리스트 최신 영상 자동 연동 연출](#이슈-15-히어로-직하단-유튜브-특정-플레이리스트-최신-영상-자동-연동-연출)
16. [이슈 16: 주일설교 영상 축적 시스템 구축 (유튜브 썸네일 자동 추출 & 목록/상세 레이아웃)](#이슈-16-주일설교-영상-축적-시스템-구축-유튜브-썸네일-자동-추출--목록상세-레이아웃)
17. [이슈 17: 상단 드롭다운 메뉴 '새벽기도' 및 '수요기도회' 유튜브 플레이리스트 URL 갱신](#이슈-17-상단-드롭다운-메뉴-새벽기도-및-수요기도회-유튜브-플레이리스트-url-갱신)
18. [이슈 18: 주일설교 글목록 4단 분할 및 우측 태그(성경권/설교자/절기) 사이드바 구현](#이슈-18-주일설교-글목록-4단-분할-및-우측-태그성경권설교자절기-사이드바-구현)
19. [이슈 19: 태그 시스템과 문서 프론트매터(Frontmatter) 실시간 동적 연동 구현](#이슈-19-태그-시스템과-문서-프론트매터frontmatter-실시간-동적-연동-구현)
20. [이슈 20: 주일설교 태그 버튼 클릭 시 해당하는 설교 목록 실시간 필터링 구현](#이슈-20-주일설교-태그-버튼-클릭-시-해당하는-설교-목록-실시간-필터링-구현)
21. [이슈 21: 첫 화면 배너 티커형/캐러셀형 선택 기능 구현 (두 배너 동시 노출 문제)](#이슈-21-첫-화면-배너-티커형캐러셀형-선택-기능-구현)
22. [이슈 22: 캐러셀 배경이 섹션 전체 폭에 깔리지 않고 글자가 흰색으로 나오지 않던 문제](#이슈-22-캐러셀-배경-전체-폭--흰색-글자-문제)
23. [이슈 23: 행사 포스터 필드 정리 및 빌드 중단 오류 해결](#이슈-23-행사-포스터-필드-정리-및-빌드-중단-오류-해결)
24. [이슈 24: 죽은 설정 파일·디버그 덤프 정리 및 이미지 자동 최적화](#이슈-24-죽은-설정-파일디버그-덤프-정리-및-이미지-자동-최적화)
25. [이슈 25: 배너 종류를 Admin 페이지에서 바꿀 수 있도록 개선](#이슈-25-배너-종류를-admin-페이지에서-바꿀-수-있도록-개선)

---

## 이슈 20: 주일설교 태그 버튼 클릭 시 해당하는 설교 목록 실시간 필터링 구현

### 🔴 요구사항
- 우측 4번째 단 태그 사이드바의 태그 버튼 클릭 시, 페이지 새로고침 없이 **해당 태그 조건에 맞는 주일설교 카드들만 즉시 필터링**되어 화면에 노출되도록 구현 요청.

### 💡 해결 조치
- [`layouts/sermons/list.html`](file:///Users/gihyunpark/Desktop/Workspace/church-home/layouts/sermons/list.html)에 경량 JavaScript Data Attribute 필터링 엔진 구축:
  - 설교 카드에 `data-book`, `data-speaker`, `data-tags` 속성을 자동 부과.
  - 태그 클릭 시 즉시 해당 속성을 검증하여 일치하는 설교 카드만 렌더링하고, 클릭된 태그는 테라코타 오렌지색 하이라이트로 스타일 전환.
  - 상단 필터 현황바(`[#태그명 필터 검색 결과 (N건)]`) 및 `[전체 보기]` 리셋 기능 완비.

---

---

## 이슈 21: 첫 화면 배너 티커형/캐러셀형 선택 기능 구현

### 🔴 증상
홈 화면 상단에 **티커형 배너와 캐러셀 배너가 위아래로 동시에 노출**됨. `content/_index.md` 의 히어로 블록에 `active: false` 를 지정했는데도 그대로 렌더링됨.

### 🔍 원인
현재 사용 중인 HugoBlox 모듈(`kit/modules/blox`)에는 **`active` 키를 읽는 코드가 존재하지 않음.** 섹션 목록을 만드는 `hbx/sections.html` 과 블록을 그리는 `parse_block_v3.html` 어디에도 해당 분기가 없어, 값과 무관하게 모든 섹션이 렌더링됨. (구버전 Wowchemy/HugoBlox v5 에는 있던 기능)

### 💡 해결 조치
- `layouts/_partials/hbx/sections.html` 를 프로젝트에서 오버라이드하여 섹션 노출 필터를 추가:
  - `active: false` 인 섹션 제외 (원래 기대하던 동작 복원)
  - `hero_style` 키가 붙은 섹션은 `params.church.hero_style` 과 값이 일치할 때만 노출
- `config/_default/params.yaml` 에 `church.hero_style` 추가 (`ticker` | `carousel`)
- `layouts/_partials/hooks/body-end/custom.html` 에서 **선택된 배너의 스크립트만** 로드하도록 분기. 티커를 쓰면 캐러셀 JS를, 캐러셀을 쓰면 티커 JS를 아예 내려받지 않음.

---

## 이슈 22: 캐러셀 배경 전체 폭 & 흰색 글자 문제

### 🔴 증상
1. 슬라이드 배경색이 가운데 콘텐츠 영역에만 깔리고 섹션 좌우 끝까지 채워지지 않음
2. 글자가 티커형 배너처럼 흰색으로 나오지 않고 어두운 색으로 표시됨
3. `_index.md` 에 지정한 슬라이드 배경 이미지가 무시되고 보라/파랑 그라디언트만 표시됨
4. `design.slide_height` 를 지정해도 높이가 적용되지 않음

### 🔍 원인
1. `custom.css` 12번 섹션의 `section.hbb-section > div:not(.home-section-bg)` 규칙이 모든 섹션 직계 자식에 `max-width: 64rem !important` 를 강제 → 캐러셀 컨테이너도 1024px로 잘림
2. `custom.css` 3번 섹션의 `html:not(.dark) body:not(.dark) section:not(.dark)...` 규칙(명시도 0,3,3)이 블록 내부의 `.slider-text-white *`(명시도 0,1,1)를 이김
3. 블록 템플릿이 슬라이드 dict 를 만들 때 `background` 키를 담지 않아, 지정한 이미지가 애초에 전달되지 않음. 대신 하드코딩된 5색 그라디언트 순환 사용 (design.md 안티패턴 "보라/파랑 그라디언트 금지" 위반)
4. `slide_height` / `is_fullscreen` 를 블록 템플릿이 읽지 않음

### 💡 해결 조치
- 12번 섹션 선택자에 `:not(.church-carousel)` 를 추가하여 캐러셀을 폭 제한에서 제외
- 캐러셀 섹션에 `css_class: "dark church-carousel"` 부여. `dark` 가 붙으면 3번 섹션의 `section:not(.dark)` 조건에서 스스로 빠지므로 흰색 글자 규칙이 정상 적용됨
- 블록을 다시 작성하여 `background.media` 를 실제로 읽고, 배경 이미지 위에 어두운 막(scrim)을 덮어 어떤 사진에서도 흰 글씨가 읽히도록 함. 배경 미지정 시에는 design.md 팔레트에 맞는 **테라코타 계열** 기본 배경 사용
- 높이를 `--carousel-height` / `--carousel-height-mobile` CSS 변수 하나로 통일. `design.slide_height`, `slide_height_mobile` 값이 인라인으로 주입됨
- 클래스 이름 주의: 제목에 `title` 을 쓰면 2번 섹션의 `[class*="title"]` 규칙이 글자 크기를 덮어쓰므로 `church-carousel-heading` 사용. 버튼은 `.dark a:not([class*="button"])` 의 호박색 링크 규칙을 피하려고 `church-carousel-button` 사용
- 한글 제목이 어절 중간에서 잘리는 문제를 `word-break: keep-all` 로 해결
- 모바일에서는 좌우 이동 버튼을 숨기고 **스와이프**로 대체 (좁은 화면에서 버튼이 글을 가림)

---

## 이슈 23: 행사 포스터 필드 정리 및 빌드 중단 오류 해결

### 🔴 증상
- 빌드 시 경고: ``page "/event/...": `image` frontmatter must be an object``
- 행사 문서에 `publish_to_home: true` 를 넣으면 **사이트 빌드 전체가 실패**
  ```
  can't evaluate field filename in type string
  ERROR error building site
  ```

### 🔍 원인
`image` 라는 이름을 두고 두 가지 표기가 충돌하고 있었음.
- Decap CMS 의 `image` 위젯은 **문자열**(`/media/uploads/x.png`)로 저장하고, 행사 목록/상세 레이아웃도 문자열로 사용
- 반면 HugoBlox 코어와 캐러셀 블록은 **오브젝트**(`{filename: ...}`)로 기대하여 `.Params.image.filename` 을 호출

즉 CMS로 만든 행사를 배너에 올리는 순간 문자열에 `.filename` 을 요구하게 되어 빌드가 죽는 구조였음. 더구나 CMS 행사 컬렉션에는 `publish_to_home` 필드 자체가 없어, 관리자가 웹에서 만든 행사는 배너에 올릴 방법이 없었음. 설명 필드도 CMS는 `description`, 캐러셀은 `summary` 로 서로 달랐음.

### 💡 해결 조치
- HugoBlox 예약어인 `image` 를 피해 행사 포스터 전용 필드 **`poster`** 도입 (문자열). 기존 `image` 표기도 계속 읽도록 폴백 유지
- 설명 필드를 `summary` 로 통일 (기존 `description` 폴백 유지)
- 미디어 경로 해석을 `layouts/_partials/church/media_url.html` 파셜 하나로 모음. 절대경로·파일명·`{filename:}` 오브젝트를 모두 받아 처리하므로 표기 차이로 빌드가 깨지지 않음
- Admin 행사 컬렉션에 **홈 화면 배너에 표시**(`publish_to_home`) 체크박스와 **행사 포스터**(`poster`) 필드 추가
- 결과: 경고 2건 → 0건, `publish_to_home` 을 켜도 빌드 정상

---

## 이슈 24: 죽은 설정 파일·디버그 덤프 정리 및 이미지 자동 최적화

### 🔴 증상 및 원인
1. **루트 `hugo.yaml` 이 통째로 무시되고 있었음.** Hugo 는 루트 설정 파일을 하나만 읽고 `hugo.toml` 을 우선하므로, `hugo.yaml` 에 적어 둔 `defaultContentLanguage: ko`, `languageCode: ko-kr`, 교회 주소/전화번호가 전혀 반영되지 않음. `hugo config` 로 확인 시 실제 값은 `defaultcontentlanguage = 'en'`. 게다가 그 안의 module import 는 더 이상 쓰지 않는 구버전(`blox-bootstrap/v5`)을 가리키고 있었음
2. 한국어 사이트인데 `hasCJKLanguage: false` → 한글 문단이 '한 단어'로 세어져 `.Summary` 와 읽는 시간 계산이 사실상 무의미했음
3. 렌더링 결과 덤프(`index.html` 144KB, `index_live.html` 144KB, `main_dump.html` 0B)와 `hugo_server.log` 가 저장소에 커밋되어 있었음
4. Admin 업로드 경로가 `static/media/uploads` 라서 Hugo 가 손댈 수 없었음 → 교인이 올린 **6.17MB PNG 원본이 그대로 방문자에게 전송**됨

### 💡 해결 조치
- 죽은 루트 `hugo.yaml` 삭제. 교회 연락처는 `params.yaml` 의 `church.contact` 로 옮겨 단일 출처화
- `config/_default/hugo.yaml` 에 `hasCJKLanguage: true` 설정
- 디버그 덤프 3종·`hugo_server.log` 추적 해제 후 `.gitignore` 에 등록
- 사용되지 않던 `assets/js/custom.js`(console.log 한 줄), `layouts/shortcodes/test_ticker.html` 제거
- 레거시 경로 `layouts/partials/` → Hugo 0.146+ 표준인 `layouts/_partials/` 로 이동
- Admin 업로드 경로를 `assets/media/uploads` 로 변경하고, `media_url` 파셜이 가로 1600px 초과 이미지를 자동으로 WebP 축소하도록 구현
  - **6.17MB PNG → 314KB WebP (약 95% 감소)**

---

---

## 이슈 25: 배너 종류를 Admin 페이지에서 바꿀 수 있도록 개선

### 🔴 요구사항
티커형/캐러셀형 전환을 개발자가 `params.yaml` 을 편집하지 않고, 교회 담당자가 **Admin(`/admin/`) 화면에서** 직접 바꿀 수 있게 해 달라는 요청.

### 🔍 검토
Decap CMS 는 글 폴더뿐 아니라 **파일 하나를 편집하는 `files` 컬렉션**을 지원하므로 기술적으로 가능. 다만 편집 대상을 `config/_default/params.yaml` 로 잡으면 안 됨 — Decap 은 저장 시 자기 데이터 모델대로 **파일 전체를 다시 쓰기 때문에**, 그 파일에 들어 있는 HugoBlox 전체 설정과 주석이 모두 사라짐.

### 💡 해결 조치
- Admin 전용 설정 파일 `data/settings.yaml` 을 신설. 이 파일만 Decap 이 다시 쓰므로 다른 설정이 손상되지 않음 (대신 이 파일에는 주석을 두지 않음)
- `layouts/_partials/church/settings.html` 파셜로 값 해석을 일원화
  - 찾는 순서: `data/settings.yaml` → `params.church.*` → 코드 기본값
  - `hero_style` 이 `ticker`/`carousel` 이 아니면 **빌드를 깨뜨리지 않고** 경고 후 `ticker` 로 처리
  - 파일이 아예 없어도 정상 동작
- Admin 에 **⚙️ 사이트 설정 → 첫 화면 배너** 화면 추가 (배너 종류 드롭다운 + 캐러셀 전환 간격)
- 전환 간격은 관리자가 이해하기 쉽도록 **초 단위로 입력**받아 템플릿에서 ms 로 변환. 이에 맞춰 `_index.md` 의 `design.interval` 은 제거하여 설정 위치를 한 곳으로 통일
- 부수 수정: `site.Data` 가 Hugo 0.156 에서 deprecated 되어 `hugo.Data` 로 교체 (빌드 경고 제거)

### ✅ 확인
- 티커/캐러셀 양쪽 모두 경고·오류 0건으로 빌드
- 잘못된 값 입력 시 경고 1건 + 티커형으로 안전하게 폴백
- Admin 화면이 설정 오류 없이 로드되고 컬렉션 3개(사이트 설정/주일설교/행사안내) 정상 등록

---

## 🌐 최종 프로젝트 상태

- **공개 웹사이트 URL:** 👉 **[https://ccumgol.github.io/church-home/](https://ccumgol.github.io/church-home/)**
- **소스 리포지터리:** [`ccumgol/church-home`](https://github.com/ccumgol/church-home)
