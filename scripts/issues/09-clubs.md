## Assigned to: Group 9

## Pages to redesign
All files under `pages/clubs/`:

- [ ] `IEEE.tsx`
- [ ] `CSI.tsx`
- [ ] `IETE.tsx`
- [ ] `ISHRAE.tsx`
- [ ] `VMEA.tsx`
- [ ] `IGBC.tsx`
- [ ] `IIC.tsx`

## What needs to be done
Club pages should communicate the purpose, activities, and achievements of each professional body chapter at VCET.
Each page should have a consistent structure:
- About the national body and the VCET chapter
- Office bearers and faculty coordinator
- Past events and achievements
- How to join

## Content rules (non-negotiable)
- Office bearer names, roles, and faculty coordinator names must match: https://vcet.edu.in
- Do not use national chapter information (from ieee.org etc.) as VCET-specific content. Keep content specific to the VCET chapter only.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-clubs-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-clubs-pages
git push origin feature/redesign-clubs-pages
# open PR into develop — never into main
```
