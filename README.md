# ContractBot SaaS

ContractBot SaaS is a full-stack contract workflow platform built with Next.js, Prisma, typed APIs, authentication, email flows, billing integrations, and documentation content.

The repo demonstrates a production-style SaaS architecture with database-backed user flows, protected routes, Stripe billing, SendGrid/react-email templates, tRPC APIs, and Playwright end-to-end tests.

## Highlights

- Next.js SaaS application with typed server/client boundaries
- Prisma schema for database-backed product workflows
- NextAuth authentication with Google OAuth support
- tRPC and React Query for typed API access
- Stripe billing integration
- SendGrid and react-email transactional email templates
- MDX/contentlayer documentation system
- Playwright e2e tests and Vitest unit test setup
- Sitemap generation and Vercel analytics integration

## Tech Stack

- Next.js
- TypeScript
- Prisma
- MySQL / PlanetScale-compatible database
- NextAuth
- tRPC
- React Query
- Stripe
- SendGrid
- react-email
- Tailwind CSS
- Contentlayer / MDX
- Playwright
- Vitest

## Project Structure

```text
src/
  server/          API routers, auth, database, Stripe and server logic
  components/      app components and setup UI
  pages/           Next.js pages and routes

prisma/            database schema
emails/            transactional email templates
content/           documentation content
e2e-tests/         Playwright test suite
```

## Local Development

```bash
yarn install
cp .env.example .env.local
yarn prisma db push
yarn dev
```

Run tests:

```bash
yarn test
yarn e2e-test
```

Run email preview:

```bash
yarn dev-email
```

## Security

Do not commit `.env.local`, database URLs, OAuth secrets, Stripe keys, SendGrid keys, or customer contract data.

