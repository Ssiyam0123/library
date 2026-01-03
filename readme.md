# Library — Mobile + Backend

Simple book library app with an Expo/React frontend and a Node.js backend (Express + MongoDB). Features user auth, book CRUD, image upload (Cloudinary), and basic review/recommendation UI.

## Features
- Email/password registration & login (JWT)
- Browse all books
- Create, update, delete books (with cover image)
- View single book details and reviews
- User profile and list of user's books
- Recommendations UI component
- Cloudinary image hosting
- Protected routes via auth middleware

## Repo layout
- backend/ — Express API
    - src/index.js — app entry
    - src/lib/cloudinary.js — Cloudinary helper
    - src/lib/db.js — DB connection
    - src/lib/corn.js — cron or job utilities
    - src/middlewares/auth.middleware.js — JWT auth guard
    - src/models/user.js, book.js — Mongoose models
    - src/routes/authRoutes.js, bookRoutes.js — main API routes
- mobile/ — Expo + React UI
    - app/, components/, hooks/, lib/api.js, services/auth.service.js, store/authStore.js

## Backend API Endpoints
All endpoints are prefixed with /api (examples below).

Auth
- POST /api/auth/register
    - Body: { name, email, password }
    - Resp: { user, token }
- POST /api/auth/login
    - Body: { email, password }
    - Resp: { user, token }
- GET /api/auth/me
    - Headers: Authorization: Bearer <token>
    - Resp: current user

Books
- GET /api/books
    - Query: ?page=&limit=&q=
    - Resp: [books]
- GET /api/books/:id
    - Resp: book
- GET /api/books/user
    - Headers: Authorization: Bearer <token>
    - Resp: books owned by current user
- POST /api/books
    - Headers: Authorization: Bearer <token>
    - Body (multipart/form-data or JSON): { title, author, description, coverImage /*url or file*/ , ... }
    - Resp: created book
- PUT /api/books/:id
    - Headers: Authorization: Bearer <token>
    - Body: fields to update
    - Resp: updated book
- DELETE /api/books/:id
    - Headers: Authorization: Bearer <token>
    - Resp: success
- POST /api/books/:id/review
    - Headers: Authorization: Bearer <token>
    - Body: { rating, comment }
    - Resp: updated book with review

Notes
- Protected routes require Authorization header with JWT.
- Cover image uploads use Cloudinary (handled in backend). Send image file in multipart/form-data or provide image URL per client implementation.

## Environment
Copy .env.sample to .env and set:
- MONGO_URI
- JWT_SECRET
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- PORT (optional)

## Run locally

Backend
- cd backend
- npm install
- npm run dev (or npm start)

Mobile (Expo)
- cd mobile
- npm install
- expo start

## Useful scripts
- Backend: start, dev, migrate or cron-related scripts may exist in package.json
- Mobile: expo start, web, ios, android

## Notes
- See backend/src and mobile/app for implementation details and expected request/response shapes.
- Adjust environment variables and Cloudinary credentials before running.

License: MIT