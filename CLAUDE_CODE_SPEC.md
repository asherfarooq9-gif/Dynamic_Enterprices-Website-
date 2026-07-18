# Dynamic Enterprises — Website Build Spec

Handoff for Claude Code. All sections below were approved as HTML/CSS/JS prototypes.
Reference files live in `/sections/`. Convert to Next.js 14 (App Router) components.

---

## Brand System

**Colors**
| Token | Hex | Use |
|---|---|---|
| `navy` | `#1a2332` | Primary brand, headings, dark sections |
| `navy-light` | `#2d3d55` | Gradient stops, hover states |
| `navy-deep` | `#0f1620` / `#0a0f18` / `#060a12` | Dark section gradients |
| `mustard` | `#d4b74a` | Accent, CTAs, pins, highlights |
| `mustard-dark` | `#a68b30` | Vein textures, gradients |
| `cream` | `#f5f0e6` | Light text on dark, light backgrounds |
| `cream-warm` | `#e8dcc0` | Alt light backgrounds |
| `white` | `#ffffff` | Final CTA background |

**Typography**
- Font: **Roboto only** — weights 400 (body) and 700 (everything else)
- Headings: Roboto Bold, tight letter-spacing (-1.5px to -2px), line-height ~0.95
- Eyebrows/labels: 9–11px, letter-spacing 2–4px, uppercase
- Load: `Roboto:wght@400;700` from Google Fonts

**Tech Stack**
- Next.js 14 App Router
- React Three Fiber (hero particles only — or keep Canvas 2D version)
- GSAP + ScrollTrigger for scroll reveals
- Lenis smooth scroll
- Tailwind CSS
- All photos: client uploads — every section has marked drop slots with exact aspect ratios

---

## Page Assembly Order

1. `01-hero-dust.html` — Cinematic dust particle hero
2. `02-floating-cards.html` — Floating tilted service cards + nav pill
3. `03-craft-heritage.html` — Pakistan craft map + 2 story cards
4. `04-work-marquee.html` — Auto-scrolling project strip
5. `05-complexity-steps.html` — 4-step cascade (landscape, navy gradient)
6. `06-founder-story.html` — From Islamabad Since 2011
7. `07-final-cta.html` — White marble CTA, navy gradient text

---

## Section Specs

### 01 — Hero: Cinematic Dust
- Full-viewport canvas, navy radial gradient base (`#243349 → #1a2332 → #0a0f18`)
- "DYNAMIC" (Roboto 700) + "ENTERPRISES" (Roboto 300, letterspaced) rendered as particles
- Particle lifecycle: **coalesce from edges → rest with breathing wobble → wind disintegrate → loop**
- Particle colors: 70% cream `#f5f0e6`, 30% mustard `#d4b74a`, few `#c9b98a`
- Cursor repels particles (radius ~70px)
- Ambient floating dust drifting upward (80 particles)
- Mustard radial glow bottom-right, diagonal light ray, vignette
- Nav links top: INTERIOR · SUPPLIES · FILMS · EVENTS
- Scroll cue: mustard line pulsing down
- **Claude Code task:** port Canvas 2D to R3F points shader OR keep Canvas 2D — perf test both. Trigger disintegrate on scroll instead of timer.

### 02 — Floating Cards (services intro)
- Dark navy `#0a0f18` with faint mustard line-grid background
- Center glass nav pill: ◆ DYNAMIC | HOME SERVICES WORK ABOUT | EN/UR | CONTACT
- 4 floating photo cards, slight rotations (-3°, 0°, 3°, -2°), staggered z-index
- Card sizes: Interior 280×320, Supplies 360×360 (center feature), Films 260×330, Events 200×200 (accent)
- White pill label centered on each card (Events pill = mustard)
- Hover: card straightens, lifts, mustard 1px outline
- Photo slots: cards 1/3 = 4:5, cards 2/4 = 1:1
- Bottom row: EST MMXI | DYNAMIC ENTERPRISES + tagline | 04 DISCIPLINES

### 03 — Craft Heritage
- Cream `#f5f0e6` base, mustard swirl strokes background (blurred bezier ribbons)
- Heading: "CONNECTION TO CRAFT AND **HERITAGE.**" (HERITAGE in mustard)
- Meta counter top-right: 04 REGIONS / 12 MAKERS / SINCE 2011
- Left tall card: Pakistan silhouette SVG, 6 pins with pulse rings:
  - Islamabad (STUDIO), Lahore (BRASS), Chiniot (WOOD), Multan (TEXTILE), Khyber (MARBLE), Karachi (LEATHER)
  - Dashed connector lines from Islamabad hub to each
  - Horizontal ledger lines behind map
