## Assigned to: Group 4

## Pages to redesign
Subset of `pages/departments/` — core engineering branches:

- [ ] `DeptMech.tsx` — Mechanical Engineering
- [ ] `DeptENTC.tsx` — Electronics and Telecommunication
- [ ] `DeptCivil.tsx` — Civil Engineering
- [ ] `DeptFE.tsx` — First Year Engineering

## What needs to be done
Redesign these pages with clearly structured sections:
- Department overview and vision/mission
- Programs offered
- Faculty listing
- Labs and infrastructure
- Achievements and highlights
- Events and activities

## Content rules (non-negotiable)
- Faculty names, qualifications, and designations must exactly match: https://vcet.edu.in
- Program intake numbers must match official DTE/AICTE approved figures.

## Shared template note
All department pages use `components/DepartmentPage.tsx`.
If you need to modify that component, coordinate with Group 3 and open a separate issue first.

## Technical rules
- Do not modify the CS/IT pages — those belong to Group 3.
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-departments-core`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-departments-core
git push origin feature/redesign-departments-core
# open PR into develop — never into main
```
