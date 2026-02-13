import { NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/auth";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const token = await signToken({ sub: parsed.data.email, role: parsed.data.email.includes("admin") ? "ADMIN" : "MANAGER" });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("worktrack_token", token, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  return response;
}
