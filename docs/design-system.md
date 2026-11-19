# Site design vocabulary

The existing site is canonical. This is a small set of Astro/CSS recipes, not a
new framework. Keep native markup, existing visual differences and local styles
unless sharing removes real duplication. Page-specific styles stay with their
page; they are not reusable system components.

## Find the source

| Decision / pattern | Canonical source                                                                 | Anatomy and permitted variation                                                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shell              | [`src/layout.astro`](../src/layout.astro), [`src/styles.css`](../src/styles.css) | Document metadata, global stylesheet and slot. Typed `mode`: `default` (800px), `article` (60rem), `wide` (100rem). Modes are mutually exclusive; optional `title`/`description`.                     |
| Fonts and type     | [`src/fonts.css`](../src/fonts.css), global CSS, page styles                     | Rajdhani 500 headings/metadata, system body font. Display, headings and prose sizes stay contextual. No downloaded body font.                                                                         |
| Metadata           | Global `.metadata`                                                               | Muted color, heading font, 500 weight, 1rem, lowercase. Use real `<time datetime="…">` elements for dates; the class provides typography, not date semantics.                                         |
| Linked entry       | [`src/pages/index.astro`](../src/pages/index.astro)                              | Article wrapper, full-entry anchor, decorative border SVG, optional metadata, heading, optional summary. Home-local recipe; posts, projects and adventures keep their content/transition differences. |
| Prose              | [`src/pages/[...slug].astro`](../src/pages/[...slug].astro)                      | Content wrapper around rendered Markdown; scoped headings, lists, quotes, code and responsive images.                                                                                                 |
| Footer             | [`src/footer.astro`](../src/footer.astro)                                        | Shared RSS link and socials for home/article pages.                                                                                                                                                   |
| Socials            | [`src/socials.astro`](../src/socials.astro)                                      | Native nav and named anchors containing sprite SVGs; share the content rather than reproducing icon links.                                                                                            |
| Motion and print   | Page scripts, Socials, global and page print CSS                                 | Preserve intentional timing/play-mode differences. Central palette remap; page rules handle print layout, not a parallel color palette.                                                               |

All examples below use real source contracts. They are documentation, not a
production component gallery or additional public route.

## Colors and allowed pairings

The values live only in `src/styles.css`. Do not duplicate a palette in a JSON
file, this guide or an agent prompt.

- Surfaces: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`.
- Normal text: `--text-primary` (headings/strong), `--text-secondary` (body and
  supporting copy), `--text-muted` (metadata and blockquotes).
- Actions: `--accent`, `--accent-hover`; `--border` is decorative, not a text
  role.
- All three text roles and both accent roles are approved on all three surfaces,
  with a minimum **4.5:1** contrast ratio. Inverse action text uses
  `--bg-primary` on accent/accent-hover. Recheck these combinations in screen
  and print when changing the palette.
- Never use the decorative border color for informative text or as the only
  focus indicator. Custom entry focus outlines use the accent role.
- Preserve small-text contrast; do not dim informative metadata with opacity.
- Print overrides remap the same roles. New shared rules must use these roles,
  not literal print colors.

## Dimensions and typography

Global `.metadata` is shared because multiple real contexts have identical
styling. Other spacing, type and radius values remain local CSS literals where
that is clearer. Promote a value when several consumers need the same decision
to change together, not to introduce a token for each number.

- Body: system font stack, secondary text, 1.6 line height.
- Display: home-only fluid green title; do not apply it to every page heading.
- Headings: Rajdhani; page heading classes use primary text (the home display
  uses accent). An unstyled heading inherits body color. Semantic level follows
  page structure.
- Metadata: `.metadata`; home adds letter spacing locally.
- Prose: fluid 1.125–1.25rem with 1.7 line height; article body uses secondary
  text, while blockquotes use muted text with an accent border and no
  background. Article-specific rules stay scoped.

## Real composition examples

### Home entry (local to the homepage)

```html
<article>
  <a href="/building-design-tokens-app/" class="entry">
    <svg class="entry-border" aria-hidden="true">
      <path pathLength="100"></path>
    </svg>
    <time class="entry-meta metadata" datetime="2025-01-01"
      >January 1, 2025</time
    >
    <h3 class="entry-title">Building a design-token app</h3>
    <p class="entry-description">A short summary.</p>
  </a>
</article>
```

Example date/copy above are illustrative, not content to publish. `.entry`
styles and its ResizeObserver are scoped to `index.astro`; copying this markup
to another page alone does **not** make the recipe available there. If a second
page truly needs it, extract markup/styles/behavior together with a right-sized
typed contract and before/after screenshots. Until then, keep the three simple
home render paths explicit rather than adding a configuration-heavy component.
Never nest another link, button or form control inside a full-entry link.

### Article, footer and socials

```astro
---
import Layout from "../layout.astro";
import Footer from "../footer.astro";
---

<Layout mode="article" title="An article — TrySound">
  <main>
    <h1>An article</h1>
    <!-- The production article template owns the scoped prose wrapper. -->
    <p>Page content stays semantic.</p>
  </main>
  <Footer />
</Layout>
```

Use `Socials` directly when composing a different footer. Keep link accessible
names and the nav's natural document order; do not use icon shape alone as a
name. Import it from `../socials.astro` in that alternative composition.
Markdown/prose must render through the actual article template to receive its
scoped typography.

## Responsive, motion and accessibility contracts

- Supported minimum layout width: **320 CSS pixels**. Home is one column at
  700px and below, two above. Article header socials appear at 701px; footer
  socials remain available. Other page widths are contextual, not forced to one
  layout.
- Grids must never require a column wider than their own container. Use
  `min(100%, …)` for an intrinsic minimum, and allow long words/URLs to wrap.
  The shared body uses `overflow-wrap: anywhere` to support enlarged text. Do
  not hide horizontal overflow to conceal a sizing bug.
- Check 320/390/700/701/1440px, enlarged text and 200% browser zoom when
  changing layout. Review affected pages, including print pagination.
- Language is English (`lang="en"`). Logical properties are preferred for new
  layout rules, but RTL/vertical writing are **not claimed supported**; do not
  rename every existing physical property as an unrelated cleanup.
- Links must remain reachable in document order with visible keyboard focus.
  Entry outlines supplement hover effects. Never disable outlines without an
  equally visible, tested replacement. Use anchors for navigation/mail and
  native buttons for actions that change application state.
- Home glitch: automatic, 14s cycle; article brand: hover, 600ms; socials:
  hover. The three local configurations intentionally differ. Each checks
  reduced motion on load; reload after changing the preference. CSS link/entry
  transitions and view-transition group animations are disabled under reduced
  motion.
- Glitch effects are decorative and may not change accessible names. Content and
  links work without JavaScript; home border geometry is optional enhancement.
- Print hides shared footers, remaps palette and appends external URLs.
  Page-specific print layout stays local. Do not override shared role colors
  locally.

## Change policy

Run the commands and manual review checklist in [README.md](../README.md). Use
real pattern contracts, native semantics and approved text/surface pairs. Fix
guide ambiguity when a composition is unclear; do not add a separate metadata
service or MCP layer for this local site.
