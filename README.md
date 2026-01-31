# 📦 The Borrow Club: a Shared Physical Media Library

## Concept

A **web app** where people can list the **physical media they own** (books, DVDs, games, etc.) in a digital library and connect with friends to view and borrow items.

## Current features

- **Library view** – See all items in the library with their owners
- **Add items** – Add new items with a title and assign an owner
- **Users & items** – Users can own multiple items; items are linked to owners

## Roadmap

- [x] Simple library view (list all items with owners)
- [x] Add items (title + owner)
- [x] Users & items data model (simplified)
- [ ] User authentication (sign up & login)
- [ ] Users only see their own items in their library
- [ ] Borrowing flow (request, mark as borrowed/returned)
- [ ] Item media types (e.g. books, DVDs, games)
- [ ] Search and filter the library
- [ ] User profiles / friend connections
- [ ] Notifications (e.g. borrow requests)

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules + SCSS

### Backend

- Next.js Server Actions
- Prisma ORM (schema & migrations)

### Database

- PostgreSQL hosted on Neon

### Deployment

- Vercel
