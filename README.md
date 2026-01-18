# Questify

A gamified personal task management application that transforms your daily goals into rewarding quests. Build habits, earn XP, level up, and track your progress over time.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)

---

## Overview

Questify uses game mechanics to make personal productivity more engaging and sustainable:

- **Experience Points (XP)** — Earn rewards for every completed task
- **Level Progression** — Watch yourself grow over time
- **Streak Tracking** — Build consistency with daily goals
- **Progress Analytics** — Visualize your accomplishments

---

## Features

### Current

- Create and complete personal quests with XP rewards
- Level system based on accumulated experience
- Dashboard with daily tasks and recent activity
- Stats page with completion history and analytics
- Responsive design for desktop and mobile

### Planned

- Daily streaks with bonus rewards
- Recurring tasks with automatic reset
- Shared groups for accountability partners or households
- Leaderboards for friendly competition
- Achievement badges and milestones

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
git clone https://github.com/yourusername/questify.git
cd questify
npm install
```

### Configuration

Create `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
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
├── dashboard/          # Main application views
│   ├── quests/         # All quests
│   ├── completed/      # Completion history
│   └── stats/          # Analytics
├── login/              # Authentication
└── page.tsx            # Landing page

components/
├── sidebar.tsx         # Navigation
├── chore-list.tsx      # Task list
└── ui/                 # Reusable components
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## License

[MIT](LICENSE)

---

## Author

**Miguel Joaquin Beltran**
Computer Science, UC Davis

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/miguel-j-beltran/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:migueljoaquinbeltran@gmail.com)
