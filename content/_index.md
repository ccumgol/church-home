---
title: 'Home'
date: 2026-07-22
type: landing

sections:
  - block: hero
    content:
      eyebrow: 샘플교회 (Sample Church)
      title: 하나님의 말씀과 은혜로<br>새로워지는 교회
      text: 하나님의 사랑과 은혜가 넘치는 샘플교회에 오신 여러분을 환영합니다.
      primary_action:
        text: 예배 및 모임 안내
        url: "/about/#services"
        icon: rocket-launch
        style: gradient
      secondary_action:
        text: 주일 설교 보기
        url: "/sermons/"
        icon: play-circle
        style: ghost
      announcement:
        badge:
          text: 안내
          color: primary
        text: 주일 대예배는 매주 오전 11시에 드려집니다.
        link:
          text: 자세히 보기
          url: "/about/#services"
      trust:
        stars: 5
        text: "**123 Main St, Palisades Park, NJ 07650**"
    design:
      spacing:
        padding: [0, 0, 0, 0]
        margin: [0, 0, 0, 0]
      css_class: "dark"
      section_break:
        fade_bottom: "#101828"
      background:
        color: "#0a0e27"
        gradient:
          type: radial
          start: "rgba(255,112,17,0.45)"
          end: "transparent"
          position: "50% -10%"
          shape: ellipse
          size: "80% 80%"
        gradient_mesh:
          enable: true
          style: orbs
          intensity: medium
          animation: pulse
          colors: ["primary-500/25", "secondary-500/25"]
          orb_count: 2
          positions: ["top-1/3 left-1/4", "bottom-1/3 right-1/4"]
          sizes: ["w-[32rem] h-[32rem]", "w-[26rem] h-[26rem]"]

  - block: stats
    content:
      items:
        - statistic: "주일 11시"
          description: |
            주일 대예배  
            본당 & YouTube Live
        - statistic: "월-금 6시"
          description: |
            새벽기도회  
            본당 & 온라인
        - statistic: "수요일 8시"
          description: |
            수요기도회
    design:
      layout: minimal
      numbers_gradient: true
      css_class: "bg-white dark:bg-gray-900"
      spacing:
        padding: ["3rem", 0, "3rem", 0]

  - block: steps
    id: worship-guide
    content:
      title: 샘플교회 공동체 안내
      text: 은혜로운 예배와 사랑의 교제가 있는 곳으로 초대합니다.
      items:
        - title: 1. 하나님을 높이는 예배
          text: 주일 대예배, 새벽기도회, 수요기도회를 통해 하나님의 살아계심을 경험합니다.
          icon: code-bracket
        - title: 2. 말씀을 통한 양육
          text: 열린성경공부(TEE), 커피브레이크, 회복의 삶, 제자의 삶 등 말씀 중심의 성장을 이룹니다.
          icon: link
        - title: 3. 다음 세대와 열방 섬김
          text: 교회학교, 샘플한국학교/여름학교 및 협력선교사 후원으로 하나님 나라를 확장합니다.
          icon: rocket-launch
    design:
      layout: horizontal
      marker_style: icon
      connector: none

  - block: features
    id: core-values
    content:
      subtitle: Core Values
      title: 개혁주의 신앙과 사랑의 섬김
      text: 오직 성경, 오직 은혜, 오직 믿음으로 하나님과 이웃을 섬깁니다.
      items:
        - name: 오직 성경 (Sola Scriptura)
          icon: sparkles
          description: 하나님의 말씀인 성경을 신앙과 삶의 최고의 표준으로 삼아 말씀을 배우고 순종합니다.
        - name: 오직 은혜 (Sola Gratia)
          icon: bolt
          description: 예수 그리스도의 십자가 은혜로 구원받았음을 고백하며 감사함으로 섬깁니다.
        - name: 다음 세대 양육
          icon: rectangle-group
          description: 교회학교와 샘플한국학교, 여름학교를 통해 자녀들을 기독교적 인재로 키웁니다.
        - name: 세계 선교 동역
          icon: arrow-path
          description: 협력선교사 후원과 긴밀한 기도로 세계 열방에 복음을 증거합니다.
        - name: 따뜻한 성도의 교제
          icon: paint-brush
          description: 순모임과 양육 코스를 통해 서로 돌아보며 사랑과 선행을 격려합니다.
        - name: 온전한 주일 성수
          icon: shield-check
          description: 거룩한 주일에 하나님께 모든 영광을 올려드리며 안식과 은혜를 누립니다.
    design:
      layout: bento
      css_class: "bg-gray-50 dark:bg-gray-900/50"

  - block: faq
    id: faq
    content:
      title: 자주 묻는 질문 (FAQ)
      subtitle: 궁금하신 점을 확인해 보세요.
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

  - block: cta-card
    content:
      title: 샘플교회에서 하나님을 만나보세요.
      text: "123 Main St, Palisades Park, NJ 07650 | Tel: (201) 555-0100"
      button:
        text: 예배 안내 보러가기
        url: "/about/#services"
    design:
      section_break:
        fade_top: "#ffffff"
      card:
        css_class: "bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl"
        css_style: ""
---
