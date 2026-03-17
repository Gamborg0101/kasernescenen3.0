# Booking System

**A fullstack room booking application built to replace an already existing legacy system.**

## Features

- Weekly calendar view with 15-min timeslots
- Role-based access control (User, admin)
- Select between multiple rooms
- Real-time bookoing conflict detection
- Unregistered users are forced to sign up when logging in first time

### Technologies

This project is build with the following technologies:

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 14 (App Router) |
| Language  | TypeScript              |
| Styling   | Tailwind CSS            |
| Database  | PostgreSQL              |
| ORM       | Prisma                  |
| Auth      | Auth.js                 |

### Getting Started

- git clone https://github.com/Gamborg0101/kasernescenen3.0.git
- bun install
- cp .env.example .env
- bun prisma migrate dev
- bun prisma db seed
- bunx auth secret
  - add AUTH_SECRET secret to your .env (don't include BETTER)
- Generate the following keys on google cloud console:
  - AUTH_GOOGLE_ID
  - AUTH_GOOGLE_SECRET
    - For more information, look at this tutorial:
      - https://www.youtube.com/watch?v=0Big9K5We-U
- docker compose up
- bun dev
