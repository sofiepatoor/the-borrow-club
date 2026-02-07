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
- [x] User authentication (login & logout)
- [x] Users can only see / add their own items in their library
- [x] Users can add other users as friends
- [ ] Users can see their friends' library
- [ ] Borrowing flow (request, mark as borrowed/returned)
- [ ] Item media types (e.g. books, DVDs, games) and more fields
- [ ] Option to fetch metadata of items
- [ ] User groups and item visibility restriction
- [ ] Search and filter the library
- [ ] User profile customization

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules + SCSS

### Backend & Database

- PostgreSQL hosted on Neon
- Prisma ORM (schema & migrations)
- Next.js Server Actions
- NextAuth.js (authentication)
- Resend (email provider for magic links)

### Other

- Vercel (deployment)
