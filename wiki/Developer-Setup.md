# Developer Setup

Get the project running locally from zero.

---

## Prerequisites

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Node.js | 20.x LTS | https://nodejs.org |
| npm | 10.x | Comes with Node |
| Git | Any recent | https://git-scm.com |

> No PHP or MySQL required. The frontend connects to a remote Laravel API.

---

## Step 1 — Clone the repo

```bash
git clone https://github.com/CyberCodezilla/vcet.edu.in.git
cd vcet.edu.in
```

---

## Step 2 — Install dependencies

```bash
npm install
```

---

## Step 3 — Configure the API URL

Copy `.env.example` to `.env.local` and set the backend URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_URL=https://vcet.edu.in
```

> **Note:** Do **not** add `/api` to the end. Each service file in `services/` appends `/api/` internally. Adding it here will result in double-prefixed paths like `/api/api/notices`.

For local backend development (if you have the [backend repo](https://github.com/ivory-26/vcet) running):

```env
VITE_API_URL=http://localhost:8000
```

---

## Step 4 — Start the dev server

```bash
npm run dev
```

The app will be live at **http://localhost:5173**

Hot module replacement (HMR) is enabled via Vite — changes to `.tsx` files reflect instantly without a full page reload.

- Public website: **http://localhost:5173/**
- Admin panel:    **http://localhost:5173/admin/login**

---

## (Optional) Run the backend locally

Clone and set up the Laravel backend from the separate repo:

```bash
git clone https://github.com/ivory-26/vcet.git vcet-api
cd vcet-api
composer install
cp .env.example .env
php artisan key:generate
# Configure DB credentials in .env, then:
php artisan migrate --seed
php artisan serve   # Starts at http://localhost:8000
```

Then set `VITE_API_URL=http://localhost:8000` in `.env.local`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Common Issues

| Problem | Fix |
|---------|-----|
| `Module not found` errors | Run `npm install` again |
| Port 5173 already in use | Kill the process or change port in `vite.config.ts` |
| Tailwind classes not applying | Ensure `tailwind.config.js` includes the correct `content` paths |
| CORS errors on API calls | Check that `VITE_API_URL` points to the correct API origin and CORS is configured on the backend |
| Admin login fails | Verify the backend is running and `VITE_API_URL` is set correctly |

