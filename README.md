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

Run validation locally before committing. `.github/workflows/deploy.yml` runs
these checks and injects Sequoia metadata on pull requests and pushes to `main`.
Only pushes to `main` and manual runs deploy to GitHub Pages. There is no
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

## Hosting: GitHub Pages

The repository is configured to deploy `dist/` to GitHub Pages using
`.github/workflows/deploy.yml`. The workflow runs the static build, then
`sequoia inject` (together equivalent to `pnpm build`). It uses the checked-in
Sequoia state; no AT Protocol login or publication is part of deployment.
`public/CNAME` records the intended custom domain, `trysound.io`; Astro's `site`
URL stays unchanged. No repository-path `base` is needed with this custom
domain.

### One-time migration from Netlify

1. Before cutting over, check the Netlify dashboard for redirects, custom
   headers, domain aliases and other settings not stored in this checkout.
   Reproduce any required behavior before switching; Pages does not support
   arbitrary server redirects or response headers.
2. In GitHub repository **Settings → Pages**, select **GitHub Actions** as the
   build source. Configure `trysound.io` as the custom domain before switching
   DNS; a `CNAME` file alone does not configure an Actions-based Pages site.
   Prefer verifying domain ownership in your GitHub account's Pages settings.
3. Push the workflow to `main` and confirm its build and deployment succeed. The
   `github-pages` environment must allow deployment from `main`.
4. At your DNS provider, replace Netlify's apex A records with GitHub Pages'
   [documented apex records](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
   Remove or replace any old Netlify AAAA records too. Preserve unrelated
   records such as mail and AT Protocol verification. If `www` is used, point
   its CNAME to `trysound.github.io`, not the repository URL, and check its
   redirect.
5. Once GitHub provisions the certificate, enable **Enforce HTTPS**. Verify `/`,
   an article, `/rss.xml`, `/.well-known/site.standard.publication`, assets and
   any domain aliases on the live site. Keep Netlify available until verified;
   restoring the previous DNS records provides a rollback path.
6. After successful cutover, disable Netlify auto-deploys and retire its site
   when no longer needed. Do not remove unrelated DNS records or services.

Later pushes to `main` deploy automatically; pull requests only validate.
Article publication to the AT Protocol remains a separate, explicit action.
Compilation and CI checks are not a browser or screen-reader audit or maintainer
approval.
