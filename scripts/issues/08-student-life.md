## Assigned to: Group 8

## Pages to redesign
All files under `pages/student-life/`:

- [ ] `CareerAtVCET.tsx`
- [ ] `StudentsCouncil.tsx`
- [ ] `CulturalCommittee.tsx`
- [ ] `SportsCommittee.tsx`
- [ ] `Literati.tsx`
- [ ] `NSS.tsx`
- [ ] `EBSB.tsx`
- [ ] `StudentsClub.tsx`
- [ ] `Hackathon.tsx`
- [ ] `NSDC.tsx`
- [ ] `Training.tsx`
- [ ] `ECell.tsx`
- [ ] `IIIC.tsx`
- [ ] `Parents.tsx`

## What needs to be done
Student life pages represent the energy and culture of VCET.
These pages should feel dynamic and engaging.
Committee and council pages should list office bearers clearly.
Event-based pages (Hackathon, Literati) should highlight past editions with photos and stats.

## Content rules (non-negotiable)
- Student council member names and committee office bearers must match: https://vcet.edu.in
- Event details (dates, winners, statistics) must match the reference site.
- Do not feature individual students without confirmation that their information is already public on the official site.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-student-life-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-student-life-pages
git push origin feature/redesign-student-life-pages
# open PR into develop — never into main
```
