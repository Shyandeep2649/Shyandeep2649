import { CategoryChart, FlowChart, TrendChart } from "@/components/charts";
import { MetricCard } from "@/components/metric-card";
import { alerts, categoryMix, metrics, monthlyFlow } from "@/lib/mock-data";

export default function DashboardPage() {
  return <section className="space-y-6"><header className="glass grid-bg rounded-2xl p-6"><h2 className="text-2xl font-semibold">Command Center Dashboard</h2><p className="mt-1 text-sm text-slate-300">Live operations snapshot with attendance and cash intelligence.</p></header><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div><div className="grid gap-4 xl:grid-cols-3"><div className="xl:col-span-2"><FlowChart data={monthlyFlow} /></div><CategoryChart data={categoryMix} /></div><div className="grid gap-4 lg:grid-cols-3"><div className="lg:col-span-2"><TrendChart data={monthlyFlow.map((d) => ({ name: d.name, income: d.income }))} /></div><div className="glass rounded-2xl p-4"><h3 className="mb-4 text-sm text-slate-300">Smart Alerts</h3><ul className="space-y-2 text-sm text-slate-200">{alerts.map((alert) => <li key={alert} className="rounded-xl border border-rose-300/20 bg-rose-500/5 p-3">{alert}</li>)}</ul></div></div></section>;
}
