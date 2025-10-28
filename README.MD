# DevLinks - Personal Developer Link Hub

DevLinks is a minimalist full-stack application for storing personal developer resources (Bookmarking). The backend exposes a small CRUD API powered by NestJS and Prisma (PostgreSQL 18), while the frontend is a React 19 client bootstrapped with Vite for fast DX. Everything ships in a single npm workspace monorepo.

---

## Tech stack at a glance

- **Backend:** NestJS 11, Prisma ORM
- **Frontend:** React 19 + Vite + TypeScript
- **Database:** PostgreSQL 18 (Dockerized)
- **Tooling:** npm workspaces, ESLint (per app), Prettier, Docker Compose

---

## Repository layout

```
/
├── apps/
│   ├── api/          # NestJS service + Prisma schema
│   └── web/          # React 19 single-page client
├── docker-compose.yml
├── package.json      # npm workspace root
└── README.MD
```

Each workspace maintains its own `package.json`, ESLint config, and environment template while sharing the root toolchain.

---

## Feature overview

### Backend API (`apps/api`)

- Exposes REST endpoints for creating, listing, redirecting, and deleting links
- Validates payloads with `class-validator` (URL format, optional title trimming)
- Applies Prisma migrations and global exception handling on startup
- Serves redirect link from root-level `GET /:id` to match the original task requirements
- Exposes a separate `GET /health/check` probe to keep service health checks reachable despite the root redirect contract

| Method | Path         | Description                                      |
| ------ | ------------ | ------------------------------------------------ |
| POST   | `/links`     | Create a link (`url` required, `title` optional) |
| GET    | `/links`     | List links ordered newest-first                  |
| GET    | `/:id`       | Redirect to the saved link URL                   |
| DELETE | `/links/:id` | Remove a link (bonus endpoint)                   |

### Frontend (`apps/web`)

- Single-page React app displaying a submission form and live link list
- Uses lightweight custom hooks for data fetching / mutation with optimistic delete UX
- Minimal styling via global CSS and inline styling

---

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- Docker Desktop (optional, required for the compose workflow)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Adjust the copied files if you are running services outside Docker (e.g., point `DATABASE_URL` at `localhost` when Prisma runs on the host).

### 3. Run everything with Docker (recommended)

```bash
npm run compose:up
```

This spins up Postgres 18, runs pending Prisma migrations, and launches both the NestJS API (port 3000) and Vite dev server (port 5173) with hot reload. To stop the stack:

```bash
npm run compose:down
```

### 4. Run services locally (without Docker)

1. Ensure a Postgres instance is accessible and matches your API `.env` configuration and you are using correct db url.
2. Apply migrations:
   ```bash
   npm run prisma:migrate --workspace api
   ```
3. Start the API:
   ```bash
   npm run start:dev --workspace api
   ```
4. Start the web client:
   ```bash
   npm run dev --workspace web
   ```

---

## Development scripts

- **API tests:** `npm test --workspace api`
- **Web build:** `npm run build --workspace web`
- **Lint:** `npm run lint --workspace <api|web>`
- **Format:** `npm run format`

---

## Design decisions

- **Prisma ORM** was selected for rapid schema iterations and type-safe database access in the 8-hour window. I also use Prisma in a personal project which makes it familiar and easier to use.
- **Global redirect route:** The redirect endpoint lives at `GET /:id` to satisfy the task requirement, even though nesting it under `/links` would better follow NestJS conventions.
- **Vite + React 19:** Vite delivers fast reloads and simple static hosting. React 19’s out-of-the-box features (e.g., server components-ready architecture) keep the UI future proof without extra tooling.
- **Custom hooks over heavier state libraries:** Given the scope and personal knowledge I opted to use custom hooks.

---

## Trade-offs & future improvements

The compressed delivery window left a few enhancements on the backlog:

1. Finishing the extra features that were descriped in the original task requirements.
2. Rename the controller to `@Controller('links')` and move redirects to `GET /links/redirect/:id` for clarity while keeping a separate route for public sharing. Then also move health check to /health path.
3. Align Prisma exception filter responses with NestJS’s default error payload shape (include `error` keys, preserve validation arrays).
4. Add Swagger/OpenAPI docs and generate clients (e.g., OpenAPI + Zod) for shared runtime validation between API and web.
5. hoist ESLint configuration to the repo root with workspace-specific extensions to reduce duplication.
6. Introduce a root-level `.env` (or config generator) to streamline environment setup across workspaces.
7. Enable the React 19 compiler for automatic memoization once the ecosystem stabilizes around the new transform.
8. Replace inline React styles with CSS Modules or a component library (MUI, HeroUI, or Tailwind) for a richer, accessible UI.
9. Continue investing in the Vite-based workflow that enabled rapid delivery here—evaluate SSR, preview builds, or alternative bundlers if requirements outgrow this lightweight setup or very possibly moving to webpack for flexibility and large scale apps.
10. Possibly clean up the package.json file for workspaces. Fully go through all dependencies, remove unecessary, update scripts, etc.
