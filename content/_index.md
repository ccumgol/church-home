---
title: "홈 (Home)"
date: 2026-07-22
type: landing

# Hallmark · macrostructure: Manifesto · genre: editorial · theme: Warm Terracotta
# Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5

# ══════════════════════════════════════════════════════════════════════════════
# 첫 화면 배너는 두 가지 중 하나만 표시됩니다.
#   - hero_style: ticker   → 아래 `block: hero` (배경 한 장 + 최근소식 티커)
#   - hero_style: carousel → 아래 `block: slider` (여러 장 자동 전환)
# 어느 쪽을 쓸지는 Admin(/admin/) → "⚙️ 사이트 설정" 에서 고릅니다.
# 여기 두 섹션은 지우지 말고 그대로 두세요. 설정값과 맞는 쪽만 렌더링됩니다.
# ══════════════════════════════════════════════════════════════════════════════

sections:
  - block: hero
    hero_style: ticker
    content:
      eyebrow: 샘플교회 · SAMPLE CHURCH
      title: 하나님의 말씀과 은혜로<br>새로워지는 성도의 삶
      text: 하나님의 사랑과 십자가 은혜가 넘치는 참된 예배 공동체에 여러분을 기쁨으로 초대합니다.
      primary_action:
        text: 예배 및 모임 안내
        url: "/about/#services"
        icon: rocket-launch
        style: gradient
      secondary_action:
        text: 주일 설교 보기
        url: "/sermons/"
        icon: play-circle
        style: gradient
      announcement:
        badge:
          text: 최근소식
          color: primary
        text: '<span id="dynamic-ticker">최신 소식을 불러오는 중입니다...</span>'
    design:
      background:
        image:
          filename: "hero_sky_bg.webp"
          size: cover
          position: center
          filters:
            brightness: 0.7
      spacing:
        padding: [0, 0, 0, 0]
        margin: [0, 0, 0, 0]
      # dark             → 어두운 배경 위 흰 글자
      # hero-smooth-fade → 아래 섹션으로 자연스럽게 이어지는 페이드
      # 배경 사진과 글자 스타일은 custom.css 6번 섹션에서 관리합니다.
      css_class: "dark hero-smooth-fade"

  - block: slider
    id: hero-carousel
    hero_style: carousel
    content:
      # 아래 고정 슬라이드 뒤로, '커뮤니티 - 행사안내' 글 중
      # `publish_to_home: true` 인 행사가 최신순으로 자동으로 붙습니다.
      slides:
        - title: 하나님의 말씀과 은혜로 새로워지는 성도의 삶
          content: 샘플교회 · SAMPLE CHURCH
          background:
            media: "hero_sky_bg.webp"
          link:
            text: "예배 및 모임 안내"
            url: "/about/#services"
            icon: "rocket-launch"

        - title: "예배 안내"
          content: "하나님을 향한 온전한 예배가 회복되는 곳"
          background:
            media: "vintage-floral-bg.png"
          link:
            text: "예배 시간표 확인"
            url: "/about/#services"
            icon: "clock"

        - title: "새가족 가이드"
          content: "샘플교회에 처음 오신 분들을 진심으로 환영합니다!"
          background:
            media: "bright_sky_bg.webp"
          link:
            text: "오시는 길 안내"
            url: "/about/#direction"
            icon: "map-pin"
    design:
      # 모든 슬라이드가 이 높이로 통일됩니다. (내용이 길면 그만큼만 늘어남)
      # 자동 전환 간격은 Admin → "⚙️ 사이트 설정" 에서 정합니다.
      slide_height: "72vh"
      slide_height_mobile: "60vh"
      # 배경을 화면 좌우 끝까지 채우기 위한 클래스입니다.
      #   dark            → 다크 섹션용 흰색 글자 규칙 적용 (티커형 배너와 동일)
      #   church-carousel → 섹션 폭 제한/좌우 여백 해제 (custom.css 12·14번 섹션)
      css_class: "dark church-carousel"
      spacing:
        padding: [0, 0, 0, 0]
        margin: [0, 0, 0, 0]

  - block: markdown
    id: latest-sermon
    content:
      text: |
        {{< latest_sermon_block >}}
    design:
      columns: '1'
      css_class: "section-rule-bottom"

  - block: features
    id: worship-schedule
    content:
      subtitle: Worship & Prayer Schedule
      title: 예배 및 모임 시간
      text: 참된 예배와 기도로 하나님께 영광을 올려드리는 거룩한 구별의 시간입니다.
      items:
        - name: 주일 대예배
          icon: building-library
          description: "**매주 주일 오전 11:00 AM**<br />본당 2층 & YouTube Live 생중계"
        - name: 새벽기도회
          icon: sun
          description: "**월 ~ 금요일 오전 06:00 AM**<br />본당 1층 & 온라인 라이브"
        - name: 수요기도회
          icon: hand-raised
          description: "**매주 수요일 저녁 08:00 PM**<br />본당 2층 (말씀 중심 기도회)"
    design:
      css_class: "section-tint section-rule-bottom"

  - block: steps
    id: worship-guide
    content:
      subtitle: Community & Ministry
      title: 공동체 사역 안내
      text: 참된 말씀의 훈련과 사랑의 교제가 준비되어 있습니다.
      items:
        - title: 1. 하나님을 높이는 참된 예배
          text: 주일 대예배와 새벽기도회, 수요기도회를 통해 하나님의 인재하심과 말씀의 은혜를 깊이 경험합니다.
          icon: musical-note
        - title: 2. 말씀을 통한 삶의 양육
          text: 열린성경공부(TEE), 커피브레이크, 회복의 삶, 제자의 삶 코스를 통해 영적 성숙을 이룹니다.
          icon: academic-cap
        - title: 3. 다음 세대와 열방 섬김
          text: 교회학교, 샘플한국학교/여름학교 운영 및 협력 선교지 후원으로 하나님 나라를 확장하는 데 힘씁니다.
          icon: globe-alt
    design:
      layout: horizontal
      marker_style: icon
      connector: none
      css_class: "section-rule-bottom"

  - block: features
    id: core-values
    content:
      subtitle: Core Values
      title: 핵심 가치 및 사역 철학
      text: 오직 성경, 오직 은혜, 오직 믿음으로 하나님과 이웃을 온전히 섬깁니다.
      items:
        - name: 오직 성경 (Sola Scriptura)
          icon: book-open
          description: 하나님의 말씀인 성경을 신앙과 삶의 최고의 표준으로 삼아 순종합니다.
        - name: 오직 은혜 (Sola Gratia)
          icon: heart
          description: 예수 그리스도의 십자가 은혜로 구원받았음을 고백하며 감사로 섬깁니다.
        - name: 다음 세대 양육
          icon: academic-cap
          description: 교회학교와 샘플한국학교, 여름학교를 통해 자녀들을 기독교적 인재로 키웁니다.
        - name: 세계 선교 동역
          icon: globe-americas
          description: 협력선교사 후원과 기도로 열방에 예수 그리스도의 복음을 증거합니다.
        - name: 따뜻한 성도의 교제
          icon: user-group
          description: 순모임과 양육 코스를 통해 서로 돌아보며 사랑과 선행을 격려합니다.
        - name: 온전한 주일 성수
          icon: calendar-days
          description: 거룩한 주일에 하나님께 감사함으로 예배드리며 안식과 은혜를 누립니다.
    design:
      layout: bento
      css_class: "section-tint section-rule-bottom"

  - block: faq
    id: faq
    content:
      subtitle: Frequently Asked Questions
      title: 자주 묻는 질문
      text: 신앙생활 및 교회 방문에 관해 자주 물으시는 질문입니다.
      items:
        - question: 새가족 등록은 어떻게 하나요?
          answer: |
            주일 대예배 후 안내석이나 교역자에게 말씀해 주시면 따뜻하게 등록 및 교제 안내를 도와드립니다.
        - question: 교회 위치 및 주차 안내가 어떻게 되나요?
          answer: |
            주소: 123 Main St, Palisades Park, NJ 07650. 교회 단지 내 넉넉한 주차 공간이 준비되어 있습니다.
        - question: 온라인으로 예배 및 말씀에 동참할 수 있나요?
          answer: |
            네, 공식 유튜브 채널에서 주일예배 라이브 및 새벽기도, 수요기도회 영상을 보실 수 있습니다.
        - question: 온라인 헌금 방법은 어떻게 되나요?
          answer: |
            [교회소개 - 온라인헌금](/about/#offering) 안내 페이지에서 계좌 송금 및 온라인 송금 상세 정보를 확인하실 수 있습니다.
    design:
      css_class: ""

  - block: cta-card
    id: cta-invitation
    content:
      subtitle: Worship Invitation
      title: 참된 은혜와 평안이 있는 예배에 초청합니다
      text: "123 Main St, Palisades Park, NJ 07650 | Tel: (201) 555-0100"
      button:
        text: 예배 안내 보러가기
        url: "/about/#services"
    # 카드 모양은 assets/css/custom.css 11번 섹션에서 관리합니다.
    # (예전에는 여기 지정한 주황 그라디언트를 CSS가 검은 상자로 덮어써서
    #  설정과 화면이 따로 놀았습니다)
---
