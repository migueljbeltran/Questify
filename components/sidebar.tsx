"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ListTodo,
  CheckCircle2,
  BarChart3,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn, getRankName } from "@/lib/utils";
import { logout } from "@/app/login/actions";

interface SidebarProps {
  email?: string;
  level?: number;
}

const navItems = [
  { href: "/dashboard", label: "Bounties", icon: Calendar },
  { href: "/dashboard/quests", label: "Quest Board", icon: ListTodo },
  { href: "/dashboard/completed", label: "Chronicles", icon: CheckCircle2 },
  { href: "/dashboard/stats", label: "Guild Record", icon: BarChart3 },
];

export function Sidebar({ email, level = 1 }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const rankName = getRankName(level);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="border-gold/20 bg-surface-1 text-cream/60 hover:border-gold/40 hover:text-gold fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-sm border backdrop-blur-sm transition-colors lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="bg-background/60 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "border-cream/5 bg-surface-1 fixed top-0 left-0 z-50 flex h-full flex-col border-r backdrop-blur-md",
          // Desktop: always visible, full width
          "lg:w-64",
          // Tablet: collapsed (icons only)
          "md:w-16 md:translate-x-0",
          // Mobile: drawer
          "w-64 -translate-x-full md:translate-x-0",
          mobileOpen && "animate-slide-in-left translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="text-gold text-2xl md:hidden lg:inline">⚜</span>
            <span className="font-display text-gold text-sm font-bold tracking-widest md:hidden lg:inline">
              QUESTIFY
            </span>
            {/* Tablet collapsed: just the emblem */}
            <span className="text-gold text-xl md:inline lg:hidden">⚜</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-cream/40 hover:text-gold transition-colors lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm transition-all",
                      isActive
                        ? "border-gold bg-gold/5 text-gold border-l-2"
                        : "text-cream/30 hover:bg-gold/5 hover:text-cream/60"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="md:hidden lg:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-cream/5 border-t p-3">
          {email && (
            <div className="mb-2 px-3 md:hidden lg:block">
              <p className="text-gold/70 text-xs font-semibold tracking-wider md:hidden lg:block">
                {rankName}
              </p>
              <p className="text-cream/30 truncate text-xs">{email}</p>
            </div>
          )}
          <button
            onClick={() => logout()}
            className="text-cream/30 hover:bg-crimson/10 flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-all hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="md:hidden lg:inline">Leave the Guild</span>
          </button>
        </div>
      </aside>
    </>
  );
}
