# TSYP 14 — UI Design System

> Extracted from the live codebase. Use this as the single source of truth when building new pages.

---

## 1. Foundations

### 1.1 Background & Base Colors

| Token | Value | Usage |
|---|---|---|
| **Page background** | `#000000` | Every section, body, html |
| **Foreground (text)** | `#ffffff` | Primary headlines, stats |
| **Card surfaces** | `rgba(6, 2, 22, 0.82)` | Speaker cards, edition cards |
| **Card surface alt** | `linear-gradient(145deg, rgba(18,10,35,0.95), rgba(8,4,18,0.98))` | Flip card fronts |
| **Card surface back** | `linear-gradient(145deg, rgba(30,10,60,0.97), rgba(10,4,25,0.99))` | Flip card backs |

### 1.2 Brand Purple Palette

The entire design revolves around a **purple spectrum**. No other accent hue is used.

| Name | Value | Usage |
|---|---|---|
| **Primary purple** | `#9b30ff` / `rgba(155, 48, 255)` | Borders, glows, badges, buttons, accent text |
| **Violet** | `#7c3aed` / `rgba(124, 58, 237)` | Gradients, ambient blobs |
| **Deep violet** | `#6d28d9` | Speaker gradients |
| **Fuchsia** | `#c026d3` / `rgba(192, 38, 211)` | Gradient endpoints, progress bars |
| **Magenta** | `#c70898` | Gradient-flow headline animation |
| **Soft lilac** | `#a78bfa` | Cycling word, noosphere gradient |
| **Lavender tint** | `rgba(210, 185, 255, 0.75)` | Shimmer-white sweep |

### 1.3 Text Colors (by opacity / role)

| Role | Value |
|---|---|
| Headline white | `#ffffff` |
| Body text | `rgba(200, 195, 220, 0.7)` |
| Body text lighter | `rgba(190, 175, 215, 0.6)` |
| Muted subtext | `rgba(180, 160, 220, 0.45)` |
| Label / eyebrow purple | `rgba(155, 48, 255, 0.75)` |
| Label muted purple | `rgba(155, 48, 255, 0.55)` |
| Ultra-muted | `rgba(255, 255, 255, 0.25)` |
| Ultra-muted purple | `rgba(155, 48, 255, 0.42)` |
| Footer copyright | `rgba(255, 255, 255, 0.2)` |
| Stat label | `rgba(180, 150, 255, 0.55)` |
| Location/date meta | `rgba(180, 150, 255, 0.7)` |
| Strong emphasis in body | `rgba(220, 210, 255, 0.9)` + `fontWeight: 600` |
| Fact value text | `rgba(220, 215, 240, 0.8)` |

### 1.4 Border Colors

| Context | Value |
|---|---|
| Navbar bottom | `rgba(155, 48, 255, 0.12)` |
| Card default border | `rgba(155, 48, 255, 0.16)` – `0.18` |
| Card hover border | `rgba(155, 48, 255, 0.5)` – `0.55` |
| Nav pill highlight border | `rgba(155, 48, 255, 0.38)` |
| CTA button border | `rgba(155, 48, 255, 0.4)` |
| Subtle divider | `rgba(255, 255, 255, 0.05)` |
| Partner card border | `rgba(155, 48, 255, 0.15)` |
| Footer top border | `rgba(155, 48, 255, 0.1)` |
| Memory card border | `rgba(155, 48, 255, 0.1)` |

---

## 2. Typography

### 2.1 Font Families

| Variable | Font | Weights | Role |
|---|---|---|---|
| `--font-inter` | **Inter** | 300, 400, 500, 600, 700 | Body text, labels, nav links, eyebrows, descriptions |
| `--font-poppins` | **Poppins** | 400, 600, 700, 800 | Stat numbers |
| `--font-jakarta` | **Plus Jakarta Sans** | 700, 800 | Headlines, section titles, roman numerals, card titles |

### 2.2 Headline Scale

