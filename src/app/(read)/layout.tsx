// // src/app/(read)/layout.tsx
// import { createClient } from "@/lib/supabase/server";
// import ReadingNav from "@/components/layout/ReadingNav";
// import Sidebar from "@/components/layout/Sidebar";

// export default async function ReadLayout({ children }: { children: React.ReactNode }) {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (user) {
//     return (
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1">{children}</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <ReadingNav />
//       {children}
//     </div>
//   );
// }



// src/app/(read)/layout.tsx
import { createClient } from "@/lib/supabase/server";
import ReadingNav from "@/components/layout/ReadingNav";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export default async function ReadLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
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

  return (
    <div>
      <ReadingNav />
      {children}
    </div>
  );
}