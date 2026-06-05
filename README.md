# E-Commerce platform


## Quick start

### 1. Environment variables

- **Backend:** Copy `server/.env.example` to `server/.env` and set all variables (see [ENV_VARIABLES.md](./ENV_VARIABLES.md)).
- **Frontend:** Copy `client/.env.example` to `client/.env` and set `VITE_API_URL=http://localhost:5000`.

### 2. Backend

```bash
cd server
npm install
npm run dev
```

Runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`.

### 4. Razorpay setup (local)

- Create Razorpay API keys and set:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  in `server/.env`.

This project uses **Razorpay Checkout + signature verification** (no webhook required for the basic flow).

### 5. Seed data (optional)

Add products and categories via MongoDB Compass, or create a seed script that inserts into `Product` and `Category` collections. Product schema: `name`, `slug`, `images` (array of URLs), `intro`, `description`, `price`, `discount`, `categories` (array of Category IDs), `stock`, `status`, `variant`.

---

## Project structure

- `server/` – Express API, Mongoose models, JWT auth, Razorpay payments.
- `client/` – React (Vite), React Router, TanStack React Query, Zustand cart.
- [ENV_VARIABLES.md](./ENV_VARIABLES.md) – **All env variables** needed to clone and run.

## Features

- Auth: register, login, JWT, protected routes (cart, orders).
- Products & categories: list, by variant, by category slug, by product slug, search.
- Cart: Zustand with localStorage persistence; checkout uses Razorpay Checkout.
- Orders: created after Razorpay signature verification; user order history at `/orders`.
- Pages: Home, Shop, Product, Category, Cart, Orders, Success, Sign In/Up, About, Contact, FAQs, Privacy, Terms.

No Facebook Messenger or other chat widget.
