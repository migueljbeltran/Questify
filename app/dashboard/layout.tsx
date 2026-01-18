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
    <div className="bg-background min-h-screen">
      <Sidebar email={user.email} />

      {/* Main content area with responsive margin for sidebar */}
      <main className="min-h-screen transition-all duration-200 md:ml-16 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
