"use client";
import { motion } from "framer-motion";

export function MetricCard({ label, value, delta, positive }: { label: string; value: number; delta?: number; positive?: boolean }) {
  return <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-4 transition-shadow hover:shadow-glow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">{value.toLocaleString()}</p>{typeof delta === "number" && <p className={`mt-2 text-xs ${positive ? "text-positive" : "text-negative"}`}>{positive ? "+" : ""}{delta}% vs yesterday</p>}</motion.div>;
}
