// // // src/components/layout/Sidebar.tsx
// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { createClient } from "@/lib/supabase/client";
// // import type { User } from "@supabase/supabase-js";
// // import { Home, PenSquare, LayoutDashboard, Bookmark, Settings, LogOut, LogIn, UserPlus } from "lucide-react";

// // interface Profile {
// //   username: string;
// //   display_name: string | null;
// //   avatar_url: string | null;
// // }

// // export default function Sidebar() {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [profile, setProfile] = useState<Profile | null>(null);
// //   const pathname = usePathname();
// //   const supabase = createClient();

// //   useEffect(() => {
// //     async function load() {
// //       const { data } = await supabase.auth.getUser();
// //       setUser(data.user);
// //       if (data.user) {
// //         const { data: p } = await supabase
// //           .from("profiles")
// //           .select("username, display_name, avatar_url")
// //           .eq("id", data.user.id)
// //           .single();
// //         setProfile(p);
// //       }
// //     }
// //     load();
// //     const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
// //       setUser(session?.user ?? null);
// //       if (!session?.user) setProfile(null);
// //       else load();
// //     });
// //     return () => listener.subscription.unsubscribe();
// //   }, [supabase]);

// //   async function handleLogout() {
// //     await supabase.auth.signOut();
// //     window.location.href = "/";
// //   }

// //   const linkClass = (href: string) =>
// //     `flex items-center gap-3 px-4 py-3 border-b border-border font-urdu text-lg ${
// //       pathname === href ? "bg-ink text-paper" : "hover:bg-panel"
// //     }`;

// //   const initial = (profile?.display_name || profile?.username || "").charAt(0).toUpperCase();

// //   return (
// //     <aside className="w-64 border-l border-border flex flex-col shrink-0 min-h-screen sticky top-0">
// //       <div className="px-4 py-6 border-b border-border">
// //         <Link href={user ? "/feed" : "/"} className="text-3xl font-urdu font-bold">
// //           ہم قلم
// //         </Link>
// //       </div>

// //       <nav className="flex-1">
// //         <Link href="/feed" className={linkClass("/feed")}>
// //           <Home size={18} /> سب تحریریں
// //         </Link>
// //         {user && (
// //           <>
// //             <Link href="/write" className={linkClass("/write")}>
// //               <PenSquare size={18} /> لکھیں
// //             </Link>
// //             <Link href="/dashboard" className={linkClass("/dashboard")}>
// //               <LayoutDashboard size={18} /> میری تحریریں
// //             </Link>
// //             <Link href="/saved" className={linkClass("/saved")}>
// //               <Bookmark size={18} /> محفوظ شدہ
// //             </Link>
// //             <Link href="/settings" className={linkClass("/settings")}>
// //               <Settings size={18} /> ترتیبات
// //             </Link>
// //           </>
// //         )}
// //       </nav>

// //       <div className="border-t border-border p-4">
// //         {user ? (
// //           <div className="flex items-center justify-between gap-2">
// //             <Link href="/settings" className="flex items-center gap-2 min-w-0">
// //               <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-sans shrink-0 overflow-hidden relative">
// //                 {profile?.avatar_url ? (
// //                   <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
// //                 ) : (
// //                   initial || "?"
// //                 )}
// //               </div>
// //               <span className="text-sm font-urdu truncate">
// //                 {profile?.display_name || profile?.username}
// //               </span>
// //             </Link>
// //             <button onClick={handleLogout} className="text-secondary shrink-0" title="لاگ آؤٹ">
// //               <LogOut size={18} />
// //             </button>
// //           </div>
// //         ) : (
// //           <div className="flex flex-col gap-2">
// //             <Link href="/login" className="text-sm font-urdu border border-ink px-3 py-2 text-center flex items-center justify-center gap-2">
// //               <LogIn size={16} /> لاگ ان
// //             </Link>
// //             <Link href="/signup" className="text-sm font-urdu bg-ink text-paper px-3 py-2 text-center flex items-center justify-center gap-2">
// //               <UserPlus size={16} /> اکاؤنٹ بنائیں
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </aside>
// //   );
// // }



// // src/components/layout/Sidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
// import { createClient } from "@/lib/supabase/client";
// import { Home, PenSquare, LayoutDashboard, Bookmark, Settings, LogOut } from "lucide-react";

// export default function Sidebar() {
//   const { profile } = useCurrentUser();
//   const pathname = usePathname();
//   const supabase = createClient();

//   async function handleLogout() {
//     await supabase.auth.signOut();
//     window.location.href = "/";
//   }

//   const linkClass = (href: string) =>
//     `flex items-center gap-3 px-4 py-3 border-b border-border font-urdu text-lg ${
//       pathname === href ? "bg-ink text-paper" : "hover:bg-panel"
//     }`;

//   const initial = (profile?.display_name || profile?.username || "").charAt(0).toUpperCase();

//   return (
//     <aside className="w-64 border-l border-border flex flex-col shrink-0 min-h-screen sticky top-0">
//       <div className="px-4 py-6 border-b border-border">
//         <Link href="/feed" className="text-3xl font-urdu font-bold">ہم قلم</Link>
//       </div>

//       <nav className="flex-1">
//         <Link href="/feed" className={linkClass("/feed")}><Home size={18} /> سب تحریریں</Link>
//         <Link href="/write" className={linkClass("/write")}><PenSquare size={18} /> لکھیں</Link>
//         <Link href="/dashboard" className={linkClass("/dashboard")}><LayoutDashboard size={18} /> میری تحریریں</Link>
//         <Link href="/saved" className={linkClass("/saved")}><Bookmark size={18} /> محفوظ شدہ</Link>
//         <Link href="/settings" className={linkClass("/settings")}><Settings size={18} /> ترتیبات</Link>
//       </nav>

//       <div className="border-t border-border p-4">
//         <Link href="/settings" className="flex items-center gap-2 min-w-0 mb-3">
//           <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-sans shrink-0 overflow-hidden relative">
//             {profile?.avatar_url ? (
//               <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
//             ) : (
//               initial || "?"
//             )}
//           </div>
//           <span className="text-sm font-urdu truncate">{profile?.display_name || profile?.username}</span>
//         </Link>
//         <button onClick={handleLogout} className="text-sm text-secondary font-sans w-full flex items-center gap-2">
//           <LogOut size={16} /> لاگ آؤٹ
//         </button>
//       </div>
//     </aside>
//   );
// }


// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenSquare, LayoutDashboard, Bookmark, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-4 py-3 border-b border-border font-urdu text-lg ${
      pathname === href ? "bg-ink text-paper" : "hover:bg-panel"
    }`;

  return (
<aside className="w-64 border-l border-border flex flex-col shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div className="h-[73px] px-4 flex items-center border-b border-border">
        <Link href="/feed" className="text-3xl font-urdu font-bold">ہم قلم</Link>
      </div>
      <nav className="flex-1">
        <Link href="/feed" className={linkClass("/feed")}><Home size={18} /> سب تحریریں</Link>
        <Link href="/write" className={linkClass("/write")}><PenSquare size={18} /> لکھیں</Link>
        <Link href="/dashboard" className={linkClass("/dashboard")}><LayoutDashboard size={18} /> میری تحریریں</Link>
        <Link href="/saved" className={linkClass("/saved")}><Bookmark size={18} /> محفوظ شدہ</Link>
        <Link href="/settings" className={linkClass("/settings")}><Settings size={18} /> پروفائل ترتیبات</Link>
      </nav>
    </aside>
  );
}