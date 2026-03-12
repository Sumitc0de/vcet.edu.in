# Project Architecture

---

## Overview

The project follows a **two-repo, fully-decoupled architecture**:

- **This repo (`vcet.edu.in`)** — React SPA + React Admin Panel UI, built with Vite.
- **Backend repo ([ivory-26/vcet](https://github.com/ivory-26/vcet))** — Pure Laravel REST JSON API.

Both repos are deployed independently. The frontend calls the backend API over HTTP using Bearer token authentication.

```
┌──────────────────────────────────────────────────────────────┐
│                      Browser (User / Admin)                  │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP
         ┌───────────────┴────────────────┐
         │                                │
  ┌──────▼──────────────────┐    ┌────────▼──────────────────┐
  │   Frontend Repo          │    │   Backend Repo             │
  │   github: CyberCodezilla │    │   github: ivory-26/vcet    │
  │   vcet.edu.in (Vite SPA) │    │   Laravel REST API         │
  │                          │    │   /api/*                   │
  │   ┌────────────────┐     │    │                            │
  │   │ Public Website │────────→ │   JSON responses           │
  │   └────────────────┘     │    │   Bearer token auth        │
  │   ┌────────────────┐     │    │                            │
  │   │  Admin Panel   │────────→ │   CRUD endpoints           │
  │   │  /admin/*      │     │    │   File uploads             │
  └───┴────────────────┴─────┘    └────────────┬───────────────┘
                                               │
                                       ┌───────▼───────┐
                                       │   MySQL DB    │
                                       └───────────────┘
```

---

## Frontend — React + Vite

### Entry Point
- `index.html` → loads `index.tsx` → mounts `<App />`

### Routing
- `App.tsx` is the root router using **React Router v7**
- All inner pages are **lazy-loaded** with `React.lazy()` + `<Suspense>`
- This ensures only the visited page's JavaScript is loaded — critical for performance with 81 pages

### Component Structure

```
components/          ← Reusable UI (used across multiple pages)
pages/               ← Route-level pages (one file = one URL)
ui/                  ← Low-level UI primitives (lamp, pixel-image, focus-cards)
services/            ← Raw public API fetch functions (no React state)
hooks/               ← React hooks wrapping services ({ data, loading, error })
context/             ← SiteDataContext — preloads shared data once at app mount
```

### Page Loading Flow

```
User navigates to /about-us
       ↓
React Router matches <Route path="/about-us" element={<AboutVCET />} />
       ↓
Suspense triggers PageLoader spinner
       ↓
Dynamic import: pages/about/AboutVCET.tsx chunk loads
       ↓
Page renders inside PageLayout (TopBanner + Header + content + Footer)
```

---

## Dynamic Data Layer

All dynamic content (hero slides, notices, placements, etc.) flows through a three-layer architecture:

```
Backend API  →  services/  →  hooks/  →  components/
```

### Layer 1 — `services/`

Plain TypeScript functions. No React state. Each service file maps to one API resource.

```
services/
├── api.ts                   ← Base fetch client (reads VITE_API_URL, handles errors)
├── heroSlides.ts            ← GET /api/hero-slides
├── newsTicker.ts            ← GET /api/news-ticker
├── notices.ts               ← GET /api/notices
├── events.ts                ← GET /api/events
├── achievements.ts          ← GET /api/achievements
├── testimonials.ts          ← GET /api/testimonials
├── gallery.ts               ← GET /api/gallery
├── placements.ts            ← GET /api/placements
├── placementPartners.ts     ← GET /api/placement-partners
└── enquiries.ts             ← POST /api/enquiries
```

### Layer 2 — `hooks/`

React hooks that call a service function and manage `{ data, loading, error }` state.

```
hooks/
├── useFetch.ts              ← Generic base hook (all others build on this)
├── useHeroSlides.ts         → components/Hero.tsx
├── useNewsTicker.ts         → components/TopBanner.tsx
├── useNotices.ts            → Notices page
├── useEvents.ts             → Events page
├── useAchievements.ts       → components/Achievements.tsx
├── useTestimonials.ts       → components/Testimonials.tsx
├── useGallery.ts            → components/Gallery.tsx
├── usePlacements.ts         → components/Placements.tsx
├── usePlacementPartners.ts  → components/Recruiters.tsx
└── useEnquiryForm.ts        → Admissions / contact form
```

### Layer 3 — `context/SiteDataContext.tsx`

For data used by **multiple components on every page** (hero slides, ticker, achievements, partners), `SiteDataContext` fetches it once at app mount and provides it via React context. This avoids duplicate network requests when the same data would otherwise be fetched independently by several components.

---

It is a pure Laravel 12 REST API (PHP 8.5) that exposes JSON endpoints consumed by this frontend.

### Key Endpoint Groups

| Prefix | Auth | Purpose |
|--------|------|---------|
| `POST /api/auth/login` | None | Issues a Bearer token |
| `POST /api/auth/logout` | Bearer | Invalidates the token |
| `GET /api/hero-slides` | None | Public: active banner slides |
| `GET /api/news-ticker` | None | Public: active ticker items |
| `GET /api/notices` | None | Public: paginated notices |
| `GET /api/events` | None | Public: paginated events |
| `GET /api/achievements` | None | Public: achievement cards |
| `GET /api/testimonials` | None | Public: testimonials |
| `GET /api/gallery` | None | Public: gallery images |
| `GET /api/placements` | None | Public: paginated placements |
| `GET /api/placement-partners` | None | Public: recruiter logos |
| `POST /api/enquiries` | None | Public: submit enquiry |
| `POST/PUT/DELETE /api/*` | Bearer | Admin: full CRUD on all resources |

See the full [API Reference](API-Reference) for request/response shapes.

---

## Admin Panel — React UI

The admin panel is a **React SPA** living in `admin/` inside this repo. It is served at `/admin/*` by the same Vite build.

```
admin/
├── types.ts                      ← Shared TypeScript interfaces for all 10 resources
├── api/
│   ├── client.ts                 ← Base fetch wrapper (Bearer token auth)
│   ├── auth.ts                   ← login / logout
│   ├── notices.ts                ← CRUD helpers
│   ├── events.ts                 ← CRUD helpers
│   ├── placements.ts             ← CRUD helpers
│   ├── heroSlides.ts             ← CRUD helpers (FormData)
│   ├── newsTicker.ts             ← CRUD helpers (JSON)
│   ├── achievements.ts           ← CRUD helpers (JSON)
│   ├── testimonials.ts           ← CRUD helpers (FormData)
│   ├── gallery.ts                ← Upload + delete (FormData, no edit)
│   ├── placementPartners.ts      ← CRUD helpers (FormData)
│   └── enquiries.ts              ← Read-only list
├── context/
│   └── AuthContext.tsx           ← Auth state + useAuth() hook
├── components/
│   ├── ProtectedRoute.tsx        ← Redirects to /admin/login if unauthed
│   ├── AdminLayout.tsx           ← Outlet wrapper with sidebar
│   └── Sidebar.tsx               ← Navigation sidebar (10 resource sections)
└── pages/
    ├── Login.tsx                 ← /admin/login
    ├── Dashboard.tsx             ← /admin
    ├── notices/                  ← NoticesList, NoticeForm
    ├── events/                   ← EventsList, EventForm
    ├── placements/               ← PlacementsList, PlacementForm
    ├── hero-slides/              ← HeroSlidesList, HeroSlideForm
    ├── news-ticker/              ← NewsTickerList, NewsTickerForm
    ├── achievements/             ← AchievementsList, AchievementsForm
    ├── testimonials/             ← TestimonialsList, TestimonialsForm
    ├── gallery/                  ← GalleryPage
    ├── placement-partners/       ← PlacementPartnersList, PlacementPartnersForm
    └── enquiries/                ← EnquiriesList (read-only)
```
    ├── notices/
    │   ├── NoticesList.tsx    ← /admin/notices
    │   └── NoticeForm.tsx     ← /admin/notices/new  |  /admin/notices/:id/edit
    ├── events/
    │   ├── EventsList.tsx     ← /admin/events
    │   └── EventForm.tsx      ← /admin/events/new  |  /admin/events/:id/edit
    └── placements/
        ├── PlacementsList.tsx ← /admin/placements
        └── PlacementForm.tsx  ← /admin/placements/new  |  /admin/placements/:id/edit
```

### Auth Flow

```
User visits /admin/* (not /admin/login)
       ↓
ProtectedRoute checks AuthContext
       ↓
If no token → redirect to /admin/login
       ↓
User submits credentials → POST /api/auth/login
       ↓
Laravel returns { success, message, token, user }  (token + user are top-level — not in `data`)
       ↓
Token stored in localStorage (admin_token)
User object stored in localStorage (admin_user)
       ↓
All subsequent API calls include: Authorization: Bearer <token>
On page refresh: token + user restored from localStorage (no API call needed)
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend API base URL — **no `/api` suffix** (e.g. `http://localhost:8000`) |

All service files in `services/` and `admin/api/` append `/api/` to their paths internally.

Copy `.env.example` → `.env.local` and set the value before running `npm run dev`.

---

## Build & Deploy Flow

```
Local: npm run build  →  dist/
                              ↓
Upload dist/ contents to public_html/  (via FTP or cPanel)
Set VITE_API_URL build env var to production API URL
Backend deployed separately at api.vcet.edu.in or vcet.edu.in/api
```

See the full [Deployment Guide](Deployment-Guide) for step-by-step instructions.

---

## Why This Stack?

| Decision | Reason |
|----------|--------|
| React + TypeScript | Type safety, component reuse, team scalability |
| Vite | Fastest dev server + build for React in 2025 |
| Tailwind CSS | Utility-first — consistent spacing without custom CSS sprawl |
| Framer Motion | Production-quality animations with minimal boilerplate |
| React Router lazy loading | 80+ pages — lazy loading keeps initial bundle small |
| Two-repo architecture | Clean separation of concerns; backend can be versioned independently |
| Laravel (backend) | Eloquent ORM, built-in validation, Sanctum for Bearer token auth |
