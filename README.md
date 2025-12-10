
```md
# TinyLink — Modern URL Shortener

TinyLink is a clean, fast, and production-ready **URL shortener** built with the modern **Next.js App Router**, **TypeScript**, and **PostgreSQL**. It allows users to generate short links, optionally customize them, track clicks in real-time, and view detailed statistics — all through a minimal dashboard and powerful API.

This project fully implements all requirements of the TinyLink take-home assignment and follows real-world backend and frontend engineering practices.

---

## ✨ Key Features

- Create short URLs with optional **custom codes**
- Automatic **redirect handling**
- **Click count tracking**
- **Last clicked timestamp**
- Full **dashboard UI**
- Detailed **stats page** per short link
- **Delete** any link
- Built-in **health check API**
- Fully **type-safe** with TypeScript
- **Production-ready database migrations**
- Optimized for **Vercel deployment**

---

## 🚀 Tech Stack

- **Next.js 14** (App Router + Server Actions)
- **TypeScript**
- **Tailwind CSS**
- **Drizzle ORM**
- **Neon Serverless PostgreSQL**
- **Vercel** for deployment

---

## 📁 Project Structure

```

app/
├─ api/
│   ├─ links/
│   │   └─ route.ts          → Create & list links
│   ├─ links/[code]/route.ts → Get stats & delete
│   └─ healthz/route.ts      → Health check
├─ code/[code]/page.tsx      → Stats page
├─ [code]/route.ts           → Redirect handler
├─ layout.tsx
└─ page.tsx                  → Dashboard UI

db/
├─ schema.ts                 → Database schema
├─ client.ts                 → Database connection
└─ migrations/               → SQL migrations

drizzle.config.ts
.env.local / .env

````

---

## 🛠️ Local Setup Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourname/tinylink.git
cd tinylink
````

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables Setup

Create `.env.local`:

```
DATABASE_URL="your-neon-database-url"
BASE_URL="http://localhost:3000"
```

Create `.env` (for migrations only):

```
DATABASE_URL="your-neon-database-url"
```

⚠️ Always use the **direct Neon connection string**, not the pooled one.

---

### 4️⃣ Run Database Migrations

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

### 5️⃣ Start Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 📘 API Documentation

### ✅ Create Short Link

**POST /api/links**

```json
{
  "url": "https://google.com",
  "code": "customOptionalCode"
}
```

**Response**

```json
{
  "success": true,
  "code": "generatedOrCustomCode"
}
```

---

### ✅ Get All Links

**GET /api/links**

---

### ✅ Get Single Link Stats

**GET /api/links/:code**

```json
{
  "code": "abc123",
  "url": "https://...",
  "clickCount": 3,
  "lastClicked": "timestamp",
  "createdAt": "timestamp"
}
```

---

### ✅ Delete a Link

**DELETE /api/links/:code**

---

### ✅ Health Check

**GET /healthz**

```json
{ "ok": true, "version": "1.0" }
```

---

## 🔁 Redirect System

Any request to:

```
GET /:code
```

* Finds the original URL
* Updates click count
* Saves last clicked time
* Redirects using **HTTP 302**
* Returns **404** if the code does not exist

---

## 💻 UI Overview

### 🏠 Dashboard `/`

* Create short links
* Enter custom codes
* View all links
* Track clicks
* Delete links

### 📊 Stats Page `/code/:code`

* Original URL
* Click count
* Last clicked timestamp
* Created at date

---

## 🚀 Deployment (Vercel)

1. Push project to GitHub
2. Import the repo into Vercel
3. Add environment variables:

```
DATABASE_URL=your-neon-url
BASE_URL=https://yourproject.vercel.app
```

4. Deploy 🎉

---

## 🧪 Testing Guide

### Create Link

```json
{
  "url": "https://example.com",
  "code": "hello"
}
```

### Redirect

```
/hello
```

### Get Stats

```
/api/links/hello
/code/hello
```

### Delete

```
DELETE /api/links/hello
```

---




