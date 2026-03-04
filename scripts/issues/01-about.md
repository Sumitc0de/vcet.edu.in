## Assigned to: Group 1

## Pages to redesign
All files under `pages/about/`:

- [ ] `AboutVCET.tsx`
- [ ] `PresidentsDesk.tsx`
- [ ] `PrincipalsDesk.tsx`
- [ ] `GoverningCouncil.tsx`
- [ ] `OrganizationalStructure.tsx`
- [ ] `Administration.tsx`
- [ ] `StrategicPlan.tsx`
- [ ] `CodeOfConduct.tsx`

## What needs to be done
Redesign the layout, typography, component structure, and visual hierarchy of every page listed above.
You have full creative freedom on how these pages look and are laid out.

## Content rules (non-negotiable)
- All factual content — names, designations, text, images — must match the live reference site: https://vcet.edu.in
- Do not alter, remove, or fabricate any institutional information.
- If a piece of content is missing or outdated, flag it in this issue as a comment before making assumptions.

## Technical rules
- Do not modify any file outside `pages/about/`.
- Do not touch `api/` under any circumstances.
- The shared components `PageLayout.tsx` and `PageBanner.tsx` may be modified only if the change benefits all pages. Raise it as a separate PR.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-about-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-about-pages
# make changes, commit often with clear messages
git push origin feature/redesign-about-pages
# open PR into develop — never into main
```
