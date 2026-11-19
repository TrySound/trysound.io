# trysound.io

A small Astro content site. The shipping pages are the design reference—not a
separate component package or design-tool library.

- [Design vocabulary, patterns and examples](docs/design-system.md)
- [Agent entry point](AGENTS.md)

## Develop and validate

Use Node **22.23.4 or a compatible Node 22 version** and **pnpm 10.20.0** (see
`package.json` and the lockfile).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Before review:

```sh
pnpm format:check
pnpm check
pnpm build:static
```

| Command                 | What it does / side effects                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`              | Starts the development server; drafts appear in the homepage listing.                                                                           |
| `pnpm check`            | Runs Astro/TypeScript diagnostics; can update generated `.astro/` files.                                                                        |
| `pnpm build:static`     | Recreates `dist/`, without Sequoia injection or publication.                                                                                    |
| `pnpm build`            | Builds `dist/`, then runs `sequoia inject` to add publication metadata. This is not `sequoia publish`.                                          |
| `pnpm preview`          | Serves the current `dist/`; does not rebuild it.                                                                                                |
| `pnpm publish-articles` | Runs `sequoia publish`: authenticated, external publication; may update `.sequoia-state.json`. Run only intentionally with maintainer approval. |
| `pnpm format:check`     | Checks formatting of source and guides.                                                                                                         |

Run validation locally before committing. There is no checked-in CI workflow or
automated browser test suite.

## Review UI changes

Compilation checks do not prove appearance or accessibility. Before shipping:

- Review home and article pages at 320px and desktop widths.
- Tab and Shift+Tab through each page. Confirm focus stays visible; activate an
  article, RSS and social link.
- With VoiceOver or NVDA, verify titles, heading order, landmarks, link names
  and article image alternatives.
- Enable reduced motion before loading each page. Glitch initialization reads
  the preference on load; reload after changing the OS preference.
- If reviewing print output, note that there are no print-specific styles:
  palette, footer/social visibility, and URL presentation are not remapped.
- Check enlarged text and browser zoom/reflow. Recheck text contrast when
  changing palette roles or foreground/surface combinations.

## Make changes

Change the canonical source listed in the design guide. Keep one-off layout and
geometry local; share a recipe only when a second real use makes maintenance
simpler. Update the guide when a contract changes and remove unused
markup/classes when replacing styling.

Run the validation commands and review the UI before committing. Git history is
the change log; no separate package release process is needed. Record concrete
reuse friction in a PR or issue rather than building abstractions speculatively.

The live site is hosted on Netlify. Hosting dashboard settings are not stored in
this checkout; confirm the intended build command and output directory there.
The full build command is `pnpm build`, and Astro outputs to `dist/`. Deploy
through the existing hosting configuration, then verify `/`, an article and
`/rss.xml`. Article publication to the AT Protocol is a separate, explicit
action.
