export type DashboardSeriesPoint = {
  name: string;
  income: number;
  expense: number;
};

export type DashboardCategoryPoint = {
  name: string;
  value: number;
};

export type DashboardMetric = {
  label: string;
  value: number;
  positive?: boolean;
};

export type DashboardData = {
  metrics: DashboardMetric[];
  monthlyFlow: DashboardSeriesPoint[];
  trend: Array<{ name: string; income: number }>;
  categoryMix: DashboardCategoryPoint[];
  alerts: string[];
};

const currencyToNumber = (value: unknown) => Number(value ?? 0);
const weekLabels = ["W1", "W2", "W3", "W4"];

function fallbackData(message: string): DashboardData {
  return {
    metrics: [
      { label: "Total Staff", value: 0, positive: true },
      { label: "Present Today", value: 0, positive: true },
      { label: "Absent Today", value: 0, positive: false },
      { label: "Today's Revenue", value: 0, positive: true },
      { label: "Today's Expense", value: 0, positive: false },
      { label: "Net Balance", value: 0, positive: true },
      { label: "Salary Due This Month", value: 0, positive: false }
    ],
    monthlyFlow: weekLabels.map((name) => ({ name, income: 0, expense: 0 })),
    trend: weekLabels.map((name) => ({ name, income: 0 })),
    categoryMix: [],
    alerts: [message]
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const prismaModule = await import("@prisma/client");
    const PrismaClient = prismaModule.PrismaClient;
    const db = new PrismaClient();

    const [
      totalStaff,
      presentToday,
      absentToday,
      salaryDue,
      todayIncomeAgg,
      todayExpenseAgg,
      monthTransactions,
      monthCategoryAgg
    ] = await Promise.all([
      db.staff.count(),
      db.attendance.count({ where: { date: { gte: startOfDay, lt: endOfDay }, status: "PRESENT" } }),
      db.attendance.count({ where: { date: { gte: startOfDay, lt: endOfDay }, status: "ABSENT" } }),
      db.staff.aggregate({ _sum: { monthlySalary: true } }),
      db.transaction.aggregate({
        where: { date: { gte: startOfDay, lt: endOfDay }, type: "INCOME" },
        _sum: { amount: true }
      }),
      db.transaction.aggregate({
        where: { date: { gte: startOfDay, lt: endOfDay }, type: "EXPENSE" },
        _sum: { amount: true }
      }),
      db.transaction.findMany({
        where: { date: { gte: startOfMonth, lte: now } },
        select: { date: true, type: true, amount: true },
        orderBy: { date: "asc" }
      }),
      db.transaction.groupBy({
        by: ["category"],
        where: { date: { gte: startOfMonth, lte: now }, type: "EXPENSE" },
        _sum: { amount: true }
      })
    ]);

    await db.$disconnect();

    const todayRevenue = currencyToNumber(todayIncomeAgg._sum.amount);
    const todayExpense = currencyToNumber(todayExpenseAgg._sum.amount);
    const salaryDueTotal = currencyToNumber(salaryDue._sum.monthlySalary);

    const monthlyBuckets: DashboardSeriesPoint[] = weekLabels.map((label) => ({ name: label, income: 0, expense: 0 }));

    for (const tx of monthTransactions as Array<{ date: Date; type: string; amount: unknown }>) {
      const day = tx.date.getDate();
      const weekIndex = Math.min(3, Math.floor((day - 1) / 7));
      const amount = currencyToNumber(tx.amount);
      if (tx.type === "INCOME") monthlyBuckets[weekIndex].income += amount;
      else monthlyBuckets[weekIndex].expense += amount;
    }

    const categoryMix: DashboardCategoryPoint[] = (monthCategoryAgg as Array<{ category: string; _sum: { amount: unknown } }>)
      .map((row) => ({ name: row.category, value: currencyToNumber(row._sum.amount) }))
      .filter((row) => row.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    const attendanceRatio = totalStaff > 0 ? (presentToday / totalStaff) * 100 : 0;
    const alerts: string[] = [];

    if (totalStaff === 0) alerts.push("No staff added yet. Start by creating your first staff profile.");
    if (todayRevenue === 0 && todayExpense === 0) alerts.push("No cash activity for today. Add an income or expense entry to begin insights.");
    if (totalStaff > 0 && attendanceRatio < 60) alerts.push("High absentee alert: attendance is below 60% today.");
    if (salaryDueTotal > 0) alerts.push("Salary due reminder: monthly payroll is pending this cycle.");

    return {
      metrics: [
        { label: "Total Staff", value: totalStaff, positive: true },
        { label: "Present Today", value: presentToday, positive: true },
        { label: "Absent Today", value: absentToday, positive: false },
        { label: "Today's Revenue", value: todayRevenue, positive: true },
        { label: "Today's Expense", value: todayExpense, positive: false },
        { label: "Net Balance", value: todayRevenue - todayExpense, positive: todayRevenue >= todayExpense },
        { label: "Salary Due This Month", value: salaryDueTotal, positive: false }
      ],
      monthlyFlow: monthlyBuckets,
      trend: monthlyBuckets.map((item) => ({ name: item.name, income: item.income })),
      categoryMix,
      alerts: alerts.length > 0 ? alerts : ["All systems nominal. New insights will appear as activity grows."]
    };
  } catch {
    return fallbackData("Database not connected yet. Configure DATABASE_URL and run prisma generate.");
  }
}
