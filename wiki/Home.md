# VCET Website — Project Wiki

Welcome to the developer wiki for the **VCET (Vidyavardhini's College of Engineering and Technology)** website redevelopment project.

This is the official source of truth for all development standards, architecture decisions, and contribution guidelines.

---

## What is this project?

A full ground-up redevelopment of the official college website at [vcet.edu.in](https://vcet.edu.in).

The old website remains the **single source of truth for all content** — names, numbers, dates, faculty details, department information. You may redesign layouts and improve UX freely, but all factual data must match the old website exactly.

---

## Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | React 19, TypeScript, Vite 6         |
| Styling    | Tailwind CSS                         |
| Routing    | React Router v7                      |
| Animation  | Framer Motion                        |
| Backend    | Laravel 12, PHP 8.5 (REST JSON API)  |
| Auth       | Laravel Sanctum (Bearer tokens)      |
| Database   | SQLite (dev) / MySQL (production)    |
| Hosting    | Bluehost (frontend) + API server     |

---

## Wiki Pages

| Page | Description |
|------|-------------|
| [Developer Setup](Developer-Setup) | Local environment setup from scratch |
| [Project Architecture](Project-Architecture) | Frontend + backend + data layers |
| [Site Map](Site-Map) | All 81 pages, routes, files, and statuses |
| [Component Guide](Component-Guide) | All reusable components with props and usage |
| [Design System](Design-System) | Colors, typography, spacing, animations |
| [API Reference](API-Reference) | Full API contract (auth + all 38 endpoints) |
| [API Endpoint Map](API-Endpoint-Map) | Endpoint ↔ component ↔ admin route quick-reference |
| [Database Schema](Database-Schema) | Tables, columns, relationships |
| [Deployment Guide](Deployment-Guide) | How to deploy to Bluehost |
| [Git & Contributing](Git-and-Contributing) | Branching, commits, PR checklist |
| [Issue Groups & Tracker](Issue-Groups-and-Tracker) | 14 issue groups, assignments, status |
| [Content Rules](Content-Rules) | What you can and cannot change |
| [Admin Panel Guide](Admin-Panel-Guide) | How to use the CMS at /admin/ |
| [Image & Asset Guidelines](Image-and-Asset-Guidelines) | File naming, sizes, folder structure |

---

## Quick Links

- **Repo:** [CyberCodezilla/vcet.edu.in](https://github.com/CyberCodezilla/vcet.edu.in)
- **Old Website (content reference):** https://vcet.edu.in
- **Local dev:** `http://localhost:5173`
- **Admin panel:** `/admin/` (after deployment)

---

## Team

| Role | Responsibility |
|------|---------------|
| Lead | Architecture, reviews, merges |
| Frontend Contributors | Page redesigns per assigned issue group |
| Backend | PHP API + Admin panel |

---

> **Rule #1:** Never commit credentials (`VITE_API_URL` secrets must never appear in committed files).
> **Rule #2:** All content must match [vcet.edu.in](https://vcet.edu.in).
> **Rule #3:** One branch per issue. No direct commits to `main`.
