# @initbase/react-datetime-picker

## Commands (run from root)

| Command | What it does |
|---|---|---|
| `npm run typecheck` | tsc --noEmit for all 3 workspaces |
| `npm run build` | tsup CJS+ESM+dts + copies CSS to dist |
| `npm run dev:demo` | vite dev server for demo app |
| `npm run dev:docs` | docusaurus start |
| `npm run publish:ui` | publishes packages/ui to npm |
| `npm run deploy:build` | builds UI + docs + demo, copies demo into docs build for deployment |

Order: `typecheck` before `build`.

## Architecture

- Monorepo with npm workspaces. Workspaces: `packages/*`, `apps/*`.
- **`packages/ui/`** is the published package `@initbase/react-datetime-picker`. Entrypoint: `src/index.tsx`.
- **`apps/demo/`** — Vite + React dev app for manual testing. Uses the local package.
- **`apps/docs/`** — Docusaurus site with MDX docs. Also uses the local package.

## Package quirks

- **CSS must be imported separately**: `import '@initbase/react-datetime-picker/datetime-picker.css'`. The `.css` file is copied into `dist/` manually (`cp` in build script), NOT bundled by tsup.
- **Zero dependencies** — all date logic uses plain `Date` + `Intl.DateTimeFormat`. No dayjs/date-fns.
- Peer deps: `react >= 18`, `react-dom >= 18`.
- tsup builds CJS + ESM + `.d.ts` + sourcemaps. Config is CLI flags in `build` script (no `tsup.config.ts`).
- The `exports` field in `package.json` has **two entry points**: `"."` (components) and `"./datetime-picker.css"` (styles).
- `"types"` must come **first** in the exports conditions array to avoid tsup warning.

## Source layout (`packages/ui/src/components/datetime/`)

```
types.ts          — DateValue, DateRangeValue, PopoverPosition, prop interfaces
utils.ts          — pure date helpers (no external deps)
hooks.ts          — useControlled, useClickOutside, useMediaQuery
Calendar.tsx      — month grid, day cells, range highlighting, prev/next nav
TimeColumn.tsx    — scrollable column for hours/minutes/seconds
Popover.tsx       — absolutely positioned container, useLayoutEffect for flexible flip
InputTrigger.tsx  — read-only trigger button + CalendarIcon (also RangeInputTrigger)
IconButton.tsx    — chevron arrow buttons
DatePicker.tsx    — single date
TimePicker.tsx    — single time (step, 12h/24h, seconds)
DateTimePicker.tsx — date + time
DateRangePicker.tsx — two-click range, pendingStart state
TimeRangePicker.tsx — two time column panels side by side
DateTimeRangePicker.tsx — calendar + time panels
datetime-picker.css — all default styling via --rdp-* custom properties
```

## Styling conventions

- All classes prefixed `rdp-` (BEM-like).
- Theming via CSS custom properties on `.rdp-wrapper` (`--rdp-primary`, `--rdp-border-radius`, etc.).
- Popover has NO min-width — it sizes to content naturally.
- Position classes: `.rdp-popover--bottom`, `--top`, `--left`, `--right`.
- `.rdp-wrapper` is `display: inline-block` — it shrinks to content width. Users can override.

## Key patterns

- Controlled/uncontrolled via `useControlled` hook (similar to `<input>` pattern).
- Every picker destructures `position` and passes it to `<Popover>`.
- `position="flexible"` (default) flips to top when bottom overflows viewport.
- Range pickers use `pendingStart` state for two-click selection.
- `RangeInputTrigger` extends `InputTrigger` with two `flex:1` inputs and a separator.
