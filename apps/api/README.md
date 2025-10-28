# DevLinks API

NestJS 11 service that powers the DevLinks application. It manages link persistence through Prisma and exposes REST endpoints consumed by the React client.

For project-wide context and onboarding instructions, see the root [`README.MD`](../../README.MD).

---

## Key scripts

Run these from the repository root unless noted otherwise:

- `npm run start:dev --workspace api` - start the API with hot reload
- `npm run build --workspace api` - produce a production build
- `npm test --workspace api` - execute unit tests
- `npm run prisma:migrate --workspace api` - apply development migrations

Inside the `apps/api` directory the same commands work without the `--workspace` flag.

---

## Environment

Copy `.env.example` to `.env` and adjust values as needed when running outside Docker:

```bash
cp apps/api/.env.example apps/api/.env
```

Key variables:

- `PORT` - HTTP port (defaults to 3000)
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - allowed frontend origin

---

## REST surface

| Method | Path         | Description                                      |
| ------ | ------------ | ------------------------------------------------ |
| POST   | `/links`     | Create a link (`url` required, `title` optional) |
| GET    | `/links`     | List links ordered newest first                  |
| GET    | `/:id`       | Redirect to the saved link URL                   |
| DELETE | `/links/:id` | Remove a link                                    |
