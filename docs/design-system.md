# Site design vocabulary

The existing site is canonical. This is a small set of Astro/CSS recipes, not a
new framework. Keep native markup, existing visual differences and local styles
unless sharing removes real duplication. Page-specific styles stay with their
page; they are not reusable system components.

## Find the source

| Decision / pattern | Canonical source                                                                                   | Anatomy and permitted variation                                                                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shell              | [`src/layout.astro`](../src/layout.astro), [`src/styles.css`](../src/styles.css)                   | Document metadata, global stylesheet and slot. Typed `mode`: `default` (800px), `article` (60rem), `wide` (100rem). Modes are mutually exclusive; optional `title`/`description`. |
| Fonts and type     | [`src/fonts.css`](../src/fonts.css), global CSS, page styles                                       | Shared family primitives, semantic typography variables, and text-treatment classes in global CSS. No downloaded body font.                                                       |
| Metadata           | Global `.metadata`                                                                                 | Muted color, shared metadata typography, lowercase. Use real `<time datetime="…">` elements for dates; the class provides typography, not date semantics.                         |
| Linked card        | [`src/styles.css`](../src/styles.css), [`src/pages/index.astro`](../src/pages/index.astro)         | Shared `.card` link and `.card-border` SVG, composed with existing text classes. Posts, projects and adventures retain local layout, orientation and transition names.            |
| Prose              | [`src/styles.css`](../src/styles.css), [`src/pages/[...slug].astro`](../src/pages/[...slug].astro) | Shared `.prose` wrapper around native Markdown; headings, lists, quotes, code, links and responsive images.                                                                       |
| Footer             | [`src/footer.astro`](../src/footer.astro)                                                          | Shared RSS link and socials for home/article pages.                                                                                                                               |
| Socials            | [`src/socials.astro`](../src/socials.astro)                                                        | Native nav and named anchors containing sprite SVGs; share the content rather than reproducing icon links.                                                                        |
| Motion             | Page scripts, Socials, shared CSS                                                                  | Preserve intentional timing/play-mode differences. CSS motion opts in under `no-preference` beside its owning selector; view-transition navigation is gated separately.           |

All examples below use real source contracts. They are documentation, not a
production component gallery or additional public route.

## Colors and allowed pairings

The site is dark-only. `src/layout.astro` announces the dark color scheme before
styles load; `:root` in `src/styles.css` declares `color-scheme: only dark` for
browser-provided UI and to opt out of automatic color-scheme overrides. This is
not a light/dark theme switch; system light preferences do not remap the
palette.

The values live only in `src/styles.css`. Do not duplicate a palette in a JSON
file, this guide or an agent prompt.

