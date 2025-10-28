# DevLinks Web

React 19 single-page app that consumes the DevLinks API and renders the link submission form plus listing UI.

For end-to-end setup steps, consult the root [README.MD](../../README.MD).

---

## Key scripts

- `npm run dev --workspace web` - start the Vite dev server
- `npm run build --workspace web` - create a production build
- `npm run preview --workspace web` - preview the production build
- `npm run lint --workspace web` - run ESLint checks

Running the same commands inside `apps/web` works without the `--workspace` flag.

---

## Environment

This package reads `VITE_API_URL` to locate the backend. Copy the example file to get started:

```bash
cp apps/web/.env.example apps/web/.env
```

The default points at `http://localhost:3000`, which matches the API when both services run via Docker Compose.
