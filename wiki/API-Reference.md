# API Reference

> **The REST API lives in the separate backend repository: [ivory-26/vcet](https://github.com/ivory-26/vcet)**  
> Framework: Laravel 12, PHP 8.5, Sanctum Bearer token auth  
> This document describes the full API contract consumed by this frontend.

**Base URL:** `VITE_API_URL` environment variable — set to `http://localhost:8000` in dev, production TBD  
All routes are prefixed `/api/` — e.g. `http://localhost:8000/api/notices`

---

## Standard Response Shapes

### List
```json
{
  "success": true,
  "data": [ { "id": 1, "title": "..." } ]
}
```

> Paginated list responses **may** include a `meta` key when the backend paginates:
```json
{
  "success": true,
  "data": [ ... ],
  "meta": { "current_page": 1, "last_page": 3, "total": 50, "per_page": 15 }
}
```

### Single item / create / update
```json
{ "success": true, "data": { "id": 1, "title": "..." }, "message": "Created successfully." }
```

### Delete / action
```json
{ "success": true, "message": "Deleted successfully." }
```

### Validation error (422)
```json
{ "success": false, "message": "The title field is required.", "errors": { "title": ["The title field is required."] } }
```

### Unauthenticated (401)
```json
{ "success": false, "message": "Unauthenticated." }
```

---

## Authentication

### `POST /api/auth/login`

Admin login. **No auth required.**

**Request:**
```json
{ "username": "admin", "password": "Admin@vcet2025" }
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "1|abc123...",
  "user": { "id": 1, "username": "admin", "full_name": "Administrator", "role": "super" }
}
```

Store the token in `localStorage` as `admin_token`. Store the user object as `admin_user`.  
Send on every subsequent admin request: `Authorization: Bearer 1|abc123...`

> ⚠️ There is no `/api/me` endpoint. The user object is stored at login and restored from `localStorage` on page refresh.

---

### `POST /api/auth/logout`

**Requires:** `Authorization: Bearer <token>`

Invalidates the token. No request body.

**Response (200):**
```json
{ "success": true, "message": "Logged out" }
```

---

## Public Endpoints (No Auth — Main Website)

### `GET /api/hero-slides`

Active slides ordered by `sort_order`.  
**Used by:** `hooks/useHeroSlides.ts` → `components/Hero.tsx`

Fields: `id`, `title`, `subtitle`, `button_text`, `button_link`, `image`, `sort_order`, `is_active`, `created_at`

---

### `GET /api/news-ticker`

Active ticker items ordered by `sort_order`.  
**Used by:** `hooks/useNewsTicker.ts` → `components/TopBanner.tsx`

Fields: `id`, `text`, `link`, `sort_order`, `is_active`

---

### `GET /api/notices`

Paginated. Accepts `?page=N`.  
**Used by:** `hooks/useNotices.ts` → Notices page

Fields: `id`, `title`, `description`, `attachment`, `link_url`, `is_new`, `sort_order`, `is_active`, `created_at`

---

### `GET /api/events`

Paginated. Accepts `?page=N`.  
**Used by:** `hooks/useEvents.ts` → Events page

Fields: `id`, `title`, `description`, `event_date`, `event_time`, `venue`, `image`, `category`, `sort_order`, `is_active`, `created_at`

---

### `GET /api/achievements`

All active achievements ordered by `sort_order`.  
**Used by:** `hooks/useAchievements.ts` → `components/Achievements.tsx`

Fields: `id`, `title`, `value`, `description`, `icon`, `sort_order`, `is_active`

---

### `GET /api/testimonials`

All active testimonials.  
**Used by:** `hooks/useTestimonials.ts` → `components/Testimonials.tsx`

Fields: `id`, `name`, `role`, `text`, `rating`, `photo`, `is_active`

---

### `GET /api/gallery`

All gallery images.  
**Used by:** `hooks/useGallery.ts` → `components/Gallery.tsx`

Fields: `id`, `image`, `caption`, `created_at`

---

### `GET /api/placements`

Paginated. Accepts `?page=N`.  
**Used by:** `hooks/usePlacements.ts` → `components/Placements.tsx`

Fields: `id`, `student_name`, `department`, `company_name`, `package_lpa`, `role_title`, `batch_year`, `student_photo`, `company_logo`, `is_active`, `sort_order`, `created_at`

---

### `GET /api/placement-partners`

Active recruiter logos ordered by `sort_order`.  
**Used by:** `hooks/usePlacementPartners.ts` → `components/Recruiters.tsx`

Fields: `id`, `name`, `logo`, `website`, `sort_order`, `is_active`

---

### `POST /api/enquiries`

Submit an admission enquiry form. **No auth required.**  
**Used by:** `hooks/useEnquiryForm.ts` → Admissions / contact pages

**Request (JSON):**
```json
{ "name": "Rahul Sharma", "email": "rahul@example.com", "phone": "9876543210", "course": "Computer Engineering", "message": "..." }
```

---

## Admin Endpoints (Bearer Token Required)

All admin CRUD follows the same pattern. `POST` and `PUT` use either JSON or `multipart/form-data` when the resource has file uploads.

| Resource | Create | Update | Delete | Notes |
|----------|--------|--------|--------|-------|
| Notices | `POST /api/notices` | `PUT /api/notices/{id}` | `DELETE /api/notices/{id}` | JSON |
| Events | `POST /api/events` | `PUT /api/events/{id}` | `DELETE /api/events/{id}` | JSON |
| Placements | `POST /api/placements` | `PUT /api/placements/{id}` | `DELETE /api/placements/{id}` | JSON |
| Hero Slides | `POST /api/hero-slides` | `PUT /api/hero-slides/{id}` | `DELETE /api/hero-slides/{id}` | FormData (image) |
| News Ticker | `POST /api/news-ticker` | `PUT /api/news-ticker/{id}` | `DELETE /api/news-ticker/{id}` | JSON |
| Achievements | `POST /api/achievements` | `PUT /api/achievements/{id}` | `DELETE /api/achievements/{id}` | JSON |
| Testimonials | `POST /api/testimonials` | `PUT /api/testimonials/{id}` | `DELETE /api/testimonials/{id}` | FormData (photo) |
| Gallery | `POST /api/gallery` | — | `DELETE /api/gallery/{id}` | FormData (image) — no edit |
| Placement Partners | `POST /api/placement-partners` | `PUT /api/placement-partners/{id}` | `DELETE /api/placement-partners/{id}` | FormData (logo) |
| Enquiries | — | — | — | `GET /api/enquiries` read-only |

**Total: 38 endpoints** — see [API-Endpoint-Map.md](API-Endpoint-Map) for the full quick-reference table.

---

## Authentication

### POST `/auth/login`

Authenticates an admin user and returns a Bearer token.

**Request body (JSON):**
```json
{
  "username": "admin",
  "password": "Admin@vcet2025"
}
```

**Response — success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "1|abc123xyz...",
  "user": {
    "id": 1,
    "username": "admin",
    "full_name": "Administrator",
    "role": "super"
  }
}
```

**Response — failure (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

> Note: the response is **not** wrapped in a `data` key — `token` and `user` are top-level fields.

---

### POST `/auth/logout`

Invalidates the current Bearer token.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{ "success": true, "message": "Logged out" }
```

