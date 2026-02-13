import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "WorkTrack X", description: "Precision in Every Presence." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
