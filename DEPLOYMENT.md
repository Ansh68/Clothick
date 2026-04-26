# 🚀 Clothick Deployment Guide

Deploy the **Client** on **Vercel** and the **Server** on **Render**.

---

## Prerequisites

Before deploying, make sure you have:

- [x] A **GitHub** account with the repo pushed
- [x] A **MongoDB Atlas** database (free tier works)
- [x] **Cloudinary** account (for image uploads)
- [x] **Razorpay** account (for payments)
- [x] A **Vercel** account → [vercel.com](https://vercel.com)
- [x] A **Render** account → [render.com](https://render.com)

---

## Step 1: Push to GitHub

```bash
cd c:\Users\archi\Desktop\clothi\Clothick

# Initialize git (if not already)
git init

# Create a single repo with both client & server
git add .
git commit -m "Initial commit - Clothick"
git remote add origin https://github.com/YOUR_USERNAME/Clothick.git
git branch -M main
git push -u origin main
```

> [!IMPORTANT]
> Make sure `.env` files are in `.gitignore` (they already are). Never push secrets to GitHub.

---

## Step 2: Deploy Server on Render

### 2.1 Create a New Web Service

1. Go to [render.com/dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your **GitHub repo** (Clothick)
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `clothick-api` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### 2.2 Add Environment Variables

In the Render dashboard, go to **Environment** tab and add:

| Variable | Value |
|----------|-------|
| `PORT` | `10000` (Render assigns this, but set it to be safe) |
| `MONGODB_URI` | `mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/clothick` |
| `JWT_SECRET` | A long random string (32+ chars). Generate one: `openssl rand -hex 32` |
| `RAZORPAY_KEY_ID` | Your Razorpay Key ID (e.g., `rzp_test_xxxxx` or `rzp_live_xxxxx`) |
| `RAZORPAY_KEY_SECRET` | Your Razorpay Key Secret |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `CLIENT_URL` | `https://clothick.vercel.app` ← (update after Vercel deploy) |

### 2.3 Deploy

Click **"Create Web Service"**. Render will:
1. Install dependencies (`npm install`)
2. Start the server (`npm start` → `node src/server.js`)

> [!NOTE]
> The free tier spins down after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

### 2.4 Note Your Server URL

After deployment, your server URL will be something like:
```
https://clothick-api.onrender.com
```
**Copy this URL** — you'll need it for the client.

---

## Step 3: Deploy Client on Vercel

### 3.1 Create a New Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your **GitHub repo** (Clothick)
4. Configure the project:

| Setting | Value |
|---------|-------|
| **Project Name** | `clothick` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `client` ← Click "Edit" and type `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3.2 Add Environment Variable

In the **Environment Variables** section:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://clothick-api.onrender.com` ← Your Render server URL |

> [!WARNING]
> Vite env variables must start with `VITE_` to be exposed to the client.

### 3.3 Add Vercel Rewrites (Important!)

Since this is a React SPA with client-side routing, you need a `vercel.json` file in the `client` folder to prevent 404s on page refresh:

Create `client/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

> [!CAUTION]
> Without this file, refreshing any page (like `/shop`, `/account`, `/cart`) will return a **404 error** on Vercel.

### 3.4 Deploy

Click **"Deploy"**. Vercel will:
1. Install dependencies
2. Run `vite build`
3. Serve the `dist` folder

Your site will be live at:
```
https://clothick.vercel.app
```

---

## Step 4: Update CORS (After Both Are Live)

Go back to **Render** → Your service → **Environment** → Update:

```
CLIENT_URL=https://clothick.vercel.app
```

> [!IMPORTANT]
> This must match your exact Vercel URL (no trailing slash). Without this, API requests from the client will be blocked by CORS.

---

## Step 5: Seed Database (Optional)

If you want to populate the database with sample products:

```bash
# Set MONGODB_URI in server/.env to your Atlas connection string, then:
cd server
npm run seed
```

---

## Environment Variables Summary

### Server (Render)

| Variable | Example Value |
|----------|---------------|
| `PORT` | `10000` |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/clothick` |
| `JWT_SECRET` | `a1b2c3d4e5f6...` (32+ chars) |
| `RAZORPAY_KEY_ID` | `rzp_test_xxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | `xxxxxxxxxxxxxxxx` |
| `CLOUDINARY_CLOUD_NAME` | `dxxxxxxxxx` |
| `CLOUDINARY_API_KEY` | `123456789012345` |
| `CLOUDINARY_API_SECRET` | `xxxxxxxxxxxxxxxx` |
| `CLIENT_URL` | `https://clothick.vercel.app` |

### Client (Vercel)

| Variable | Example Value |
|----------|---------------|
| `VITE_API_URL` | `https://clothick-api.onrender.com` |

---

## Troubleshooting

### API calls failing (CORS errors)
- Make sure `CLIENT_URL` on Render matches your exact Vercel URL
- No trailing slash: ✅ `https://clothick.vercel.app` ❌ `https://clothick.vercel.app/`

### 404 on page refresh (Vercel)
- Make sure `client/vercel.json` exists with the rewrites config shown above

### Images not uploading
- Verify all 3 Cloudinary env vars are set correctly on Render
- Check Cloudinary dashboard for upload limits

### Payments not working
- Use **test keys** (`rzp_test_`) for testing, **live keys** (`rzp_live_`) for production
- Make sure both `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set on Render

### Server sleeping (Render free tier)
- First request after 15 min inactivity takes ~30 seconds
- Consider upgrading to a paid plan for always-on service
- Or use a cron job / uptime monitor to ping the server every 14 minutes

### MongoDB connection issues
- Whitelist `0.0.0.0/0` in MongoDB Atlas → Network Access (allows all IPs, needed for Render)
- Make sure the connection string includes the database name: `.../clothick`

---

## Custom Domain (Optional)

### Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your domain (e.g., `clothick.com`)
3. Update DNS records as instructed by Vercel
4. Update `CLIENT_URL` on Render to match

### Render (Backend)
1. Go to Service Settings → Custom Domains
2. Add your API subdomain (e.g., `api.clothick.com`)
3. Update `VITE_API_URL` on Vercel to match

---

## Post-Deployment Checklist

- [ ] Site loads at Vercel URL
- [ ] API responds at Render URL (`/api/products` returns data)
- [ ] User registration & login works
- [ ] Product images upload to Cloudinary
- [ ] Cart & checkout flow works
- [ ] Razorpay payment processes correctly
- [ ] Page refresh doesn't 404 (vercel.json is working)
- [ ] Mobile responsive layout looks correct
- [ ] Admin panel accessible at `/admin`
