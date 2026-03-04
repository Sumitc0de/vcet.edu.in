## Assigned to: Group 5

## Pages to redesign
All files under `pages/academics/`:

- [ ] `DeanAcademics.tsx`
- [ ] `AcademicCalendar.tsx`
- [ ] `TeachingLearning.tsx`
- [ ] `SwayamNPTEL.tsx`
- [ ] `HonoursMinor.tsx`
- [ ] `ExamCell.tsx`
- [ ] `Downloads.tsx`

## What needs to be done
Redesign these pages with a clean, information-dense layout.
The academic calendar should present dates clearly — a timeline or table format is preferred.
The downloads page should have a clean, filterable document list with file type and size indicators.

## Content rules (non-negotiable)
- Academic calendar dates, exam schedules, and NPTEL course listings must match: https://vcet.edu.in
- Do not invent or assume academic dates.
- Downloads must link to the same documents as the reference site.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-academics-pages`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-academics-pages
git push origin feature/redesign-academics-pages
# open PR into develop — never into main
```
