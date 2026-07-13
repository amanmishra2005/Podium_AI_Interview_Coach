<div align="center">

# 🎤 Podium

### AI-powered mock interview coach — practice, get scored, get better

**Resume-aware questions · Live voice interviews · Instant performance scorecards**

![Node](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## ✨ What is Podium?

Podium helps job seekers walk into real interviews prepared. Upload your resume, tell it your target role, and step onto the stage — a live mock interview simulated by **Google Gemini**, tailored to *your* actual background, followed by a detailed scorecard breaking down exactly how you did.

No generic question banks. No guessing what to improve. Just realistic practice and honest feedback.

---

## 🚀 Key Features

| Feature | What it does |
|---|---|
| 🎯 **Tailored Mock Interviews** | Dynamically generates technical & behavioral questions based on your resume and target job description |
| 🎙️ **Voice Input** | Speak your answers naturally via the browser's Web Speech API — no typing under pressure |
| 📋 **Performance Scorecards** | Post-interview breakdown: overall score, key strengths, actionable improvements, and a summary |
| 📄 **Resume Parsing** | Automatically extracts text from PDF & DOCX resumes to ground the AI in your real experience |
| 🔐 **Secure Authentication** | Signup/login flow with JWT-based session persistence |

---

## 🛠️ Tech Stack

**Frontend** — `React (Vite)` · `Tailwind CSS` · `React Router`
**Backend** — `Node.js` · `Express.js`
**Database** — `MongoDB Atlas`
**AI Engine** — `Google Gemini API` (`gemini-2.5-flash`)
**Speech** — `Web Speech API`

---

## 📁 Repository Structure

```text
├── Backend/
│   ├── server.js              # Express app entry point & middleware config
│   ├── config/                # Database connection utilities
│   ├── controllers/           # Auth, resume parsing, and interview logic
│   ├── middleware/            # JWT authentication middleware
│   ├── models/                # MongoDB Mongoose schemas (User, Resume, Interview)
│   ├── routes/                # API route handlers
│   └── utils/                 # Gemini API client & resume parser (Mammoth/PDF-parse)
│
├── Frontend/
│   ├── src/
│   │   ├── api/                # Axios instance & request interceptors
│   │   ├── components/         # Shared components (Navbar, ProtectedRoute)
│   │   ├── context/             # React AuthContext for state persistence
│   │   └── pages/               # Dashboard, Login, Interview, Feedback, History
│   ├── vercel.json             # Vercel configuration for SPA routing
│   └── vite.config.js          # Vite configuration & proxy settings
```

---

## ⚙️ Local Development Setup

### 1️⃣ Backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

### 2️⃣ Frontend

```bash
cd ../Frontend
npm install
```

Create a `.env` file in `Frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Visit **`http://localhost:5173`** and step up to the mic 🎤

---

## ☁️ Deployment Guide

<details>
<summary><b>Backend — Render</b></summary>
<br>

| Setting | Value |
|---|---|
| Root Directory | `Backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Env Vars | `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `NODE_ENV=production`, `FRONTEND_URL` (your Vercel domain), `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL` |

</details>

<details>
<summary><b>Frontend — Vercel</b></summary>
<br>

| Setting | Value |
|---|---|
| Root Directory | `Frontend` |
| Framework Preset | `Vite` |
| Env Vars | `VITE_API_URL` → your Render backend URL (e.g. `https://your-backend.onrender.com/api`) |
| Routing | The included `vercel.json` rewrite rules ensure client-side routing survives page reloads |

</details>

---

<div align="center">

Step onto the **Podium**. Nail the interview. 🏆

</div>
