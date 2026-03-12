# Admin Panel Guide

The admin panel at `/admin/` is a React SPA that lets authorized users manage all dynamic content across 10 resource types by calling the Laravel REST API.

---

## Accessing the Admin Panel

After deployment, visit:

```
https://vcet.edu.in/admin/login
```

Enter your credentials. Credentials are managed in the backend (see [ivory-26/vcet](https://github.com/ivory-26/vcet)).

---

## Authentication

- Login calls `POST /api/auth/login` with `{ username, password }`.
- On success, a **Bearer token** is stored in `localStorage` (`admin_token`).
- The user object (`{ id, username, full_name, role }`) is stored in `localStorage` (`admin_user`).
- All subsequent API calls include `Authorization: Bearer <token>`.
- Logging out calls `POST /api/auth/logout` and clears both localStorage keys.
- On page refresh, the token and user are restored from `localStorage` — no extra API call is made.

---

## Dashboard

After logging in, the dashboard shows:

- Total count of all managed resources
- Quick-links to manage each section
- Recent items from key resources

---

## Managing Hero Slides

### Add / Edit a hero slide

| Field | Required | Notes |
|-------|----------|-------|
| Title | ✅ | Main heading displayed on banner |
| Subtitle | ❌ | Subheading beneath title |
| Button Text | ❌ | CTA button label |
| Button Link | ❌ | URL the button navigates to |
| Image | ✅ | Upload banner image (FormData) |
| Sort Order | ❌ | Lower numbers appear first (default: 0) |
| Active | ✅ | Uncheck to hide from public |

---

## Managing News Ticker

### Add / Edit a ticker item

| Field | Required | Notes |
|-------|----------|-------|
| Text | ✅ | Scrolling ticker text |
| Link | ❌ | Optional URL when the item is clicked |
| Sort Order | ❌ | Display order |
| Active | ✅ | Uncheck to hide |

---

## Managing Notices

### Add / Edit a notice

| Field | Required | Notes |
|-------|----------|-------|
| Title | ✅ | Notice heading shown publicly |
| Description | ❌ | Optional supporting text |
| Attachment (PDF) | ❌ | Upload a PDF file |
| External Link | ❌ | Alternative to a PDF attachment |
| Mark as NEW | ❌ | Shows a "NEW" badge beside the notice |
| Sort Order | ❌ | Lower numbers appear first (default: 0) |
| Active | ✅ | Uncheck to hide from public |

---

## Managing Events

### Add / Edit an event

| Field | Required | Notes |
|-------|----------|-------|
| Title | ✅ | Event name |
| Description | ❌ | Event details |
| Date | ✅ | `YYYY-MM-DD` |
| Time | ❌ | Start time |
| Venue | ❌ | Location string |
| Category | ❌ | Academic, Cultural, Sports, Technical, Workshop, Other |
| Event Image | ❌ | Upload an image |
| Featured | ❌ | Shows on homepage events section |
| Active | ✅ | Uncheck to hide |

---

## Managing Achievements

### Add / Edit an achievement card

| Field | Required | Notes |
|-------|----------|-------|
| Title | ✅ | Achievement label (e.g. "NBA Accredited") |
| Value | ✅ | Numeric or text value (e.g. "100+") |
| Description | ❌ | Supporting text |
| Icon | ❌ | Icon name or class string |
| Sort Order | ❌ | Display order |
| Active | ✅ | Uncheck to hide |

---

## Managing Testimonials

### Add / Edit a testimonial

| Field | Required | Notes |
|-------|----------|-------|
| Name | ✅ | Person's full name |
| Role | ✅ | Job title / designation |
| Text | ✅ | Testimonial body |
| Rating | ❌ | Number 1–5 |
| Photo | ❌ | Upload portrait image (FormData) |
| Active | ✅ | Uncheck to hide |

---

## Managing Gallery

Gallery items are **upload-only** — to change an image, delete the old one and upload a new one.

| Field | Required | Notes |
|-------|----------|-------|
| Image | ✅ | Upload gallery image (FormData) |
| Caption | ❌ | Alt text / caption |

> There is no edit form for gallery items. Delete and re-upload to replace an image.

---

## Managing Placements

### Add / Edit a placement record

| Field | Required | Notes |
|-------|----------|-------|
| Company Name | ✅ | Company placed at |
| Package (LPA) | ✅ | Decimal, e.g. `12.5` |
| Students Placed | ✅ | Integer count |
| Year | ✅ | e.g. `2024` |
| Company Logo | ❌ | Upload company logo image |
| Active | ✅ | Uncheck to hide |

---

## Managing Placement Partners

### Add / Edit a recruiter

| Field | Required | Notes |
|-------|----------|-------|
| Name | ✅ | Company name |
| Website | ❌ | Company URL |
| Logo | ✅ | Upload logo image (FormData) |
| Sort Order | ❌ | Display order |
| Active | ✅ | Uncheck to hide |

---

## Managing Enquiries

Enquiries are **read-only** — they are submitted by visitors from the public website form and cannot be created or edited through the admin panel.

| Field | Description |
|-------|-------------|
| Name | Visitor's name |
| Email | Contact email |
| Phone | Contact phone number |
| Course | Course of interest |
| Message | Enquiry message |
| Date | Submission timestamp |

---

## User Roles

| Role | Access |
|------|--------|
| `super` | Full access — can manage all content and users |
| `editor` | Can manage content but cannot manage admin accounts |

---

## Security Notes

- Always log out when done — use the **Sign out** button in the sidebar
- Do not share admin credentials
- Tokens are stored in `localStorage` — clear them on shared computers by clicking Sign Out
- Password management is handled via the backend API (see backend repo)

---

## Adding a New Resource Type

1. Add the TypeScript interface to `admin/types.ts`
2. Create `admin/api/newresource.ts` following the existing CRUD pattern
3. Create `admin/pages/newresource/NewResourceList.tsx` and `NewResourceForm.tsx`
4. Add routes in `App.tsx` under the `/admin` parent route
5. Add a NavLink in `admin/components/Sidebar.tsx`
