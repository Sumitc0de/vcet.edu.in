## Assigned to: (open)

## Purpose
Wire the `services/` + `hooks/` data layer into all dynamic components and pages so the website reads live content from the Laravel REST API instead of static placeholder data.

## Components / pages to integrate

- [ ] `components/Hero.tsx` — replace static slides with `useHeroSlides()`
- [ ] `components/TopBanner.tsx` — replace static ticker items with `useNewsTicker()`
- [ ] `components/Achievements.tsx` — replace static cards with `useAchievements()`
- [ ] `components/Testimonials.tsx` — replace static data with `useTestimonials()`
- [ ] `components/Gallery.tsx` — replace static images with `useGallery()`
- [ ] `components/Placements.tsx` — replace static records with `usePlacements()`
- [ ] `components/Recruiters.tsx` — replace static logos with `usePlacementPartners()`
- [ ] Notices page — fetch from `useNotices()`
- [ ] Events page — fetch from `useEvents()`
- [ ] Admissions / contact form — submit via `useEnquiryForm()`

## What needs to be done
For each component above:
1. Import the relevant hook (e.g. `import { useHeroSlides } from '../hooks/useHeroSlides'`).
2. Call the hook at the top of the component to get `{ data, loading, error }`.
3. Render a loading skeleton while `loading === true`.
4. Render an error message or fallback when `error` is set.
5. Replace static data with the live `data` array.

For data that is **shared across multiple components on the same page** (hero slides, news ticker, achievements, placement partners), read from `SiteDataContext` (via `useSiteData()`) instead of calling the hook independently — this avoids redundant network requests.

## Content rules (non-negotiable)
- Do not alter any UI, layout, or styling — this issue is purely about wiring data.
- Do not remove fallback / placeholder content without first verifying the API is returning data.
- All field names must match the Laravel response shapes documented in [API Reference](../wiki/API-Reference.md).

## Technical rules
- Do **not** duplicate fetch logic — use the existing `useFetch.ts` as the base.
- Do **not** add `/api` to `VITE_API_URL` in `.env.local` — each service file adds the prefix internally.
- Do not modify any files outside `components/`, `pages/`, `hooks/`, `services/`, `context/`.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Reference files
| File | Purpose |
|------|---------|
| `services/api.ts` | Base fetch client |
| `hooks/useFetch.ts` | Generic loading / error hook |
| `context/SiteDataContext.tsx` | Shared preloaded data |
| `wiki/API-Endpoint-Map.md` | Full endpoint ↔ component ↔ hook map |
| `wiki/API-Reference.md` | Request / response shapes |

## Branch
`feat/dynamic-data`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feat/dynamic-data
# integrate each hook into its component, commit after each component
npx tsc --noEmit
git push origin feat/dynamic-data
# open PR into develop — never into main
```
