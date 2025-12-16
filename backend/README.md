# Express Starter

**A minimal, modern starter template for building Express.js applications using Bun and Express.**

This repository provides a clean and scalable foundation for building REST APIs with Express, focusing on simplicity, best practices, and easy extensibility.

---

## 🚀 Features

* ⚡ **Bun runtime** (fast & modern)
* 🚂 **Express.js** for REST APIs
* 🧩 Modular folder structure
* 🌱 Environment variable support (`.env`)
* 🛡 Ready for middleware (auth, validation, logging)
* 🔌 Easy to plug in databases (MongoDB, PostgreSQL, etc.)

---

## 📦 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ssiyam0123/express-starter.git
cd express-starter
```

### 2️⃣ Install dependencies

```bash
bun install
```

### 3️⃣ Environment setup

```bash
cp .env.sample .env
```

Edit `.env` as needed:

```env
PORT=5000
NODE_ENV=development
```

---

## ▶️ Run the Server

```bash
bun run src/index.ts
```

Server will start at:

```
http://localhost:5000
```

---

## 🗂 Project Structure

```
.
├── src
│   ├── index.ts          # App entry point
│   ├── app.ts            # Express app config
│   ├── routes/           # API routes
│   ├── controllers/      # Controller logic
│   ├── middlewares/      # Custom middlewares
│   └── utils/            # Helpers / utilities
├── .env.sample
├── package.json
├── tsconfig.json
└── bun.lock
```

---

## 🔗 API Endpoints

Below are **example REST API endpoints** included / expected in this starter.
You can extend or modify them as needed.

### 🩺 Health Check

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/api/health` | Check server status |

**Response:**

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

### 👤 Users API (Example)

#### Get all users

```
GET /api/users
```

**Response:**

```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

#### Get user by ID

```
GET /api/users/:id
```

#### Create user

```
POST /api/users
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

### 🔐 Auth API (Optional / Extendable)

#### Register

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "1",
    "email": "john@example.com"
  }
}
```

---

## 🧠 How to Add New Endpoints

1. Create a route file in `src/routes/`
2. Add controller logic in `src/controllers/`
3. Register the route in `app.ts`

Example:

```ts
router.get('/products', getProducts);
```

---

## 🛠 Best Practices

* Use **Zod/Joi** for request validation
* Use **JWT** for authentication
* Separate business logic into services
* Add error-handling middleware

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

MIT License © 2025 — Siyam

---

🚀 Happy building! This starter is designed to scale with your backend projects.
