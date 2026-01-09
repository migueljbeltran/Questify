# ⚔️ Questify

**Gamified chore tracking for roommates and shared spaces.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Turn household tasks into quests with XP, levels, and streaks. Built for roommates who want less nagging and more accountability.

## Features

- ⭐ **XP & Leveling** — Earn points for completed chores
- 🔥 **Streaks** — Build consistency with daily tracking
- 🏆 **Leaderboards** — See who's contributing most
- 📅 **Calendar Sync** — Integrate with Google Calendar
- 🤖 **AI Assistant** — Auto-generate chore lists
- 📱 **Mobile Responsive** — Works on any device

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Quick Start

### Prerequisites

```bash
node >= 20.9.0
npm or yarn or pnpm
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/questify.git
cd questify
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start your quest! 🎮

---

## 📦 Project Structure

```
questify/
├── app/                    # Next.js 16 App Router
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Main dashboard & actions
│   ├── login/             # Login page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── add-chore-dialog.tsx
│   ├── chore-list.tsx
│   ├── dashboard-header.tsx
│   ├── recent-activity.tsx
│   └── user-stats.tsx
├── lib/                   # Utilities & configurations
│   ├── supabase/         # Supabase client setup
│   └── database.types.ts # TypeScript types
└── public/               # Static assets
```

---

## 🗄️ Database Schema

```sql
-- Users Table
users (
  id: uuid (PK)
  email: text
  xp: integer
  created_at: timestamp
)

-- Chores Table
chores (
  id: uuid (PK)
  user_id: uuid (FK)
  title: text
  description: text
  base_xp: integer
  is_active: boolean
  created_at: timestamp
)

-- Completions Table
chore_completions (
  id: uuid (PK)
  user_id: uuid (FK)
  chore_id: uuid (FK)
  xp_awarded: integer
  completed_at: timestamp
)
```

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Miguel Joaquin Beltran**  
🎓 Computer Science @ UC Davis  
🔗 [LinkedIn](https://www.linkedin.com/in/miguel-j-beltran/)  
📧 [Email](mailto:migueljoaquinbeltran@gmail.com)

---

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Household insights dashboard
- [ ] Custom achievement badges
- [ ] Integration with smart home devices
- [ ] Multiplayer challenges
- [ ] Voice command support

---
