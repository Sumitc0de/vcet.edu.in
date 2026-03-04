## Assigned to: Group 7

## Pages to redesign
All files under `pages/facilities/`:

- [ ] `CentralComputing.tsx`
- [ ] `Library.tsx`
- [ ] `CounselingCell.tsx`
- [ ] `LadiesCommonRoom.tsx`
- [ ] `SportsGymkhana.tsx`
- [ ] `HealthFacilities.tsx`
- [ ] `DifferentlyAbled.tsx`

## What needs to be done
Facilities pages should give prospective students and parents a clear picture of campus infrastructure.
Use image-driven layouts where applicable.
The library page should highlight book count, digital resources, and seating capacity prominently.

## Content rules (non-negotiable)
- All facility details — equipment lists, capacity numbers, timings — must match: https://vcet.edu.in
- Do not use placeholder or stock images. Use only images from `public/Images/`.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-facilities-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-facilities-pages
git push origin feature/redesign-facilities-pages
# open PR into develop — never into main
```