| Level | Size | Weight | Letter-spacing | Font |
|---|---|---|---|---|
| **Hero headline** | `clamp(24px, 5.5vw, 68px)` | 800 | `-0.02em` | Jakarta |
| **Section title** | `clamp(2rem, 4vw, 3.5rem)` – `clamp(32px, 5vw, 64px)` | 800 | `-0.03em` | Jakarta |
| **Noosphere title** | `clamp(28px, 7vw, 88px)` | 800 | `-0.03em` | Jakarta |
| **About title** | `clamp(38px, 5.5vw, 72px)` | 800 | `-0.035em` | Jakarta |
| **Countdown digits** | `clamp(68px, 10vw, 124px)` | 800 | `-0.045em` | Jakarta |

### 2.3 Body / Label Scale

| Role | Size | Weight | Spacing |
|---|---|---|---|
| Body paragraph | `clamp(15px, 1.35vw, 17px)` | 400 | — |
| Small body | `clamp(13px, 1.3vw, 15px)` | 400 | — |
| Card description | `12px` | — | — |
| Nav links | `10px` | 500 | `0.07em`, uppercase |
| CTA button | `11px` | 600 | `0.1em`, uppercase |
| Eyebrow labels | `9px` – `10px` | 600–700 | `0.35em` – `0.5em`, uppercase |
| Pill tags (accent) | `9px` | 600 | `0.28em`, uppercase |
| Pill tags (muted) | `8px` | 500 | `0.15em`, uppercase |
| Stat number | `clamp(22px, 3vw, 32px)` | 700 | `-0.02em` |
| Stat label | `11px` | 500 | `0.1em`, uppercase |
| Footer copyright | `10px` | — | `0.08em` |

### 2.4 Headline Pattern: Solid + Outlined

Used consistently across all section titles:

```
<span style={{ color: "#ffffff" }}>Solid Word </span>
<span style={{
  color: "transparent",
  WebkitTextStroke: "1px rgba(155,48,255,0.75)"
}}>Outlined Word</span>
```

Examples: "TSYP **Congress**", "14th **Edition**", "The **Chronology**", "Our **Partners**", "Talks & **Discussion**", "The Organizations **Behind TSYP 14**"

### 2.5 Giant Watermarks

Large ghost text placed absolutely behind sections:

```css
font-size: clamp(120px, 18vw, 240px) – clamp(180px, 28vw, 380px);
font-weight: 800;
color: transparent;
-webkit-text-stroke: 1px rgba(155,48,255, 0.04–0.07);
font-family: var(--font-jakarta);
user-select: none;
pointer-events: none;
```

Used: "XIV" (About), "TSYP" (Editions)

---

## 3. Spacing & Layout

### 3.1 Section Padding

| Section | Padding |
|---|---|
| Standard section | `100px 0 120px` |
| Hero | Full viewport `min-height: 100dvh` |
| Countdown | `88px 0 104px` |
| Speakers | `100px 0 110px` |
| Footer | `44px clamp(20px, 5vw, 56px) 36px` |
| Content max-width | `1200px` (centered) |
| Inner content padding | `0 clamp(20px, 5vw, 56px)` or `0 24px` |

### 3.2 Grid Systems

**About section**: 3-column grid `1fr 2fr 1fr`, gap `64px`, collapses to `1fr` on mobile.

**Theme description**: 2-column grid `1fr 1px 1fr` with a vertical divider, collapses to `1fr`.

**Who We Are cards**: Flexbox, `flex: 1 1 0`, `max-width: 360px`, wraps to column on mobile.

**Partners**: Flexbox wrap, `gap: 12px`.

### 3.3 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 768px` (mobile) | Single column layouts, hamburger nav, reduced padding (`20px`), stacked cards |
| `768px – 1023px` (tablet) | 2-column about grid, smaller card max-width (`280px`), adjusted padding (`32px`) |
| `≥ 1024px` (desktop) | Full 3-column grids, all features visible |

---

## 4. Component Patterns

### 4.1 Navbar

