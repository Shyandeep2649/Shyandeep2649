import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cash intelligence endpoint", alert: "Expenses increased unusually today" });
}
