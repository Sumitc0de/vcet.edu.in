## Assigned to: Group 11

## Pages to redesign
All files under `pages/naac/`:

- [ ] `NAACScore.tsx`
- [ ] `SSS.tsx`
- [ ] `SSSReport.tsx`
- [ ] `SSRCycle1.tsx`
- [ ] `SSRCycle2.tsx`
- [ ] `BestPractices.tsx`

## What needs to be done
NAAC pages are assessed directly during accreditation visits. They must be professionally presented and data-accurate.
The NAACScore page should highlight the B++ grade, CGPA, and cycle information prominently.
SSR pages should present document downloads cleanly with clear cycle identification.
BestPractices should follow the prescribed NAAC format: title, objectives, and outcomes.

## Content rules (non-negotiable)
- NAAC grade, CGPA, cycle dates, and all SSR content must exactly match: https://vcet.edu.in
- SSR documents must link to the same PDFs currently hosted.
- Do not alter any NAAC policy or evaluation data.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-naac-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-naac-pages
git push origin feature/redesign-naac-pages
# open PR into develop — never into main
```
