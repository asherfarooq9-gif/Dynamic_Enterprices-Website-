# SEO Status — Dynamic Enterprises

Last updated: 2026-07-21. Domain: `https://www.dynamicenterprises.pk`.

## Done (shipped in commit `9a61196`)

- **H1 fix** — `supplies`, `corporate-films`, `scrub-uniforms` service pages had zero H1. Fixed via `ServiceSection.tsx` `headingLevel` prop.
- **Sitemap** (`app/sitemap.ts`) — was `lastModified: new Date()` (fake freshness signal) on every request. Now fixed dates + `changeFrequency`/`priority` per route.
- **Meta descriptions** — every page shared an identical ~150-char suffix (`SITE.description`). Now every page (home, services hub, 4x service detail, work, about, contact) has an independent 120-160 char description. Homepage had zero metadata before — now has its own `title`/`description`/OG/Twitter.
- **JSON-LD** (`app/layout.tsx`) — upgraded generic `Organization` → `ProfessionalService` with logo, full address, real Instagram in `sameAs` (`https://www.instagram.com/dynamicenterprises25`). Added sitewide `WebSite` schema and `Review` schema from real testimonials (`content/about.ts` `TESTIMONIALS` — confirmed real, not placeholder).
- **Per-service schema** (`app/services/[slug]/page.tsx`) — added `BreadcrumbList` + `Service` schema on each of the 4 service pages.
- **OG/Twitter share images** — `app/opengraph-image.tsx` + `app/twitter-image.tsx` added (programmatic, branded, no photo asset needed).
- **Manifest** — `app/manifest.ts` added.
- **Alt text** — fixed generic alt on `ScrubUniformsProductsGrid.tsx`, fixed index-based alt (`Interior project 1/2/3...`) on `InteriorGallery.tsx` with real descriptive strings.
- Google Search Console verification file added (`public/google688e1a9b1648e852.html`), domain confirmed `www.dynamicenterprises.pk`.

## Remaining — code side (needs facts before it can be done, don't invent)

- **Service body copy rewrite** — `content/services.ts` copy is flagged in-file as placeholder. Need: confirmed target keywords per discipline, and confirm target cities (project data spans Islamabad/Lahore/Rawalpindi/Chiniot, not just Karachi — `SITE.city` currently says Karachi only).
- **Studio opening hours** — needed for `openingHours` in LocalBusiness schema. Not in codebase anywhere.
- **Postal code + lat/lng** — needed for `geo`/`postalCode` in address schema. `SITE.address` (`lib/site.ts`) is one free-text string; would need splitting into structured parts.
- **Video production dates** — `content/corporate-films.ts` has 5 real client films (Zong 4G, National Food Corporate, etc.) that are good `VideoObject` schema candidates, but need a real/approximate year per video — don't guess.
- **Apple touch icon** — `app/apple-icon.jpg` (180×180 min) not created — needs a real cropped asset, best candidate is `public/images/logo-mark.png`, wasn't done because no image-cropping tool was available in that session.
- **`/work` page discipline coverage** — all 12 projects in `content/projects.ts` are tagged `discipline: 'Interior'`. This is not a bug (no supplies/uniform/pure-film-agency projects exist in the data yet) — it's a content gap. Once real non-interior projects exist, `ProjectsGrid.tsx` needs additional filtered sections (mirrors existing Interior + Corporate Films two-section pattern).
- **LinkedIn** — no real URL yet, omitted from `sameAs`. Add to `app/layout.tsx` `organizationSchema.sameAs` when available.

## Remaining — off-site (this is most of what actually moves ranking now that code-side is clean)

- **Google Business Profile** — claim/verify, NAP (name/address/phone) must exactly match the site, right category, photos, real reviews.
- **Reviews** — real Google reviews with client names push local-pack ranking harder than most on-page work left to do.
- **Backlinks** — Pakistani business directories, industry directories, real client sites (PepsiCo, L'Oréal, Coke Studio, British Council are named real clients in `content/about.ts` — case-study pages linking to them + asking for a mention back helps).
- **Search Console** — submit the (now-fixed) sitemap, monitor Coverage/Performance weekly.
- **Core Web Vitals field data** — build is clean locally; run PageSpeed Insights on the live deployed site to confirm real-world numbers, not just build output.
- **NAP consistency** — same address/phone everywhere (GBP, Instagram bio, directories) — mismatches hurt local SEO trust.
- **Content cadence** — no blog/case-study/insights section exists at all. Regular project write-ups would give Google fresh crawlable content + long-tail keyword surface.

## How to resume in a new session

Tell Claude: "read SEO.md, continue the remaining items." The blockers above need real facts from the business owner before they can be safely implemented — don't let a new session invent hours, coordinates, dates, or copy claims not already in the codebase.
