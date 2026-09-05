// // src/app/(main)/layout.tsx
// import Sidebar from "@/components/layout/Sidebar";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1">{children}</div>
//     </div>
//   );
// }



// src/app/(main)/layout.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen items-start">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}