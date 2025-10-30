# (MERN) — Login & Registration System

Simple, copy-ready README for the MERN project you asked for: React frontend + Node/Express backend + MongoDB.
Implements: Register (Name, DOB, Email, Password), Login, JWT auth, store token & user in `localStorage`, protected Dashboard with a static user table.

---

## 🔥 Features (short)

* Register & Login (React forms matching provided design)
* Backend APIs with password hashing (bcrypt) and JWT issuance
* Frontend saves `token` and `user` (from backend) to `localStorage`
* Protected Dashboard page — only accessible when logged in
* Static user table on Dashboard (Name, Date Created, Role, Action)
* Tailwind CSS used for UI (or plain CSS if preferred)

---

## 🧰 Tech stack

Frontend: React, React Router, Axios, Tailwind CSS
Backend: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken
Optional: Heroicons / react-icons for UI icons

---

## 📂 Repo structure (example)

---

## ⚙️ Prerequisites

* Node.js (v16+ recommended) and npm
* MongoDB (local or Atlas)
* Optional: `npx` available in Node.js installs

---

## 🚀 Quick start (development)

### 1) Backend

```bash
cd backend
npm install
# create .env file (see sample below)
npm start   # uses nodemon if devDependency installed, or `node server.js`
```

**backend/.env (sample)**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/fullstack_auth
JWT_SECRET=replace_with_a_strong_secret
```

**Main backend endpoints**

* `POST /api/auth/register`

  * Body: `{ name, dob, email, password }`
  * Response (200): `{ message, token, user: { id, name, email, dob } }`
* `POST /api/auth/login`

  * Body: `{ email, password }`
  * Response (200): `{ message, token, user: { id, name, email, dob } }`
* `GET /api/auth/userdata` (protected)

  * Header: `x-auth-token: Bearer <token>`
  * Response (200): `{ user, table: [...] }`

---

### 2) Frontend

```bash
cd frontend
npm install
# optionally set VITE_API_URL in .env to point to backend (e.g. http://localhost:5000)
npm start
```

**Notes**

* Frontend calls backend via `src/api.js` (Axios instance).
* On successful register/login the frontend stores:

  ```js
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  ```
* Protected routes check `localStorage.getItem('token')` and redirect to `/login` if missing.

---

## ✅ How the flow works (end-to-end)

1. User fills **Register** form → frontend `POST /api/auth/register`.
2. Backend validates, hashes password, saves user to MongoDB, returns `{ token, user }`.
3. Frontend saves `token` + `user` to `localStorage`, navigates to `/dashboard`.
4. Dashboard (protected) reads `localStorage.user` and displays static table.
5. For protected API calls, frontend sends header `x-auth-token: Bearer <token>`; backend verifies JWT via `middleware/auth.js`.

---

## 🛠 Troubleshooting

* **Tailwind import error (`./base is not exported`)** — ensure `src/index.css` uses:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

  and **do not** use `@import "tailwindcss/base";`.
* If auth fails, check `JWT_SECRET` is same across restarts and tokens are being sent in `x-auth-token` header.
* If Mongo connection fails, verify `MONGO_URI` and network (Atlas IP whitelist or local Mongo running).

---

## ✅ Security notes

* Passwords are hashed with bcrypt before saving.
* JWT is signed with `JWT_SECRET`; rotate & store secrets securely in production.
* For production, store tokens more securely (httpOnly cookie + refresh tokens) rather than `localStorage`.

---

