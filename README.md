# 🏛️ Booking System

> A fullstack room booking system developed for music rehearsal rooms at Aarhus University, designed to replace an older and less optimal solution.

> The system is built to handle complex booking scenarios, ensure data integrity, and provide a simple and reliable user experience for both students and administrators.

---

## ✨ Features

- 📅 **Weekly calendar view** with 15-minute timeslots
- 🔐 **Role-based access control** — Student and Admin roles
- 🏠 **Multi-room support** — switch between rooms seamlessly
- ⚡ **Real-time booking conflict detection**
- 🚪 **Auto-registration flow** — unregistered users are prompted to sign up on first login

---

## 🛜 Demo

https://kasernescenen3.vercel.app/

## 🛠️ Tech Stack

| Layer     | Technology   |
| --------- | ------------ |
| Framework | Next.js 15   |
| Language  | TypeScript   |
| Styling   | Tailwind CSS |
| Database  | PostgreSQL   |
| ORM       | Prisma       |
| Auth      | Auth.js      |
| Ratelimit | Upstash      |

---
## 🧠 Decisions

### Google login instead of AU accounts
Users sign in with their own Google account instead of their AU account.
This keeps password handling out of the application entirely: Google
stores and protects the credentials, and the app never sees a password.

**Trade-off:** anyone with a Google account can register and enter an
unverified student number. This risk is accepted because every rehearsal
room has a physical lock, so a fake user can at most create annoying
bookings. Rate limiting slows down abuse, and admins can delete bookings
and users. If abuse becomes a real problem, the next step is a cap on
future bookings per user or admin approval of new users.


### Ratelimiter fails open
The rate limiter fails open: if Redis is unavailable,
requests are allowed and the failure is logged, 
because a booking system that stays usable matters more than spam protection during a short outage.

### CSP decision 
The app sends a strict Content-Security-Policy with a fresh nonce on every request, generated in middleware. 
With a nonce, the browser only runs scripts the server has accepted.
It was first rolled out with Report-Only to find what breaks, and then enforced.
Now every page has to be rendered on request, but at no cost because all routes were already dynamic. 


---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Gamborg0101/kasernescenen3.0.git
cd kasernescenen3.0
bun install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

### 3. Set Up Auth Secret

```bash
bunx auth secret
```

> Add the generated `AUTH_SECRET` value to your `.env` file.

### 4. Set Up Google OAuth

Generate the following credentials in the [Google Cloud Console](https://console.cloud.google.com/):

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

Add them to your `.env`. New to Google OAuth? Follow [this tutorial](https://www.youtube.com/watch?v=0Big9K5We-U).

### 5. Set Up Upstash Redis (Rate Limiting)

Booking, room, and user actions are rate-limited and will fail wituout a working Redit connection. Create a free database at [Upstash](https://upstash.com/) and add the following to your `.env`:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 6. Run the Database

```bash
docker compose up -d
bun prisma migrate dev
bun prisma db seed
```

### 7. Start Development Server

```bash
bun dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📁 Environment Variables

| Variable                   | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `AUTH_SECRET`              | Secret key for Auth.js sessions                   |
| `AUTH_GOOGLE_ID`           | Google OAuth client ID                            |
| `AUTH_GOOGLE_SECRET`       | Google OAuth client secret                        |
| `DATABASE_URL`             | PostgreSQL connection string                      |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST URL (used for rate limiting)   |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token (used for rate limiting) |
| `TIMETABLE_KEY`            | Key for fetching bookings from timetable          |


> See `.env.example` for a full template.
