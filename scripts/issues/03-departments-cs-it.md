## Assigned to: Group 3

## Pages to redesign
Subset of `pages/departments/` — CS and IT branches:

- [ ] `DeptComputerEngg.tsx` — Computer Engineering
- [ ] `DeptCSDS.tsx` — Computer Science (Data Science)
- [ ] `DeptIT.tsx` — Information Technology
- [ ] `DeptAIDS.tsx` — Artificial Intelligence and Data Science

## What needs to be done
Department pages are the identity of each branch. Redesign them with clearly structured sections:
- Department overview and vision/mission
- Programs offered (UG/PG)
- Faculty listing
- Labs and infrastructure
- Achievements and publications highlights
- Events and activities

## Content rules (non-negotiable)
- Faculty names, qualifications, and designations must exactly match: https://vcet.edu.in
- Do not add or remove faculty members based on assumption.
- Program intake numbers must match official DTE/AICTE approved figures.

## Shared template note
All department pages use `components/DepartmentPage.tsx`.
If changes to that template are needed, open a separate issue so all department groups can coordinate before touching it.

## Technical rules
- Do not modify `DeptMech.tsx`, `DeptENTC.tsx`, `DeptCivil.tsx`, or `DeptFE.tsx` — those belong to Group 4.
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-departments-cs-it`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-departments-cs-it
git push origin feature/redesign-departments-cs-it
# open PR into develop — never into main
```