- Surfaces: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`.
- Normal text: `--text-primary` (headings/strong), `--text-secondary` (body and
  supporting copy), `--text-muted` (metadata and blockquotes).
- Actions: `--accent`, `--accent-hover`; `--border` is decorative, not a text
  role.
- All three text roles and both accent roles are approved on all three surfaces,
  with a minimum **4.5:1** contrast ratio. Inverse action text uses
  `--bg-primary` on accent/accent-hover. Recheck these combinations when
  changing the palette.
- Never use the decorative border color for informative text or as the only
  focus indicator. Focus outlines use the accent role through the shared outline
  variables.
- Preserve small-text contrast; do not dim informative metadata with opacity.

## Site icons

[`public/favicon.svg`](../public/favicon.svg) is the favicon source: an outlined
Rajdhani Medium “T” from the self-hosted font, using the accent on the primary
surface. Keep its colors aligned with `src/styles.css`; the fixed dark tile
works with both light and dark browser chrome. This is separate from
`public/icon.svg`, the social-icon sprite.

[`src/layout.astro`](../src/layout.astro) links the SVG, a root-level 32×32
`favicon.ico` fallback, and a 180×180 `apple-touch-icon.png`. Following the
[Evil Martians favicon guide](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs),
there is no manifest or Android app-icon set: this site is not a PWA.

When changing the SVG, regenerate the raster assets: render at 32×32 and export
a 32-bit ICO; for Apple, render at 140×140, center on a 180×180 primary-surface
canvas (20px padding), and export an opaque PNG. Check legibility at 16×16 and
32×32, plus the touch icon. The outlined glyph needs no font request; its font
license lives in `src/fonts/Rajdhani-OFL.txt`.

## Keyboard focus

`--outline` and `--outline-offset` in [`src/styles.css`](../src/styles.css)
define one site-wide focus appearance. `.link` and `.prose a` share a nested
`&:focus-visible` rule alongside their shared link treatment. `.card`,
scrollable `.prose pre` code blocks, the article `.brand`, and the Socials
component's anchors each apply both variables in their own focus rule. There is
no global focus override. Preserve each consumer's native semantics and keyboard
reachability; new interactive patterns must opt in explicitly. The global reset
suppresses native mobile tap highlighting with `-webkit-tap-highlight-color`;
keyboard outlines and intentional hover/focus feedback remain enabled.

## Dimensions and typography

Typography has two layers, both defined in
[`src/styles.css`](../src/styles.css): family primitives (`--font-heading`,
`--font-body`, `--font-code`) and semantic roles. Each role exposes `-font`,
`-size`, `-weight`, `-leading`, and `-tracking`. Only families are aliased; the
other values are declared directly on each role. Keep these values central,
without page-local typography overrides or a second numeric scale. Shared text
classes consume the roles and add color, wrapping, transformation, and
decoration. Page-local classes retain layout, focus treatments, view
transitions, and behavior. Heading classes and native headings within `.prose`
use balanced wrapping; prose and descriptions use pretty wrapping. Spacing and
radius values stay local except within the shared prose recipe.

| Class / selector           | Token role       | Treatment and current use                                     |
| -------------------------- | ---------------- | ------------------------------------------------------------- |
| `.display-lg`              | `--heading-xl-*` | Accent, balanced, glow; homepage hero                         |
| `.display-sm`              | `--heading-md-*` | Accent, balanced; article brand                               |
| `.heading-lg`              | `--heading-lg-*` | Primary, balanced; article title                              |
| `.heading-md`, `.prose h2` | `--heading-md-*` | Primary, balanced; card titles and prose sections             |
| `.heading-sm`, `.prose h3` | `--heading-sm-*` | Primary, balanced; prose subsections                          |
| `.label`                   | `--label-*`      | Secondary, balanced; homepage section labels                  |
| `.metadata`                | `--metadata-*`   | Muted, lowercase; dates, roles, periods                       |
| `.link`                    | `--metadata-*`   | Inherited color, lowercase, accent on hover; RSS              |
| `body`, `.text-body`       | `--body-*`       | Body default; secondary, pretty descriptions via `.text-body` |
| `.prose`                   | `--prose-*`      | Secondary, pretty; article paragraphs, lists, quotes          |
| `.prose code`              | `--code-*`       | Inline and fenced code                                        |

Typography targets classes or native elements within `.prose`, with `body` as
the global base exception. Prose headings other than `h2` use the small heading
recipe. Visual class names do not dictate HTML heading levels.

All heading sizes and prose size are fluid; other roles are fixed or relative.
Heading size roles are visual, not HTML heading levels: semantic level follows
page structure. The home hero uses accent; other heading colors stay contextual.
Metadata is lowercase and uses consistent tracking across pages. Prose uses
secondary text; blockquotes use muted text with an accent border and no
background. Strong text retains its emphasis weight and primary color; italics
remain native emphasis. Code has an explicit normal weight and prose-compatible
leading; CSS-wide `inherit` is not stored in root custom properties, where it
would inherit the custom property itself rather than the consuming font
property. Syntax highlighting remains responsible for code-token colors.

### Shared prose recipe

Apply `.prose` to a content wrapper; native Markdown descendants need no
classes. Its `h2` and `h3` share declaration blocks with `.heading-md` and
`.heading-sm`; prose rules add their existing section margins. Paragraphs,
lists, and list items retain their spacing; blockquotes retain their border and
padding. Strong and emphasis preserve their semantics, code keeps inline/fenced
treatments, rules use the accent border, and images remain responsive.

`.link` and `.prose a` share inherited color, underline, URL wrapping,
transition timing, accent on hover, and reduced-motion handling. Their underline
offset transitions from 6px to 8px on hover. Only `.link` applies metadata font
tokens and lowercase; prose links inherit their surrounding typography and
casing. Native keyboard focus remains visible. No Markdown class injection or
article-only stylesheet is needed.

## Real composition examples

### Linked card (shared recipe)

```html
<article>
  <a href="/building-design-tokens-app/" class="card">
    <svg class="card-border" aria-hidden="true">
      <rect width="100%" height="100%" pathLength="100"></rect>
    </svg>
    <time class="metadata" datetime="2025-01-01">January 1, 2025</time>
    <h3 class="heading-md">Building a design-token app</h3>
    <p class="text-body">A short summary.</p>
  </a>
