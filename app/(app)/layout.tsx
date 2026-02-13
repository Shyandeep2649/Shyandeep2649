import { Sidebar } from "@/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen"><Sidebar /><main className="px-4 pb-10 pt-6 lg:ml-72 lg:px-8">{children}</main></div>;
}
