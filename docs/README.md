# 샘플교회 (church-home) 프로젝트 문서 인덱스

본 폴더(`docs/`)는 샘플교회 홈페이지 개발 및 운영 과정에서 생성된 모든 참고 문서를 보관합니다.

---

## 📂 문서 목록

### 운영 지침서
| 파일 | 내용 | 최종 업데이트 |
|------|------|-------------|
| [manual.md](./manual.md) | 홈페이지 콘텐츠 관리 방법, 주일설교 등록 가이드, 배포 방법 등 운영 전반 지침 | 2026-07-23 |
| [issue-report.md](./issue-report.md) | 개발 과정에서 발생한 이슈 트래킹 및 해결 방법 기록 (이슈 1~20) | 2026-07-23 |

### Admin CMS 관련
| 파일 | 내용 | 최종 업데이트 |
|------|------|-------------|
| [admin-plan.md](./admin-plan.md) | Decap CMS 기반 Admin 콘텐츠 관리 페이지 구축 계획서 (기술 방식 비교, 구현 범위) | 2026-07-23 |
| [admin-setup-guide.md](./admin-setup-guide.md) | Admin 페이지 활성화 단계별 가이드 (GitHub OAuth App + Cloudflare Workers 설정) | 2026-07-23 |

### 호스팅 관련
| 파일 | 내용 | 최종 업데이트 |
|------|------|-------------|
| [cloudflare-pages-migration.md](./cloudflare-pages-migration.md) | GitHub Pages → Cloudflare Pages 이전 계획 및 절차 (성능 향상 + Admin OAuth 간소화) | 2026-07-23 |

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

### Phase 4 — 메뉴 구조 개편 및 Admin 시스템
- `행사안내` → `커뮤니티` 하위 메뉴로 이동
- **Decap CMS Admin 페이지 설치** (`/admin/`)
  - 설교 컬렉션: 제목, 예배일, 설교자, 성경본문, 성경권, 유튜브 URL, 태그, 원고
  - 행사 컬렉션: 제목, 날짜, 장소, 이미지, 상세 내용
- Cloudflare Pages 이전 방안 검토

---

## 🔗 주요 링크

| 항목 | URL |
|------|-----|
| 라이브 사이트 | https://ccumgol.github.io/church-home/ |
| GitHub 저장소 | https://github.com/ccumgol/church-home |
| 주일설교 목록 | https://ccumgol.github.io/church-home/sermons/ |
| Admin 페이지 | https://ccumgol.github.io/church-home/admin/ (OAuth 설정 후 활성화) |
