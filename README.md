# ⚜ Questify

A gamified household task app built for roommates. Complete bounties, earn gold, claim your rank, and track your deeds in the guild chronicles.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)

---

## Overview

Questify turns household chores into a medieval guild experience. Every task is a bounty, every completion earns gold, and your rank rises as you prove your worth.

- **Gold (XP)** — Earn rewards for every fulfilled bounty
- **Rank Progression** — Rise from Recruit to Grand Master
- **Vigilance (Streaks)** — Maintain daily consistency or risk your streak
- **Chronicles** — A full history of all deeds fulfilled
- **Guild Record** — Stats, analytics, and your standing in the guild

---

## Ranks

| Level | Rank         |
| ----- | ------------ |
| 1     | Recruit      |
| 2     | Squire       |
| 3     | Knight       |
| 4     | Veteran      |
| 5     | Champion     |
| 6     | Warlord      |
| 7+    | Grand Master |

---

## Features

- Post bounties with gold rewards (10 / 20 / 50 / 100)
- Fulfill bounties to earn gold and level up your rank
- Daily bounty view with streak tracking (Vigilance)
- Quest Board for managing all active bounties
- Chronicles — completion history grouped by date
- Guild Record — stats including gold earned, deeds done, and open bounties
- Responsive sidebar with rank displayed in the footer
- Medieval guild aesthetic: deep navy + burnished gold palette, Cinzel Decorative typography

---

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## Getting Started

### Prerequisites

- Node.js 20+
- Supabase account

### Installation

```bash
git clone https://github.com/migueljbeltran/Questify.git
cd Questify
npm install
```

### Configuration

Create `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
├── dashboard/
│   ├── page.tsx          # Today's Bounties
│   ├── quests/           # Quest Board
│   ├── completed/        # Chronicles
│   └── stats/            # Guild Record
├── login/                # Authentication
└── page.tsx              # Landing page

components/
├── sidebar.tsx           # Guild navigation
├── chore-list.tsx        # Bounty list
├── user-stats.tsx        # Rank, gold, vigilance
├── add-chore-dialog.tsx  # Post a Bounty dialog
├── recent-activity.tsx   # Recent Deeds
└── ui/                   # Reusable components
```

---

## License

[MIT](LICENSE)

---

## Author

**Miguel Joaquin Beltran**
Computer Science, UC Davis

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/miguel-j-beltran/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:migueljoaquinbeltran@gmail.com)
