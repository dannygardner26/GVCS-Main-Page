# Docker

Builds the Vite app and serves the compiled assets from Nginx with an SPA-friendly fallback.

## Build

Pass the Vite env vars at build time (they are baked into the static bundle):

```bash
docker build -t gvcs-web \
  --build-arg VITE_SUPABASE_URL="<your supabase url>" \
  --build-arg VITE_SUPABASE_ANON_KEY="<your anon key>" \
  --build-arg VITE_GOOGLE_API_KEY="<your google gemini key>" \
  --build-arg VITE_GEMINI_API_KEY="<your gemini key>" \
  .
```

## Run

```bash
docker run -p 8080:80 gvcs-web
```

The app will be available at http://localhost:8080. Rebuild the image whenever you change env values or frontend code.

## Docker Compose (local build)

Create a `.env` (or export env vars in your shell) with the required Vite values:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_GOOGLE_API_KEY=...
VITE_GEMINI_API_KEY=...
```

Then build and start with Compose (no need for an image pull):

```bash
docker compose up --build -d
```

The site will be served on http://localhost:8080.
