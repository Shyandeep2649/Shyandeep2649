const statuses = ["Present", "Absent", "Half Day", "Overtime", "Leave (Paid)", "Leave (Unpaid)"];
export default function AttendancePage() {
  return <section className="space-y-4"><h2 className="text-xl font-semibold">Smart Attendance</h2><div className="glass rounded-2xl p-5"><p className="mb-3 text-sm text-slate-300">Bulk mark attendance and monitor real-time counters.</p><div className="grid gap-3 md:grid-cols-3">{statuses.map((s) => <button key={s} className="rounded-xl border border-cyan-300/20 bg-cyan-400/5 px-3 py-2 text-sm hover:shadow-glow">{s}</button>)}</div></div></section>;
}