</article>
```

Example date/copy above are illustrative, not content to publish. All card
styles live in `src/styles.css`, loaded by the shared Layout; no page-local
stylesheet, script, or component is required. Reuse this native markup for a
full-card navigation link. Metadata and description are optional; choose heading
levels for the surrounding document structure and reuse existing text classes.
Never nest another link, button, or form control inside the card link.

- `.card` owns its internal grid, padding, full-height fill, decorative texture,
  hover/focus sequence and visible focus outline.
- `.card-border` is an `aria-hidden` SVG containing the shown rect. It owns the
  border geometry, glow, and drawing transition; retain its percentage
  dimensions and normalized path length.
- Descriptions use `.text-body` directly; no card-specific text class is needed.
- Parent grids, section spacing, optional border mirroring, and article-specific
  view-transition names stay local to the consuming page. The homepage keeps its
  current desktop mirroring and removes it at the existing narrow breakpoint.
- Reduced-motion handling and the static full-border fallback travel with the
  shared recipe. All content, navigation, and border drawing work without JS.

The SVG rect uses size-container units and `tan(atan2(a, b))` ratios to preserve
fixed-length tips and the perimeter-draw transition without newer typed CSS
division. Numeric `@property` registrations resolve both dash lengths and the
offset before passing them to SVG: Firefox does not accept `calc()` in those SVG
dash values. Browsers without the required CSS math/container support show a
static full border. The SVG has no stretched viewBox, so stroke and tip lengths
stay undistorted. The `--card-border-*` properties are recipe internals, not a
new global token scale. Preserve the shared palette.

### Article, footer and socials

```astro
---
import Layout from "../layout.astro";
import Footer from "../footer.astro";
---

<Layout mode="article" title="An article — TrySound">
  <main>
    <h1 class="heading-lg">An article</h1>
    <div class="prose">
      <p>Page content stays semantic.</p>
    </div>
  </main>
  <Footer />
</Layout>
```

Use `Socials` directly when composing a different footer. Keep link accessible
names and the nav's natural document order; do not use icon shape alone as a
name. Import it from `../socials.astro` in that alternative composition. Wrap
rendered Markdown in `.prose` to receive the shared content recipe. The article
template uses this same global class.

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
  changing layout. Review affected pages.
- Language is English (`lang="en"`). Logical properties are preferred for new
  layout rules, but RTL/vertical writing are **not claimed supported**; do not
  rename every existing physical property as an unrelated cleanup.
- Links must remain reachable in document order with visible keyboard focus.
  Card outlines supplement hover effects. Never disable outlines without an
  equally visible, tested replacement. Use anchors for navigation/mail and
  native buttons for actions that change application state.
- Home glitch: automatic, 14s cycle; article brand: hover, 600ms; socials:
  hover. The three local configurations intentionally differ. Each checks
  reduced motion on load; reload after changing the preference. CSS transitions
  and their delays opt in with nested `prefers-reduced-motion: no-preference`
  rules beside their owning selectors. Cross-document view-transition navigation
  is enabled only in a separate `no-preference` media rule; reduced motion gets
  immediate state changes and normal navigation, without a global override list.
- Glitch effects are decorative and may not change accessible names. Content and
  links work without JavaScript; home border geometry and hover/focus drawing
  use CSS/SVG, with a static full-border fallback.
- There are no print-specific styles: no palette remap, hidden footer/socials,
  appended URLs, or print layout overrides. Browser print settings control
  output; an optimized paper/PDF presentation is not part of the current
  contract.

## Change policy

Run the commands and manual review checklist in [README.md](../README.md). Use
real pattern contracts, native semantics and approved text/surface pairs. Fix
guide ambiguity when a composition is unclear; do not add a separate metadata
service or MCP layer for this local site.