- **Height**: `64px`, fixed, `z-index: 100`
- **Background**: `rgba(0,0,0,0.55)` + `backdrop-filter: blur(24px)`
- **Border-bottom**: `1px solid rgba(155,48,255,0.12)`
- **Desktop**: centered pill group with magic-move highlight (`layoutId="nav-pill"` via Framer Motion)
- **Nav pill hover**: `linear-gradient(135deg, rgba(155,48,255,0.22), rgba(124,58,237,0.14))` + border `rgba(155,48,255,0.38)`
- **Mobile**: hamburger → fullscreen overlay `rgba(0,0,0,0.92)` + `backdrop-filter: blur(24px)`
- **CTA button**: `linear-gradient(135deg, #9b30ff, #7c3aed)`, `border-radius: 8px`

### 4.2 Section Header (Eyebrow Pattern)

Used in every section — the universal section intro pattern:

```
┌─────────────────────────────────────────────┐
│   ── line ──  EYEBROW LABEL  ── line ──     │
│                                             │
│          Solid Word  Outlined Word          │
│                                             │
│        optional subtitle (muted)            │
└─────────────────────────────────────────────┘
```

- **Lines**: `32px` wide, `1px` height, gradient `transparent → rgba(155,48,255,0.5)`
- **Eyebrow**: `9px–10px`, weight `600–700`, spacing `0.38em–0.5em`, uppercase, color `rgba(155,48,255,0.6–0.75)`
- **Title**: Jakarta, `clamp(2rem, 4vw, 3.5rem)`, weight `800`, solid + outlined pattern
- **Subtitle**: `12px–13px`, uppercase, `rgba(255,255,255,0.25–0.28)`

### 4.3 Cards

**Speaker Card** (`220px` wide):
- Background: `rgba(6, 2, 22, 0.82)`
- Border: `1px solid rgba(155,48,255,0.16)`, radius `16px`
- Hover: `translateY(-7px) scale(1.025)`, border → `0.5`, box-shadow with purple glow
- Scan line animation on hover
- Top glow line on hover
- Avatar with initials fallback (gradient background, `42px` font, Jakarta)
- Country flag badge

**Edition Card** (`190×270px`):
- Same surface treatment as speaker cards
- Corner brackets (`:before`/`:after` style, `14px`)
- Dot grid background (`22px` spacing)
- Roman numeral centerpiece (outlined text)
- Scan line + top glow on hover
- Year badge pill

**Flip Card** (`360px max`, `420px` height):
- Animated conic-gradient border (`borderSpin` animation)
- `perspective: 1200px`, `rotateY(180deg)` on hover
- Front: logo + title + "Hover" hint
- Back: about label + title + description + social links

**Memory Card**:
- Width: `clamp(260px, 28vw, 380px)`, aspect `16/10`
- Hover: `scale(1.04)`, purple border glow

**Partner Card**:
- Height: `72px`, width: `clamp(120px, 15vw, 175px)`
- Logo: white-filtered (`brightness(0) invert(1)`), `opacity: 0.5` → `0.9` on hover

### 4.4 Buttons

**Primary CTA (Register)**:
- `linear-gradient(135deg, #9b30ff, #7c3aed)`
- Border: `1px solid rgba(155,48,255,0.4)`
- Border-radius: `8px` (desktop) / `10px` (mobile)
- Text: `11px`, weight `600`, spacing `0.1em`, uppercase, white
- Hover: `scale(1.03)`, box-shadow `0 0 24px rgba(155,48,255,0.35)`

**Arrow Buttons** (Speakers carousel):
- `44px` circle, `border-radius: 50%`
- Background: `rgba(155,48,255,0.1)` → `0.22` on hover
- Border: `rgba(155,48,255,0.3)` → `0.65` on hover
- Icon: SVG chevron, stroke `rgba(155,48,255,0.9)`

**Social Buttons** (Footer):
- `36px × 36px` (mobile: `44px × 44px` for touch target)
- Background: `rgba(255,255,255,0.04)` → `rgba(155,48,255,0.1)` on hover
- Border: `rgba(155,48,255,0.15)` → `0.45` on hover
- Border-radius: `8px`

**Social Buttons (Flip Card)**:
- `36px × 36px`, radius `10px`
- Background: `rgba(155,48,255,0.12)` → `0.28` on hover

### 4.5 Pill Tags

Used in the Theme section for keywords:

