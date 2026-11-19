# Working on trysound.io

Read [README.md](README.md) and [docs/design-system.md](docs/design-system.md)
before changing UI. The existing site is the source of truth; this repository is
not a generic component library.

## Find and reuse

- Shell, document metadata and typed modes: `src/layout.astro`.
- Semantic palette, metadata, shared backlink and print remap: `src/styles.css`.
- Font: `src/fonts.css`; prose/entry styles are scoped to their page templates.
- Shared footer/social content: `src/footer.astro`, `src/socials.astro`.
- Content contract: `src/content.config.ts`; pages: `src/pages/`.

## Rules

- Reuse real source contracts and native HTML. Do not invent components, props,
  color values or a new design system. Link for navigation; no nested controls
  in a full-card link. Match heading levels to structure.
- Use the guide's approved semantic text/surface pairs. Preserve visible
  keyboard focus, reduced-motion behavior, responsive containment and print
  remapping.
- Keep one-off layout local. Extract only when another real use makes sharing
  simpler; no new package, MCP service or unused controls.
- Update source-linked guidance when a contract changes. Do not maintain a
  second token-value list in docs. Remove unused classes when replacing styles.

## Validate and report

Run `pnpm format:check`, `pnpm check`, then `pnpm build:static`. Review UI
changes in a browser at narrow and desktop widths, including keyboard focus,
reduced motion and print. See README for the manual review checklist.

Report exactly which checks ran, any remaining failures and the human review
boundary. Compilation checks are not a browser or screen-reader audit or
maintainer approval. Never publish articles, change hosting or deploy without an
explicit request.
