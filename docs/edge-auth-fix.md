# Edge Runtime: Auth.js + Prisma Middleware Fix

This document describes why we use a split Auth.js config and JWT sessions, and how to simplify once Edge/Prisma support improves.

## The Issue

Next.js **middleware runs in the Edge Runtime**, which does **not** support Node.js built-in modules such as `node:path`, `node:process`, and `node:url`.

Our auth flow was:

- `middleware.ts` → imports `auth` from `@/auth`
- `auth.ts` → uses `PrismaAdapter(prisma)` → imports `@/lib/prisma`
- `prisma.ts` → imports the generated Prisma client
- **Generated Prisma client** (`src/generated/prisma/client.ts`) uses `node:path` and other Node APIs

So as soon as middleware imported `auth`, the Edge runtime tried to load the Prisma client and failed with:

```text
A Node.js module is loaded ('node:path' at line 14) which is not supported in the Edge Runtime.
```

This is a common issue when using Auth.js with a database adapter (e.g. Prisma) and Next.js middleware.

## The Fix

We use the **split config** approach recommended by Auth.js:

1. **`auth.config.ts`**  
   Shared config with **only** providers (and other non-DB options). No adapter, no Prisma. Safe to load in the Edge runtime.

2. **`auth.ts`**  
   Full config: imports `authConfig`, adds `PrismaAdapter(prisma)` and `session: { strategy: 'jwt' }`. Used by API routes and server code. **Not** imported by middleware.

3. **`middleware.ts`**  
   Creates its own Auth.js instance with `NextAuth(authConfig)` only. No Prisma or adapter, so no Node-only code runs in the Edge.

4. **JWT session strategy**  
   Session is stored in a signed cookie. Middleware can read/update the cookie and protect routes without any database calls.

### Files involved

| File              | Role |
|-------------------|------|
| `src/auth.config.ts` | Edge-safe config (providers only). |
| `src/auth.ts`        | Full config with Prisma adapter + JWT. Used everywhere except middleware. |
| `src/middleware.ts`  | Uses `NextAuth(authConfig)` only—no Prisma. |

### Trade-offs

- **Middleware cannot** run database-backed session checks or use adapter-specific logic.
- **Route protection** should be done in pages/API routes with `auth()` from `@/auth` where you need DB or full session data.
- Session content is whatever you put in the JWT (e.g. in `jwt` and `session` callbacks in `auth.ts`).

References:

- [Auth.js – Edge Compatibility](https://authjs.dev/guides/edge-compatibility)
- [Auth.js – Prisma adapter: Edge Compatibility](https://authjs.dev/getting-started/adapters/prisma#edge-compatibility)

## When This Fix Is No Longer Needed

The split config is a **workaround** for Prisma (and similar DB clients) not being Edge-safe. When that changes, we can simplify.

### Conditions for removing the workaround

1. **Prisma client is Edge-compatible**  
   Prisma 5.12+ has optional edge support with specific drivers (e.g. Neon). Our generated client would need to be built/imported in an Edge-compatible way (no `node:path` etc. in the middleware bundle).

2. **Single auth config**  
   We could then use one `auth.ts` (with PrismaAdapter) everywhere, including middleware, and optionally switch back to database sessions if desired.

### Plan: steps to simplify later

1. **Check Prisma and Auth.js docs**
   - [Prisma – Edge deployment](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/overview)
   - [Auth.js – Prisma Edge Compatibility](https://authjs.dev/getting-started/adapters/prisma#edge-compatibility)
   - Confirm our stack (e.g. Prisma + Neon) is supported in the Edge and that the generated client no longer pulls in Node-only modules when used from middleware.

2. **Merge config back into a single file**
   - Move provider (and other) options from `auth.config.ts` back into `auth.ts`.
   - Remove `auth.config.ts`.
   - In `middleware.ts`, change to:  
     `export { auth as middleware } from '@/auth';`

3. **Optional: switch back to database sessions**
   - If we no longer need the Edge workaround, we can set `session: { strategy: 'database' }` (or remove the override if database is the default) and rely on the adapter for session storage again.

4. **Test**
   - Run `npm run dev` and hit routes protected by middleware.
   - Deploy and verify middleware and auth routes (sign-in, sign-out, session) work in production.

5. **Update this doc**
   - Note that the workaround was removed, which Prisma/Auth.js version and driver was used, and any config changes (e.g. generator/output for Edge client).

---

*Last updated: 2025-01-31*
