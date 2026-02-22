import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const RANKS = [
  "Recruit",
  "Squire",
  "Knight",
  "Veteran",
  "Champion",
  "Warlord",
  "Grand Master",
];

export function getRankName(level: number): string {
  return RANKS[Math.min(level - 1, RANKS.length - 1)] ?? "Grand Master";
}
