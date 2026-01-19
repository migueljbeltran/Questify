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
import { cn } from "@/lib/utils";
import { logout } from "@/app/login/actions";

interface SidebarProps {
  email?: string;
}

const navItems = [
  { href: "/dashboard", label: "Today", icon: Calendar },
  { href: "/dashboard/quests", label: "All Quests", icon: ListTodo },
  { href: "/dashboard/completed", label: "Completed", icon: CheckCircle2 },
  { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
];

export function Sidebar({ email }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full flex-col bg-white/[0.02] backdrop-blur-md",
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
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
              Q
            </div>
            <span className="text-foreground font-semibold md:hidden lg:inline">
              Questify
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/40 transition-colors hover:text-white lg:hidden"
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
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
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
        <div className="p-3">
          {email && (
            <div className="mb-3 truncate px-3 text-xs text-white/30 md:hidden lg:block">
              {email}
            </div>
          )}
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-all hover:bg-white/5 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="md:hidden lg:inline">Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
