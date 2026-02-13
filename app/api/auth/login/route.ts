import { NextResponse } from "next/server";
import { z } from "zod";
import { signToken, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signToken({ sub: user.id, role: user.role });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("worktrack_token", token, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  return response;
}
