---
title: "포토앨범 (Photo Album)"
date: 2026-07-22
type: album
cascade:
  # target.kind 를 page 로 한정합니다. 이렇게 하지 않으면 이 목록 페이지
  # 자신에게도 build.render: never 가 적용되어 목록이 통째로 사라집니다.
  - target:
      kind: page
    type: album
    build:
      render: never   # 개별 상세 페이지를 만들지 않습니다 (Google 포토로 바로 연결)
      list: local
---

<p class="text-xl font-medium text-stone-700 dark:text-stone-200 leading-relaxed mb-6">
교회 행사와 성도 간 교제의 순간들입니다. 앨범을 누르면 Google 포토로 이동합니다.
</p>
