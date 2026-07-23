# Design System — 교회 홈페이지 (church-home)

Hallmark design specification for church-home. A locked, non-templated design system built for sacred warmth, editorial clarity, and community trust.

## Genre
**Editorial** (Sacred Warmth & Authentic Community)

## Macrostructure Family
- **Landing Page:** Manifesto + Stat-Led + Asymmetric Storytelling
- **Subpages:** Long Document (Single Column / Clean Asymmetric Sidebar)

## Theme & Tokens
```css
:root {
  --color-paper: oklch(98.5% 0.008 75);      /* #faf8f5 Warm Linen Off-white */
  --color-paper-2: oklch(96.0% 0.012 75);    /* #f4efe9 Cream Sand */
  --color-ink: oklch(22.0% 0.015 60);        /* #221e1a Deep Espresso Charcoal */
  --color-ink-2: oklch(45.0% 0.020 60);      /* #695f56 Muted Earth Umber */
  --color-rule: oklch(90.0% 0.015 70);       /* #e5ddcf Warm Border Hairline */
  --color-accent: oklch(62.0% 0.180 40);     /* #d95d12 Warm Terracotta */
  --color-accent-gold: oklch(75.0% 0.140 75);/* #d97706 Sacred Amber Gold */
  --color-focus: oklch(62.0% 0.180 40);
  
  --font-display: 'MaruBuri', 'Nanum Myeongjo', serif;
  --font-body: 'Noto Sans KR', sans-serif;
}
```

## Typography
- **Display (Headers):** `'MaruBuri'`, `'Nanum Myeongjo'`, serif — Weight 600/700, solid ink (`var(--color-ink)` or `var(--color-accent)`), roman (no italic).
- **Body:** `'Noto Sans KR'`, sans-serif — Weight 400/500, line-height 1.75.
- **Scale:** Responsive clamp display text with balanced tracking.

## Layout Rhythm & Section Rules
1. **Hero Section:** Asymmetric split. Left: Dignified Manifesto title & welcoming description. Right: Clean floating service timetable card with warm border.
2. **Community Guidance (Steps):** Asymmetric timeline layout (1/3 summary title + 2/3 vertical step cards) replacing symmetric 3-card grid.
3. **Core Values (Bento):** 2-column asymmetric feature grid with subtle hairline borders (`var(--color-rule)`), replacing generic card-in-card hover elevation.
4. **Header / Navigation:** Glassmorphic warm navbar with solid typography and crisp accent hover states.
5. **Footer:** Single-line statement colophon (`Ft2` / `Ft5`) with warm dark slate surface.

## Anti-Pattern Banning Checklist
- [x] No purple/blue gradients or aurora mesh background animations.
- [x] No gradient fill text (`background-clip: text`).
- [x] No single-font Inter-everywhere setup.
- [x] No symmetric 3-equal column feature cards.
- [x] No noisy hover `scale(1.02)` / heavy box-shadow pop animations.
