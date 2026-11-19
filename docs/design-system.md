# Site design vocabulary

The existing site is canonical. This is a small set of Astro/CSS recipes, not a
new framework. Keep native markup, existing visual differences and local styles
unless sharing removes real duplication.

## Find the source

| Decision / pattern | Canonical source                                                                 | Anatomy and permitted variation                                                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shell              | [`src/layout.astro`](../src/layout.astro), [`src/styles.css`](../src/styles.css) | Document metadata, global stylesheet and slot. Typed `mode`: `default` (800px), `article` (60rem), `wide` (100rem). Modes are mutually exclusive; optional `title`/`description`.                     |
| Fonts and type     | [`src/fonts.css`](../src/fonts.css), global CSS, page styles                     | Rajdhani 500 headings/metadata, system body font. Display, headings and prose sizes stay contextual. No downloaded body font.                                                                         |
| Metadata           | Global `.metadata`                                                               | Muted color, heading font, 500 weight, 1rem, lowercase. Use `.metadata` alone for dates. Combine it with `.entry-meta` or `.card-subtitle` only where their additional styling is needed.             |
| Linked entry       | [`src/pages/index.astro`](../src/pages/index.astro)                              | Article wrapper, full-entry anchor, decorative border SVG, optional metadata, heading, optional summary. Home-local recipe; posts, projects and adventures keep their content/transition differences. |
| Content card       | Global `.card*`, [`hire-me.astro`](../src/pages/hire-me.astro)                   | Article, optional full-card anchor, heading, optional metadata and description. Rounded résumé treatment, distinct from homepage entries.                                                             |
| CTA                | Global `.cta-*`, hire page                                                       | Native navigation/mail anchor styled `.cta-button`; optionally title/text inside `.cta-section`. This is not a button behavior component.                                                             |
| Sections and grids | Home and hire scoped styles                                                      | Section with heading, simple grid/flex wrapper and native content. Choose heading level by document outline, not visual size.                                                                         |
| Prose              | [`src/pages/[...slug].astro`](../src/pages/[...slug].astro)                      | Content wrapper around rendered Markdown; scoped headings, lists, quotes, code and responsive images. Do not apply prose rules to cards.                                                              |
| Footer             | [`src/footer.astro`](../src/footer.astro), hire footer                           | Home/article share RSS + socials. Hire has home backlink + socials and a dividing border. Different compositions are deliberate.                                                                      |
| Socials            | [`src/socials.astro`](../src/socials.astro)                                      | Native nav and named anchors containing sprite SVGs; share the content rather than reproducing icon links.                                                                                            |
| Motion and print   | Page scripts, Socials, global and page print CSS                                 | Preserve intentional timing/play-mode differences. Central palette remap; page rules handle print layout, not a parallel color palette.                                                               |

All examples below use real source contracts. They are documentation, not a
production component gallery or additional public route.

## Colors and allowed pairings

The values live only in `src/styles.css`. Do not duplicate a palette in a JSON
file, this guide or an agent prompt.

- Surfaces: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`.
- Normal text: `--text-primary` (headings/strong), `--text-secondary` (body),
  `--text-muted` (metadata).
- Actions: `--accent`, `--accent-hover`; `--border` is decorative, not a text
  role.
- All three text roles and both accent roles are approved on all three surfaces,
  with a minimum **4.5:1** contrast ratio. CTA text uses `--bg-primary` on
  accent/accent-hover. Recheck these combinations in screen and print when
  changing the palette.
- Never use the decorative border color for informative text or as the only
  focus indicator. Custom entry/card focus outlines use the accent role.
- `--text-muted` is brightened for safe small-text use on cards; do not restore
  the old color or dim informative metadata with opacity.
- Print overrides remap the same roles. New shared rules must use these roles,
  not literal print colors. Transparent print cards sit on the document surface.

## Dimensions and typography

Global `.metadata` is shared because four real contexts had identical styling.
Other spacing, type and radius values remain local CSS literals where that is
clearer. Common rhythms are 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5 and 3rem; cards use
an 8px radius and CTA sections 12px. These are observed choices, not a mandate
to introduce a token for each number. Promote a value when several consumers
need the same decision to change together.

- Body: system font stack, secondary text, 1.6 line height.
- Display: home-only fluid green title; do not apply it to every page heading.
- Headings: Rajdhani; page heading classes use primary text (the home display
  uses accent). An unstyled heading inherits body color. Semantic level follows
  page structure.
- Metadata: `.metadata`; home adds letter spacing locally.
- Prose: fluid 1.125–1.25rem with 1.7 line height; article-specific rules stay
  scoped.

## Real composition examples

### Shell and content card

```astro
---
import Layout from "../layout.astro";
---

<Layout title="Project notes — TrySound">
  <main>
    <h1>Project notes</h1>
    <section aria-labelledby="projects-title">
      <h2 id="projects-title" class="section-title">
        Projects
      </h2>
      <article class="card">
        <a class="card-link" href="https://github.com/TrySound/engramma">
          <h3 class="card-title">Engramma</h3>
          <span class="card-subtitle metadata">Design-token editor</span>
          <p class="card-description">Live previews and style guides.</p>
        </a>
      </article>
    </section>
  </main>
</Layout>
```

For static cards, omit the anchor and place the heading/description directly
inside `.card`. Never put another anchor, button or form control inside
`.card-link`. Keep real `<time datetime="…">` elements for actual dates.
`.metadata` is a type recipe, not date semantics. A card grid needs only local
CSS:

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.25rem;
}
```

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

### CTA and section

```html
<section class="cta-section" aria-labelledby="contact-title">
  <h2 id="contact-title" class="cta-title">Let's build something</h2>
  <p class="cta-text">Available for technical consulting.</p>
  <a class="cta-button" href="mailto:me@trysound.io">Get in touch</a>
</section>
```

Use an anchor for navigation/mail. A future action that changes application
state needs a native button with its behavior explicitly designed; do not invent
that API for this content site.

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

Use `Socials` directly when composing a different footer, as hire does. Keep
link accessible names and the nav's natural document order; do not use icon
shape alone as a name. Import it from `../socials.astro` in that alternative
composition. Markdown/prose must render through the actual article template to
receive its scoped typography.

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
  changing layout. Review home, article and hire pages, including print
  pagination.
- Language is English (`lang="en"`). Logical properties are preferred for new
  layout rules, but RTL/vertical writing are **not claimed supported**; do not
  rename every existing physical property as an unrelated cleanup.
- Links must remain reachable in document order with visible keyboard focus.
  Entry/card outlines supplement hover effects. Never disable outlines without
  an equally visible, tested replacement.
- Home glitch: automatic, 14s cycle; article brand: hover, 600ms; socials:
  hover. The three local configurations intentionally differ. Each checks
  reduced motion on load; reload after changing the preference. CSS
  link/card/entry transitions and view-transition group animations are disabled
  under reduced motion.
- Glitch effects are decorative and may not change accessible names. Content and
  links work without JavaScript; home border geometry is optional enhancement.
- Print hides footers and mail CTA, remaps palette and appends external URLs.
  Résumé-specific rules control grid/padding/page-break behavior. Do not
  override shared role colors locally.

## Change policy

Run the commands and manual review checklist in [README.md](../README.md). Use
real pattern contracts, native semantics and approved text/surface pairs. Fix
guide ambiguity when a composition is unclear; do not add a separate metadata
service or MCP layer for this local site.
