# ⚔️ Questify — Gamified Chore & Productivity Web App

Questify is a cloud-native full-stack productivity platform that turns chores into a gamified experience. Built with Next.js, TypeScript, Supabase, and the Google Calendar API, it automates task scheduling, tracks real-time progress, and provides an engaging XP/points system.

---

## 🚀 Features

### ✅ Authentication & User System
- Secure Supabase auth (email/password)
- Row-level security policies
- User-specific task isolation

### 🎮 Gamified Task System
- Create, assign, and complete chores
- XP, points, streaks, progress records
- Real-time task status updates

### 📅 Google Calendar Integration
- Automated scheduling to user calendars
- Bi-directional syncing
- Webhook-triggered updates

### ⚙️ Optimized Architecture
- Next.js SSR/ISR for fast rendering
- Route caching + optimized DB queries
- Scalable relational schema

---

## 🛠 Tech Stack

- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Backend:** Supabase (PostgreSQL), RLS, SQL Policies, Next.js API Routes
- **Integrations:** Google Calendar API, Webhooks
- **Deployment:** Vercel + Supabase

---

## 📁 Database Schema (Simplified)

users  
• id  
• email  
• xp  
• created_at  

chores  
• id  
• user_id  
• title  
• description  
• schedule_time  
• points  

chore_logs  
• id  
• chore_id  
• user_id  
• completed_at  

---

## 🖥️ Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/questify
cd questify
npm install
npm run dev
