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

  const { data: userData } = await supabase
    .from("users")
    .select("xp")
    .eq("id", user.id)
    .single();

  const xp = userData?.xp ?? 0;
  const level = Math.floor(Math.sqrt(xp / 100)) || 1;

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      {/* Ambient background orbs — gold + crimson + navy */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-yellow-900/20 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-red-900/15 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-blue-900/20 blur-[100px]" />
      </div>

      <Sidebar email={user.email} level={level} />

      {/* Main content area with responsive margin for sidebar */}
      <main className="relative z-10 min-h-screen transition-all duration-200 md:ml-16 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
