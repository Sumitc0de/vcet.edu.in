## Assigned to: Group 2

## Pages to redesign
All files under `pages/admissions/`:

- [ ] `CoursesIntake.tsx`
- [ ] `FeesStructure.tsx`
- [ ] `Scholarships.tsx`
- [ ] `Brochure.tsx`
- [ ] `DocumentsRequired.tsx`
- [ ] `CutOff.tsx`

## What needs to be done
These pages are seen by prospective students and parents and are among the most visited sections of the site.
Redesign them to be clear, visually appealing, and easy to navigate on both desktop and mobile.

## Content rules (non-negotiable)
- All data — intake numbers, fees, scholarship details, cutoff ranks, document checklists — must match: https://vcet.edu.in
- Fees and intake numbers change each academic year. Do not guess or fill in placeholder values.
- If data is unavailable, leave the existing value and add a `// TODO: update for AY 2025-26` comment.

## Technical rules
- Do not modify any file outside `pages/admissions/`.
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-admissions-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-admissions-pages
git push origin feature/redesign-admissions-pages
# open PR into develop — never into main
```
