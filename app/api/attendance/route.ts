import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Attendance analytics endpoint", insight: "Attendance dropped 15% this week" });
}