- **Accent pill**: `9px`, weight `600`, spacing `0.28em`, padding `5px 13px`, `border-radius: 100px`
  - Color: `rgba(155,48,255,0.75)`, border `rgba(155,48,255,0.22)`, bg `rgba(155,48,255,0.07)`
- **Muted pill**: `8px`, weight `500`, spacing `0.15em`, padding `4px 11px`
  - Color: `rgba(155,48,255,0.42)`, border `rgba(155,48,255,0.1)`, bg `rgba(155,48,255,0.03)`

### 4.6 Divider Lines

Gradient horizontal dividers are used everywhere:

```css
height: 1px;
background: linear-gradient(90deg,
  transparent 0%,
  rgba(155,48,255,0.4) 30%,
  rgba(200,80,180,0.3) 60%,
  transparent 100%
);
```

Variations use different opacity and color mixes, but always **purple → magenta → transparent**.

---

## 5. Visual Effects

### 5.1 Ambient Glows

Every section has 1–2 absolute-positioned radial gradient blobs:

```css
position: absolute;
width: 400px–1000px;
height: 350px–600px;
background: radial-gradient(ellipse, rgba(100,20,200, 0.06–0.11), transparent 65–70%);
pointer-events: none;
filter: blur(40px–60px);
```

### 5.2 Top Glow Accents

Cards and the footer use a top-edge glow line:

```css
position: absolute;
top: 0; left: 15–20%; right: 15–20%;
height: 1–2px;
background: linear-gradient(90deg, transparent, rgba(155,48,255,0.7), transparent);
box-shadow: 0 0 14–20px rgba(155,48,255,0.25–0.6);
opacity: 0 → 1 on hover;
```

### 5.3 Scan Lines

Horizontal sweep that descends through a card on hover:

```css
height: 60–80px;
background: linear-gradient(to bottom, transparent, rgba(155,48,255,0.09–0.12), transparent);
animation: 2.5–2.8s linear infinite;
```

### 5.4 Dot Grid

Subtle pattern used on edition cards:

```css
background-image: radial-gradient(circle, rgba(155,48,255,0.13) 1px, transparent 1px);
background-size: 22px 22px;
opacity: 0.55 → 0.85 on hover;
```

### 5.5 Edge Masks

Used on marquees and carousels for smooth fade-out:

```css
mask-image: linear-gradient(90deg, transparent, black 4–8%, black 92–96%, transparent);
```

---

## 6. Animations & Motion

### 6.1 Framer Motion Defaults

**Easing**: `[0.16, 1, 0.3, 1]` (used everywhere as `EASE` constant — a snappy spring-like cubic-bezier)

**Fade-up entrance**:
```
initial: { opacity: 0, y: 16–28 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6–0.85, ease: EASE, delay: staggered }
```

**Scale-X line draws**:
```
initial: { scaleX: 0 }
animate: { scaleX: 1 }
transformOrigin: "left center" or "center"
```

**Stagger pattern**: items use `delay: baseDelay + index * 0.06–0.15`

### 6.2 CSS Animations

| Name | Duration | Usage |
|---|---|---|
| `shimmerWhite` | `6s linear infinite` | Hero headline shimmer sweep |
| `gradientShift` | `5s ease infinite` | Gradient-flow headline |
| `badgeGlow` | `3s ease-in-out infinite` | Edition badge pulse |
| `marquee` | `28s linear infinite` | Logo scroll bar |
| `editionScrollLeft` | `55s linear infinite` | Editions row 1 |
| `editionScrollRight` | `45s linear infinite` | Editions row 2 |
| `memoriesScrollLeft` | `40s linear infinite` | Memories row 1 |
| `memoriesScrollRight` | `54s linear infinite` | Memories row 2 |
| `borderSpin` | `3s linear infinite` | Flip card conic gradient border |
| `speakerScan` | `2.5s linear infinite` | Speaker card scan line |
| `editionScan` | `2.8s cubic-bezier infinite` | Edition card scan line |

All marquees pause on hover: `animation-play-state: paused`.

All scan/motion animations respect `prefers-reduced-motion: reduce` → `animation: none`.