---

## Notices

### GET `/notices`
Returns all active notices (public).

### GET `/notices/{id}`
Returns a single notice (admin, requires Bearer token).

### POST `/notices`
Create a notice (admin). Accepts `multipart/form-data` for file uploads.

| Field | Type | Required |
|-------|------|----------|
| `title` | string | ✅ |
| `description` | string | ❌ |
| `external_link` | string | ❌ |
| `attachment` | file (PDF) | ❌ |
| `is_new` | boolean | ❌ |
| `is_active` | boolean | ❌ |
| `sort_order` | integer | ❌ |

### PUT `/notices/{id}`
Update a notice (admin). Send as `multipart/form-data` with `_method=PUT` spoofing.

### DELETE `/notices/{id}`
Delete a notice (admin).

---

## Events

### GET `/events`
Returns all active events (public).

### POST `/events`
Create an event (admin). Accepts `multipart/form-data`.

| Field | Type | Required |
|-------|------|----------|
| `title` | string | ✅ |
| `date` | date (YYYY-MM-DD) | ✅ |
| `description` | string | ❌ |
| `time` | time | ❌ |
| `venue` | string | ❌ |
| `category` | string | ❌ |
| `image` | file (image) | ❌ |
| `is_featured` | boolean | ❌ |
| `is_active` | boolean | ❌ |

### PUT `/events/{id}` / DELETE `/events/{id}`
Update / delete an event (admin).

---

## Placements

### GET `/placements`
Returns all active placement records (public).

### POST `/placements`
Create a placement record (admin). Accepts `multipart/form-data`.

| Field | Type | Required |
|-------|------|----------|
| `company` | string | ✅ |
| `package_lpa` | decimal | ✅ |
| `student_count` | integer | ✅ |
| `year` | integer | ✅ |
| `logo` | file (image) | ❌ |
| `is_active` | boolean | ❌ |

### PUT `/placements/{id}` / DELETE `/placements/{id}`
Update / delete a placement record (admin).

---

## Standard Response Shape

All endpoints return a consistent JSON envelope:

```json
{
  "success": true | false,
  "data": "<resource or array>",
  "message": "Human-readable message (on create/update/delete/error)",
  "errors": { "field": ["validation error"] }
}
```

> Exception: the `/auth/login` response places `token` and `user` at the top level (not inside `data`).

---

## Error Responses

All endpoints return a consistent error shape:

```json
{
  "success": false,
  "message": "Human-readable error description"
}
```

| HTTP Status | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad request (missing/invalid params) |
| 401 | Unauthenticated |
| 403 | Forbidden (not authorized) |
| 404 | Resource not found |
| 500 | Server error |

---

## CORS

The API allows `http://localhost:3000` for local dev. The production frontend domain will be whitelisted before go-live.

---

## Calling the API from React

```tsx
const [notices, setNotices] = useState([]);

useEffect(() => {
  fetch('/api/notices/?limit=10')
    .then(res => res.json())
    .then(data => {
      if (data.success) setNotices(data.data);
    });
}, []);
```
