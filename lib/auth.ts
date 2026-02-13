import { SignJWT, jwtVerify } from "jose";
import { scryptSync, timingSafeEqual } from "node:crypto";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-me");

export async function signToken(payload: { sub: string; role: "ADMIN" | "MANAGER" }) {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("12h").sign(SECRET);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload as { sub: string; role: "ADMIN" | "MANAGER" };
}

export function verifyPassword(password: string, storedHash: string) {
  // Expected format: scrypt$<saltBase64>$<hashBase64>
  const [algorithm, salt, hash] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !hash) return false;

  const storedBuffer = Buffer.from(hash, "base64");
  const computedBuffer = scryptSync(password, salt, storedBuffer.length);
  return timingSafeEqual(storedBuffer, computedBuffer);
}
