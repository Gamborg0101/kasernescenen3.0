# 🏛️ Booking System

> A fullstack room booking system developed for music rehearsal rooms at Aarhus University, designed to replace an older and less optimal solution.

> The system is built to handle complex booking scenarios, ensure data integrity, and provide a simple and reliable user experience for both students and administrators.

---

## ✨ Features

- 📅 **Weekly calendar view** with 15-minute timeslots
- 🔐 **Role-based access control** — User and Admin roles
- 🏠 **Multi-room support** — switch between rooms seamlessly
- ⚡ **Real-time booking conflict detection**
- 🚪 **Auto-registration flow** — unregistered users are prompted to sign up on first login

---

## 🛜 Demo

https://kasernescenen3.vercel.app/

## 🛠️ Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 16              |
| Language  | TypeScript              |
| Styling   | Tailwind CSS            |
| Database  | PostgreSQL              |
| ORM       | Prisma                  |
| Auth      | Auth.js                 |

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

### 5. Run the Database

```bash
docker compose up -d
bun prisma migrate dev
bun prisma db seed
```

### 6. Start Development Server

```bash
bun dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📁 Environment Variables

| Variable             | Description                     |
| -------------------- | ------------------------------- |
| `AUTH_SECRET`        | Secret key for Auth.js sessions |
| `AUTH_GOOGLE_ID`     | Google OAuth client ID          |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret      |
| `DATABASE_URL`       | PostgreSQL connection string    |

> See `.env.example` for a full template.