### 6.3 Hover Transitions

Standard card hover:
```css
transition:
  transform    0.4–0.45s cubic-bezier(0.16, 1, 0.3, 1),
  box-shadow   0.4–0.45s cubic-bezier(0.16, 1, 0.3, 1),
  border-color 0.4–0.45s cubic-bezier(0.16, 1, 0.3, 1);
```

Hover transform: `translateY(-7px to -10px) scale(1.025)`

### 6.4 Special Animations

- **Cycling word** (Hero): `AnimatePresence mode="wait"`, `rotateX` flip, 2.5s interval
- **Slot-machine countdown**: vertical strip sliding to digit position
- **Line reveal**: `y: "110%" → "0%"` with overflow hidden clip
- **Draggable carousel** (Speakers): Framer Motion `drag="x"` with elastic bounce

---

## 7. Glassmorphism & Surface Treatment

### 7.1 Frosted Glass

- **Navbar**: `backdrop-filter: blur(24px)` on `rgba(0,0,0,0.55)`
- **Mobile menu**: `backdrop-filter: blur(24px)` on `rgba(0,0,0,0.92)`
- **Edition cards**: `backdrop-filter: blur(14px)` on semi-transparent surface
- **Flag badges**: `backdrop-filter: blur(8px)` on `rgba(0,0,0,0.6)`
- **Nav pill group**: `rgba(255,255,255,0.025)` with `rgba(155,48,255,0.1)` border

### 7.2 Box Shadows

Card hover glow pattern:
```css
box-shadow:
  0 0 32–40px rgba(155,48,255, 0.16–0.18),
  0 18–24px 52–64px rgba(0,0,0, 0.55–0.6);
```

CTA button glow: `0 0 16–24px rgba(155,48,255, 0.2–0.35)`

---

## 8. Icons

All icons are **inline SVGs** — no icon library dependency (despite lucide-react in package.json).

Standard icon size: `11px–17px`

Common icons used:
- Location pin (map marker)
- Calendar
- People (users)
- Chevron left/right (arrows)
- LinkedIn, Facebook, Instagram, Globe (social)

---

## 9. Tech Stack & Dependencies

| Package | Version | Purpose |
|---|---|---|
| Next.js | 16.2.4 | Framework (App Router, Turbopack) |
| React | 19.2.4 | UI library |
| Tailwind CSS | 4.x | Utility classes (minimal usage — most styles are inline) |
| Framer Motion | 12.38.x | Animations, drag, layout transitions |
| lucide-react | 1.8.x | Installed but not actively used (SVGs are inline) |
| @tsparticles | 3.x | Particle canvas in hero |
| threejs-components (CDN) | 0.0.19 | Tubes cursor effect in Theme section |

### Styling approach

**Primarily inline styles** (`style={{ }}`) — not Tailwind classes. The only CSS file is `globals.css` which handles:
- CSS custom properties / theme
- Keyframe animations
- Responsive media queries
- Complex pseudo-element styles (scan lines, dot grids, corner brackets)

New pages should follow this same inline-style-first approach.

---

## 10. Key Design Principles

1. **Dark-only**: Pure black (`#000`) background — no light mode.
2. **Monochromatic purple**: The only accent is the purple spectrum (`#6d28d9` → `#9b30ff` → `#c026d3`). No other colors.
3. **Solid + Outlined headlines**: Every section title pairs solid white text with purple-stroked outlined text.
4. **Eyebrow pattern**: Lines + uppercase small label above every section title.
5. **Ambient glows**: Subtle radial purple blobs behind every section for depth.
6. **Hover elevation**: Cards lift (`translateY(-7 to -10px) scale(1.025)`) and gain purple glow borders.
7. **Scan lines on hover**: Animated light sweeps on cards.
8. **Edge fades on carousels**: Gradient masks on marquee/scroll elements.
9. **Staggered reveal**: Elements fade-up with progressive delays on scroll.
10. **Accessibility**: `prefers-reduced-motion` respected, `aria-hidden` on decorative elements, `aria-label` on buttons, `44px` min touch targets on mobile.
