import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/3 blur-[100px]" />
      </div>

      <Sidebar email={user.email} />

      {/* Main content area with responsive margin for sidebar */}
      <main className="relative z-10 min-h-screen transition-all duration-200 md:ml-16 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
