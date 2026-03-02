# 📦 The Borrow Club: a Shared Physical Media Library

## Concept

A **web app** where people can list the **physical media they own** (books, DVDs, games, etc.) in a digital library and connect with friends to view and borrow items.

## Current features

- **Library**
  - One view showing your items and your friends’ items (owner shown per item).
  - Add, edit, and delete items.
  - Item types: book, movie, video game, board game, other — each with type-specific fields (e.g. author, director, genre, release year).
  - Optional metadata lookup to auto-fill item details.
  - Item images: upload your own or use an image from metadata.
- **Authentication**
  - Login and logout via magic link (email); no passwords.
- **Friends**
  - Send friend requests to other users; accept or reject incoming requests.
  - View friends’ libraries (items owned by accepted friends).
  - User profile pages: view other users’ profiles; edit your own profile and upload a profile picture.
- **Borrowing**
  - Request to borrow an item from a friend; owner can accept or reject.
  - When accepted: mark as borrowed; when done, mark as returned.
  - Track active loans and pending requests (incoming and outgoing).
- **Dashboard**
  - Homepage with: recently added items (slider), items you’re currently borrowing, items borrowed from you, and loan requests (incoming and outgoing).

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

- [x] Extend homepage UI:
  - [x] recently added
  - [x] currently borrowing
  - [x] currently borrowed from you
  - [x] requests
- [x] Users can view other users' profile pages
- [x] Users can edit their profile and upload a profile picture
- [x] Item media types (e.g. books, movies, games) and type-specific fields
- [x] Option to fetch metadata of items
- [x] Item detail page
- [ ] Improve general design & UX
- [ ] Search and filter the library
- [ ] User groups and item visibility restriction

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
- Cloudinary (image uploads)

### Other

- Vercel (deployment)