- Right stacked cards: "Built by master artisans" + "Creative engineering for complex ideas"
- Photo slots on right cards: 16:9 · 1920×1080
- **Animation:** pins pop sequentially on scroll, dashed lines draw

### 04 — Work Marquee
- Near-black `#0a0a0a` background
- Heading top-left: "WORK THAT SPEAKS FOR US" (white, Roboto Bold 44px)
- Auto-scrolling horizontal strip, CSS keyframe translateX(-50%), duplicated track for seamless loop, ~38s duration
- Ticker tick-marks row above AND below strip
- Cards: **170×200px**, uniform, 5px radius, project code centered below (BH, SS, CL, DV, IC, MS, ET, AHM)
- Hover: pause marquee, card scales 1.1, mustard outline, project name + category fades in over bottom gradient
- Edge fade: 60px gradient masks left/right
- Photo slots: portrait, replace SVG placeholders with client photos

### 05 — Complexity Steps (Method)
- Background: radial navy gradient `#2d3d55 → #1a2332 → #0f1620 → #060a12` (logo navy only, NO mustard)
- Soft horizontal light streaks (blurred navy bands)
- Heading white: "WE HANDLE ALL THE COMPLEXITY" — top-left
- 4 steps cascade LANDSCAPE: each offset +230px right, slight vertical stagger
- L-shaped hairline connectors (white 14% opacity) linking steps
- Step: small number left, bold title, gray body text (white 55%)
- Steps content:
  1. Smarter design, better performance
  2. Turning vision into precision
  3. The right partners, the right results
  4. Turnkey procurement & installation
- **Animation:** IntersectionObserver — steps fade+slide up sequentially (450ms stagger). Convert to GSAP ScrollTrigger with scrub in production.

### 06 — Founder Story
- Dark navy `#0a0f18`, mustard marble vein SVG background
- Center glass nav pill (same as section 02)
- Two-column: text left / photo right
- Heading: "FROM ISLAMABAD, SINCE 2011"
- Three body paragraphs (poetry of design / engineering discipline / made in Pakistan)
- Two founder blocks: script signature (Homemade Apple font as placeholder — replace with real signature scans), name + role below
- Photo slot right: B&W Islamabad skyline, 5:4 · 2400×1920, drop-zone marked

### 07 — Final CTA
- **White marble** background: white → `#f4f6f9` → `#eceff4` gradient + navy vein strokes (subtle, 16–22% opacity)
- ◆ DYNAMIC ENTERPRISES monogram top-center (navy + mustard diamond)
- Heading with **navy gradient text** (`#2d3d55 → #1a2332 → #3d5273 → #1a2332`, background-clip:text):
  "SPACES DESIGNED. STORIES DELIVERED."
- Subline: INTERIOR · SUPPLIES · FILMS · EVENTS — ONE STUDIO, FULL ACCOUNTABILITY
- Navy button "START A PROJECT" — hover flips to mustard, lifts 2px
- Footer strip: ISLAMABAD · PAKISTAN | EST · MMXI

---

## Global Animation Rules (production)

- Lenis smooth scroll wrapper
- GSAP ScrollTrigger for all reveals (replace IntersectionObserver prototypes)
- Text reveals: SplitText stagger 40ms fade-up
- Image reveals: clip-path wipe 800ms
- Parallax: 20% y-offset on photos
- Section transitions: mustard curtain wipe (optional)
- Custom cursor: mustard dot, scales on interactive elements
- Respect `prefers-reduced-motion`
- Marquee pauses on hover
- Page load: dust particles assemble logo → dissolve into hero

## Photo Slot Summary (client to provide)

| Section | Slot | Ratio | Size |
|---|---|---|---|
| Floating cards | Interior, Films | 4:5 | 1600×2000 |
| Floating cards | Supplies, Events | 1:1 | 1600×1600 |
| Craft heritage | 2 story cards | 16:9 | 1920×1080 |
| Work marquee | 8+ project cards | ~6:7 portrait | 1200×1400 |
| Founder story | Skyline B&W | 5:4 | 2400×1920 |
| Hero | optional bg | 16:9 | 2560×1440 |

## Placeholder Content To Replace

- Project names (Bahria Heights, Serena Suites, etc.) — swap with real client projects
- Founder names/roles — confirm with client
- "Since 2011" / "MMXI" — confirm founding year
- Signatures — replace script font with scanned SVG signatures
- Craft regions/materials — confirm actual supplier regions
