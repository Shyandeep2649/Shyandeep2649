"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
const palette = ["#22d3ee", "#0ea5e9", "#22c55e", "#f59e0b", "#a78bfa"];

export function FlowChart({ data }: { data: Array<{ name: string; income: number; expense: number }> }) {
  return <div className="glass rounded-2xl p-4"><h3 className="mb-4 text-sm text-slate-300">Monthly Income vs Expense</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Bar dataKey="income" fill="#22d3ee" radius={[6, 6, 0, 0]} /><Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>;
}
export function TrendChart({ data }: { data: Array<{ name: string; income: number }> }) {
  return <div className="glass rounded-2xl p-4"><h3 className="mb-4 text-sm text-slate-300">Attendance & Revenue Trend</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Line dataKey="income" stroke="#22d3ee" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div>;
}
export function CategoryChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return <div className="glass rounded-2xl p-4"><h3 className="mb-4 text-sm text-slate-300">Expense Category Mix</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} innerRadius={70} outerRadius={100} dataKey="value" nameKey="name">{data.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>;
}
