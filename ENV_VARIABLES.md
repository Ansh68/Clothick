# Environment Variables for Tulos MERN Clone

Use this as the **single checklist** for all environment variables needed to run and deploy the MERN clone. Copy `.env.example` in each folder to `.env` and fill in the values.

---

## Backend (`tulos-mern/server/`)

Create `server/.env` from `server/.env.example`.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port. Default: `5000`. |
| `MONGODB_URI` | **Yes** | MongoDB connection string. Local: `mongodb://localhost:27017/tulos`. Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/tulos`. |
| `JWT_SECRET` | **Yes** | Secret used to sign JWT tokens. Use a long random string in production (e.g. 32+ chars). |
| `RAZORPAY_KEY_ID` | **Yes** | Razorpay key id (starts with `rzp_test_` / `rzp_live_`). From Razorpay Dashboard → Settings → API Keys. |
| `RAZORPAY_KEY_SECRET` | **Yes** | Razorpay key secret paired with `RAZORPAY_KEY_ID`. Keep it server-only. |
| `CLOUDINARY_CLOUD_NAME` | **Yes** | Cloudinary Cloud Name. |
| `CLOUDINARY_API_KEY` | **Yes** | Cloudinary API Key. |
| `CLOUDINARY_API_SECRET` | **Yes** | Cloudinary API Secret. |
| `CLIENT_URL` | **Yes** | Frontend origin for CORS. Local: `http://localhost:5173`. Production: `https://yourdomain.com`. |

---

## Frontend (`tulos-mern/client/`)

Create `client/.env` from `client/.env.example`.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | **Yes** | Backend API base URL. Local: `http://localhost:5000`. Production: `https://api.yourdomain.com` (or same origin if you proxy). |

---

## Summary Checklist

**Backend (server/.env):**

- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] `RAZORPAY_KEY_ID`
- [ ] `RAZORPAY_KEY_SECRET`
- [ ] `CLIENT_URL`
- [ ] `PORT` (optional)

**Frontend (client/.env):**

- [ ] `VITE_API_URL`

---

## Local development

1. **MongoDB**  
   Run MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and set `MONGODB_URI`.

2. **Razorpay**  
   - Create a Razorpay account and generate API keys.  
   - Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `server/.env`.  
   - This clone uses **Checkout + signature verification** (no webhook required for the basic flow).

3. **CORS / redirects**  
   Set `CLIENT_URL=http://localhost:5173` and `VITE_API_URL=http://localhost:5000`.

---

## Production

- Use strong, unique values for `JWT_SECRET` and never commit `.env`.
- Use Razorpay live keys (`rzp_live_...`) in production.
- Set `CLIENT_URL` and `VITE_API_URL` to your production frontend and API URLs.
