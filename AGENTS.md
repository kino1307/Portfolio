# AGENTS.md

Context for LLM sessions working on this repo.

## What this is

Personal portfolio site for Will Leece (wjleece.dev). Single-page Next.js app — no routing beyond the root, no API routes, no database. Deployed as a static export.

## Stack

- **Next.js 16 / React 19** — App Router, statically prerendered
- **Tailwind CSS v4** — utility-first, no custom theme config file; uses CSS vars via `globals.css`
- **TypeScript 6**
- **shadcn/ui** — only `Button` primitive installed (`components/ui/`)
- **lucide-react** — icons
- **react-icons** — `SiGithub` (Simple Icons), `FaLinkedin` (Font Awesome)
- No test framework. `npm run build` is the only check that matters before committing.

## File map

```
app/
  layout.tsx      — metadata, OG tags, theme-flash prevention script, Geist fonts
  page.tsx        — entire site (single file, ~315 lines)
  globals.css     — Tailwind base + CSS custom properties for light/dark tokens
  sitemap.ts      — static sitemap
  robots.ts       — robots.txt
  favicon.ico / apple-icon.png / icon.svg
components/ui/
  button.tsx      — shadcn Button (2 variants: default, ghost; 2 sizes: default, sm)
lib/utils.ts      — cn() helper (clsx + tailwind-merge)
next.config.ts    — only 301 redirects, nothing else
```

Everything visible to a visitor lives in `app/page.tsx`. If a task touches content, layout, or interactivity, that is the file.

## Architecture / constraints

- **Single page, scroll-based navigation.** Navbar smooth-scrolls to `#about`, `#experience`, `#projects`. No client-side routing.
- **Dark mode** defaults to dark, persisted in `localStorage`. Theme flash is prevented by an inline script in `layout.tsx` that runs before hydration.
- **State is minimal:** `meducateExpanded` (bool) toggles the Meducate case study inline. `darkMode` (bool) drives the theme toggle. Both are `useState` in `Home()`.
- **No separate case study pages.** The case study is an in-page expandable section on the project card, not a route.
- **Static export.** No server components with data fetching, no API routes. Keep it that way unless there is a strong reason.
- **JSON-LD** structured data (`Person` schema) is inlined in `page.tsx` via `dangerouslySetInnerHTML`.

## Projects currently shown

### Meducate API
- Live at meducateapi.com
- GitHub: github.com/kino1307/MeducateAPI
- Free tier: 1,000 req/day, no credit card — demo key at meducateapi.com/docs
- Key technical differentiator: nightly QC jobs that compare LLM-generated summaries against upstream source content and flag drift for re-processing
- Case study covers: Problem → Architecture & Tech Decisions (5 bullets) → Outcome
- Card CTA: "Try with demo key →" → meducateapi.com/docs

### Wayfarer
- Live at wayfarer.wjleece.dev, GitHub: github.com/kino1307/wayfarer
- Natural-language query → map, grounded in Wikidata (not guessed by an LLM)
- Key technical differentiator: an agent reads Wikidata's schema live and builds/tests SPARQL at query time (no fixed template library), gated by an independent verification pass before anything reaches the map
- BYOK: no server-side LLM key, users bring their own Anthropic or OpenAI key
- Case study covers: Problem → Architecture & Tech Decisions (6 bullets) → Outcome
- Card CTA: "Try it live →" → wayfarer.wjleece.dev

## Tone / content rules

- No marketing language ("powerful", "cutting-edge", "innovative")
- No padding — every sentence earns its place
- Case study structure: problem → architecture decisions → outcome
- Active status must be accurate: don't imply something is live if it isn't, and don't imply it's in development if it's shipped

## SEO

- Canonical: `https://wjleece.dev/`
- Metadata and OG tags in `layout.tsx` — update there if title/description changes
- Sitemap and robots are generated via Next.js route handlers in `app/`
- `next.config.ts` has one 301 redirect (index.html → /) — don't remove it

## Dev commands

```bash
npm run dev      # local dev server
npm run build    # production build — run this to verify before committing
npm run lint     # ESLint
```

## What not to do

- Don't add new pages/routes without a clear reason — the single-page model is intentional
- Don't add new dependencies for things a few lines of Tailwind/React can do
- Don't commit secrets, API keys, or personal info beyond what is already public (email in footer is intentional)
