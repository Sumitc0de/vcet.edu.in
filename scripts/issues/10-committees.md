## Assigned to: Group 10

## Pages to redesign
All files under `pages/committees/`:

- [ ] `CollegeDevelopmentCommittee.tsx`
- [ ] `IQAC.tsx`
- [ ] `GrievanceRedressal.tsx`
- [ ] `SRGCCommittee.tsx`
- [ ] `AntiRagging.tsx`
- [ ] `SCSTCommittee.tsx`
- [ ] `InternalComplaint.tsx`
- [ ] `EqualOpportunity.tsx`
- [ ] `SEDGCell.tsx`

## What needs to be done
Statutory committee pages must be presented in a formal, trustworthy layout.
These pages are referenced by NAAC, regulatory bodies, and students seeking grievance support.
Each page should clearly list committee composition, mandate, contact details, and relevant policy documents.

## Content rules (non-negotiable)
- Committee member names, designations, and contact information must exactly match: https://vcet.edu.in
- These pages are regulatory — any inaccuracy has compliance consequences.
- Anti-ragging and ICC pages must include the prescribed statutory content per UGC/AICTE guidelines.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-committees-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-committees-pages
git push origin feature/redesign-committees-pages
# open PR into develop — never into main
```
