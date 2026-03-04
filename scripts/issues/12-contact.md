## Assigned to: Group 12

## Pages to redesign
- [ ] `pages/contact/ContactUs.tsx`

## What needs to be done
The contact page is the entry point for admissions inquiries, general queries, and visitor navigation.
Redesign it with:
- A clean contact form (UI only — no backend wiring required unless a PHP endpoint already exists)
- Address block with map embed
- Phone numbers, email addresses, and department-specific contacts
- Office hours

## Content rules (non-negotiable)
- All contact details — phone numbers, emails, address, pin code — must match: https://vcet.edu.in
- If embedding a Google Map, use the same location as the reference site.
- Do not add contact addresses or numbers that are not on the official site.

## Technical rules
- Do not touch `api/` under any circumstances.
- Run `npx tsc --noEmit` before opening your PR. It must pass with zero errors.

## Branch
`feature/redesign-contact-page`

## Steps
```
git checkout develop && git pull origin develop
git checkout -b feature/redesign-contact-page
git push origin feature/redesign-contact-page
# open PR into develop — never into main
```
