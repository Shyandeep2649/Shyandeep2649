"use client";
import Link from "next/link";
import { BarChart3, BookText, CalendarCheck2, LayoutDashboard, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck2 },
  { href: "/cashbook", label: "Cashbook", icon: BookText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  return <aside className="glass fixed left-4 top-4 hidden h-[calc(100vh-2rem)] w-64 rounded-2xl p-4 lg:block"><div className="mb-8 rounded-xl border border-cyan-300/20 bg-slate-900/70 p-4"><h1 className="text-lg font-semibold text-cyan-300">WorkTrack X</h1><p className="text-xs text-slate-400">Precision in Every Presence.</p></div><nav className="space-y-2">{nav.map((item) => { const active = pathname === item.href; return <Link key={item.href} href={item.href} className={clsx("flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-all", active ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-200 shadow-glow" : "border-transparent text-slate-300 hover:border-cyan-300/20 hover:bg-cyan-400/5")}><item.icon className="h-4 w-4" />{item.label}</Link>; })}</nav></aside>;
}
