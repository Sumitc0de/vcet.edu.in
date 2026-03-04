## Assigned to: Group 6

## Pages to redesign
All files under `pages/research/`:

- [ ] `ResearchIntro.tsx`
- [ ] `FundedResearch.tsx`
- [ ] `Publications.tsx`
- [ ] `ConsultancyProjects.tsx`
- [ ] `ResearchFacility.tsx`
- [ ] `ResearchConventions.tsx`
- [ ] `ResearchPolicy.tsx`
- [ ] `NIRF.tsx`

## What needs to be done
Research pages carry the academic credibility of the institution.
Redesign them to be professional, structured, and easy to read.
Publications and funded research should use card or table layouts.
NIRF page must present NIRF ranking data clearly and accurately.

## Content rules (non-negotiable)
- All publication titles, author names, funded project titles, and NIRF data must match: https://vcet.edu.in
- NIRF scores and ranking data are public record — do not alter them.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-research-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-research-pages
git push origin feature/redesign-research-pages
# open PR into develop — never into main
```
