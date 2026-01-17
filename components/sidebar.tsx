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
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-1 text-muted-foreground lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "sidebar fixed left-0 top-0 z-50 flex h-full flex-col",
          // Desktop: always visible, full width
          "lg:w-64",
          // Tablet: collapsed (icons only)
          "md:w-16 md:translate-x-0",
          // Mobile: drawer
          "w-64 -translate-x-full md:translate-x-0",
          mobileOpen && "translate-x-0 animate-slide-in-left"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              Q
            </div>
            <span className="font-semibold text-foreground md:hidden lg:inline">
              Questify
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
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
                      "sidebar-item",
                      isActive && "active"
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
        <div className="border-t border-border p-3">
          {email && (
            <div className="mb-3 truncate px-3 text-xs text-muted-foreground md:hidden lg:block">
              {email}
            </div>
          )}
          <button
            onClick={() => logout()}
            className="sidebar-item w-full text-left hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="md:hidden lg:inline">Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
