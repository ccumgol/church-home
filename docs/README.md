# 샘플교회 (church-home) 프로젝트 문서 인덱스

본 폴더(`docs/`)는 샘플교회 홈페이지 개발 및 운영 과정에서 생성된 모든 참고 문서를 보관합니다.

---

## 📂 문서 목록

### 운영 및 설정 지침서
| 파일 | 내용 | 최종 업데이트 |
|------|------|-------------|
| [setup-by-purpose.md](./setup-by-purpose.md) | **[추천]** 용도별 GitHub & Cloudflare 설정 종합 가이드 (단순 호스팅, Admin, 도메인 등) | 2026-07-25 |
| [manual.md](./manual.md) | 홈페이지 콘텐츠 관리 방법, 첫 화면 배너 선택(티커/캐러셀), 주일설교 등록 가이드, 배포 방법 등 운영 전반 지침 | 2026-07-25 |
| [issue-report.md](./issue-report.md) | 개발 과정에서 발생한 이슈 트래킹 및 해결 방법 기록 (이슈 1~25) | 2026-07-25 |

### Admin CMS 관련
| 파일 | 내용 | 최종 업데이트 |
|------|------|-------------|
| [admin-plan.md](./admin-plan.md) | Decap CMS 기반 Admin 콘텐츠 관리 페이지 구축 계획서 (기술 방식 비교, 구현 범위) | 2026-07-23 |
| [admin-setup-guide.md](./admin-setup-guide.md) | Admin 페이지 활성화 단계별 가이드 (GitHub OAuth App + Cloudflare Workers 설정) | 2026-07-25 |

### 호스팅 관련
| 파일 | 내용 | 최종 업데이트 |
|------|------|-------------|
| [cloudflare-pages-migration.md](./cloudflare-pages-migration.md) | GitHub Pages → Cloudflare Pages 이전 계획, 절차 및 프로젝트 구조 상세 | 2026-07-25 |

---

## 🗓️ 개발 이력 요약

### Phase 1 — 기초 설계 및 디자인 시스템
- Hugo + HugoBlox 기반 정적 사이트 초기 구성
- 다크모드, 히어로 배경 이미지, 스티키 메뉴바, 드롭다운 서브메뉴 구현
- GitHub Pages + GitHub Actions CI/CD 연동

### Phase 2 — 콘텐츠 시스템 구축
- 홈 화면 히어로 직하단 유튜브 최신 설교 자동 연동
- 주일설교 영상 축적 시스템 (`content/sermons/`) 구축
  - 유튜브 썸네일 자동 추출
  - 목록 페이지: 썸네일 + 제목 + 성경본문 + 설교자 + 예배일
  - 상세 페이지: 제목 → 본문 → 유튜브 영상 → 설교자/예배일 → 설교 원고
- 새벽기도·수요기도회 유튜브 플레이리스트 링크 연동

### Phase 3 — 설교 목록 고도화
- **4단 레이아웃 분할:** 좌 3단(설교 카드) + 우 1단(태그 사이드바)
- **동적 태그 추출:** `book`, `speaker`, `tags` 프론트매터에서 실시간 수집
- **클라이언트 사이드 태그 필터링:** 클릭 시 즉시 해당 설교만 노출
- **3단 그리드 + 페이지네이션 (12개/페이지)** 구성

### Phase 4 — 메뉴 구조 개편 및 Admin 시스템 & Cloudflare 이전
- `행사안내` → `커뮤니티` 하위 메뉴로 이동
- **Decap CMS Admin 페이지 설치** (`/admin/`)
  - 설교 컬렉션: 제목, 예배일, 설교자, 성경본문, 성경권, 유튜브 URL, 태그, 원고
  - 행사 컬렉션: 제목, 날짜, 장소, 이미지, 상세 내용
- **Cloudflare Pages 호스팅 이전 및 Worker OAuth 연동 완료**

### Phase 5 — 첫 화면 배너 선택 기능 및 코드 정리
- **첫 화면 배너를 선택해서 쓰는 구조 도입** (`data/settings.yaml` 의 `hero_style`)
  - `ticker`: 배경 사진 + 최근소식 티커 (기본값)
  - `carousel`: 자동 전환 슬라이드 — 고정 슬라이드 + 행사 자동 연동, 포스터는 우측 2단 배치
  - 선택하지 않은 배너는 HTML·JS 모두 생성되지 않음
- 행사 포스터 필드를 `poster` 로 정리하여 빌드 중단 오류 해결, Admin 에 "홈 화면 배너에 표시" 옵션 추가
- **배너 종류·전환 속도를 Admin(⚙️ 사이트 설정)에서 직접 변경** — 코드 수정 불필요
- 죽은 루트 `hugo.yaml`·디버그 덤프 제거, `hasCJKLanguage` 활성화
- Admin 업로드 이미지 자동 WebP 축소 (6.17MB → 314KB)

---

## 🔗 주요 링크

| 항목 | URL |
|------|-----|
| 라이브 사이트 | https://church-home.pages.dev/ |
| GitHub 저장소 | https://github.com/ccumgol/church-home |
| 주일설교 목록 | https://church-home.pages.dev/sermons/ |
| Admin 페이지 | https://church-home.pages.dev/admin/ |
