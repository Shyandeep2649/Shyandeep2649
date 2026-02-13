export type AttendanceStatus = "PRESENT" | "ABSENT" | "HALF_DAY" | "OVERTIME" | "LEAVE_PAID" | "LEAVE_UNPAID";

export type DashboardMetric = {
  label: string;
  value: number;
  positive?: boolean;
};
