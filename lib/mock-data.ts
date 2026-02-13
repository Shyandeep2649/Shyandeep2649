import { DashboardMetric } from "@/lib/types";

export const metrics: DashboardMetric[] = [
  { label: "Total Staff", value: 42, delta: 4, positive: true },
  { label: "Present Today", value: 35, delta: -2, positive: false },
  { label: "Absent Today", value: 7, delta: 2, positive: false },
  { label: "Today's Revenue", value: 128450, delta: 14, positive: true },
  { label: "Today's Expense", value: 63420, delta: 4, positive: false },
  { label: "Net Balance", value: 65030, delta: 10, positive: true },
  { label: "Salary Due This Month", value: 420000, delta: -3, positive: false }
];
export const monthlyFlow = [
  { name: "W1", income: 250000, expense: 125000 },
  { name: "W2", income: 280000, expense: 160000 },
  { name: "W3", income: 265000, expense: 142000 },
  { name: "W4", income: 305000, expense: 180000 }
];
export const categoryMix = [
  { name: "Operations", value: 38 }, { name: "Payroll", value: 29 }, { name: "Utilities", value: 14 }, { name: "Marketing", value: 11 }, { name: "Other", value: 8 }
];
export const alerts = ["Attendance dropped 15% this week.", "Expenses increased unusually today.", "Salary disbursement due in 3 days."];
