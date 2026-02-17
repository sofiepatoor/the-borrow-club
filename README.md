# 📦 The Borrow Club: a Shared Physical Media Library

## Concept

A **web app** where people can list the **physical media they own** (books, DVDs, games, etc.) in a digital library and connect with friends to view and borrow items.

## Current features

- **Library view** – One page showing your items and your friends’ items, with owner shown per item
- **Add items** – Add new items to your library (title only)
- **Items & ownership** – Each item has one owner; a user can own many items
- **Authentication** – Login and logout via magic link (email)
- **Personal library** – Users only see and manage their own items in their library
- **Friends** – Add other users as friends (send/accept/reject friend requests)
- **Friends’ library** – View items owned by accepted friends
- **Borrowing flow** – Request to borrow an item; owner can accept or reject; mark as borrowed when accepted and mark as returned when done

## Roadmap

### MVP

- [x] Simple library view (list all items with owners)
- [x] Add items (title + owner)
- [x] Users & items data model (simplified)
- [x] User authentication (login & logout)
- [x] Users can only see / add their own items in their library
- [x] Users can add other users as friends
- [x] Users can see their friends' library
- [x] Borrowing flow (request, mark as borrowed/returned)

### Post-MVP

- [ ] Users can edit their profile
- [ ] Users can view other users' profile pages
- [ ] Item media types (e.g. books, DVDs, games) and more fields
- [ ] Option to fetch metadata of items
- [ ] User groups and item visibility restriction
- [ ] Search and filter the library

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules + SCSS
- Radix Primitives

### Backend & Database

- PostgreSQL hosted on Neon
- Prisma ORM (schema & migrations)
- Next.js Server Actions
- NextAuth.js (authentication)
- Resend (email provider for magic links)

### Other

- Vercel (deployment)
