// // import Link from "next/link";
// // import {
// //   PenLine,
// //   BookOpen,
// //   Globe2,
// //   ArrowLeft,
// //   UserRound,
// //   Sparkles,
// //   Feather,
// //   Quote,
// // } from "lucide-react";

// // export default function LandingPage() {
// //   return (
// //     <main className="overflow-hidden bg-paper text-ink">

// //       {/* ================= HERO ================= */}
// //       <section className="bg-ink text-paper">
// //         <div className="max-w-7xl mx-auto px-6 py-28 md:py-40">

// //           <div className="max-w-4xl mx-auto text-center">

// //             <div className="inline-flex items-center gap-2 border border-paper/20 px-4 py-2 mb-8 animate-fade-in-up">
// //               <Feather size={16} strokeWidth={1.5} />

// //               <span className="font-urdu text-sm">
// //                 اردو لکھنے والوں کے لیے
// //               </span>
// //             </div>

// //             <h1 className="text-5xl md:text-7xl lg:text-8xl font-urdu font-bold leading-[1.2] mb-8 animate-fade-in-up">
// //               اپنی کہانی،
// //               <br />
// //               اپنی زبان میں
// //             </h1>

// //             <p className="max-w-2xl mx-auto text-lg md:text-xl font-urdu leading-loose text-paper/70 mb-10 animate-fade-in-up-delay">
// //               اپنے خیالات، تجربات اور کہانیاں اردو میں لکھیں،
// //               شائع کریں اور دنیا بھر کے قارئین تک پہنچائیں۔
// //             </p>

// //             <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up-delay-2">

// //               <Link
// //                 href="/signup"
// //                 className="group bg-paper text-ink px-8 py-4 font-urdu text-lg flex items-center justify-center gap-3 hover:bg-paper/90 transition"
// //               >
// //                 لکھنا شروع کریں

// //                 <ArrowLeft
// //                   size={20}
// //                   className="group-hover:-translate-x-1 transition-transform"
// //                 />
// //               </Link>

// //               <Link
// //                 href="/feed"
// //                 className="border border-paper/30 px-8 py-4 font-urdu text-lg flex items-center justify-center gap-3 hover:bg-paper/10 transition"
// //               >
// //                 <BookOpen size={19} strokeWidth={1.5} />

// //                 تحریریں پڑھیں
// //               </Link>

// //             </div>

// //           </div>

// //         </div>
// //       </section>


// //       {/* ================= INTRO ================= */}
// //       <section className="bg-paper border-b border-border">
// //         <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

// //           <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

// //             <div className="animate-fade-in-left">

// //               <span className="font-sans text-xs tracking-[0.3em] uppercase text-secondary">
// //                 ہمارا مقصد
// //               </span>

// //               <h2 className="text-4xl md:text-5xl font-urdu font-bold leading-tight mt-5 mb-7">
// //                 الفاظ کے لیے
// //                 <br />
// //                 ایک بہتر جگہ
// //               </h2>

// //               <p className="font-urdu text-xl text-secondary leading-loose">
// //                 ہم قلم ایک ایسی جگہ ہے جہاں اردو لکھنے والے
// //                 اپنے خیالات، علم، تجربات اور کہانیاں ایک خوبصورت
// //                 اور سادہ ماحول میں دنیا کے ساتھ شیئر کر سکتے ہیں۔
// //               </p>

// //             </div>


// //             <div className="relative animate-fade-in-right">

// //               <div className="bg-ink text-paper p-10 md:p-14">

// //                 <Quote
// //                   size={38}
// //                   strokeWidth={1}
// //                   className="mb-8 opacity-50"
// //                 />

// //                 <p className="font-urdu text-3xl md:text-4xl leading-[2]">
// //                   ہر لفظ ایک خیال ہے،
// //                   <br />
// //                   ہر تحریر ایک کہانی۔
// //                 </p>

// //                 <div className="mt-10 h-px bg-paper/20" />

// //                 <p className="font-sans text-xs tracking-widest uppercase text-paper/50 mt-5">
// //                   ہم قلم
// //                 </p>

// //               </div>

// //             </div>

// //           </div>

// //         </div>
// //       </section>


// //       {/* ================= HOW IT WORKS ================= */}
// //       <section className="bg-paper">
// //         <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

// //           <div className="max-w-2xl mb-16">

// //             <span className="font-sans text-xs tracking-[0.3em] uppercase text-secondary">
// //               کیسے کام کرتا ہے؟
// //             </span>

// //             <h2 className="text-4xl md:text-5xl font-urdu font-bold mt-5">
// //               خیال سے تحریر تک
// //             </h2>

// //           </div>


// //           <div className="grid md:grid-cols-3 gap-px bg-border border border-border">

// //             {/* Card 1 */}
// //             <div className="bg-paper p-8 md:p-10 group hover:bg-ink hover:text-paper transition-all duration-500">

// //               <PenLine
// //                 size={34}
// //                 strokeWidth={1.3}
// //                 className="mb-10 group-hover:translate-y-[-4px] transition-transform"
// //               />

// //               <span className="font-sans text-xs tracking-widest opacity-50">
// //                 01
// //               </span>

// //               <h3 className="font-urdu text-2xl font-bold mt-5 mb-4">
// //                 لکھیں
// //               </h3>

// //               <p className="font-urdu text-lg leading-loose opacity-70">
// //                 اپنے خیالات کو الفاظ دیں اور اپنی تحریر کو
// //                 ایک خوبصورت انداز میں لکھیں۔
// //               </p>

// //             </div>


// //             {/* Card 2 */}
// //             <div className="bg-paper p-8 md:p-10 group hover:bg-ink hover:text-paper transition-all duration-500">

// //               <BookOpen
// //                 size={34}
// //                 strokeWidth={1.3}
// //                 className="mb-10 group-hover:translate-y-[-4px] transition-transform"
// //               />

// //               <span className="font-sans text-xs tracking-widest opacity-50">
// //                 02
// //               </span>

// //               <h3 className="font-urdu text-2xl font-bold mt-5 mb-4">
// //                 شائع کریں
// //               </h3>

// //               <p className="font-urdu text-lg leading-loose opacity-70">
// //                 اپنی تحریر کو محفوظ کریں اور جب چاہیں اسے
// //                 اپنے قارئین کے لیے شائع کریں۔
// //               </p>

// //             </div>


// //             {/* Card 3 */}
// //             <div className="bg-paper p-8 md:p-10 group hover:bg-ink hover:text-paper transition-all duration-500">

// //               <Globe2
// //                 size={34}
// //                 strokeWidth={1.3}
// //                 className="mb-10 group-hover:translate-y-[-4px] transition-transform"
// //               />

// //               <span className="font-sans text-xs tracking-widest opacity-50">
// //                 03
// //               </span>

// //               <h3 className="font-urdu text-2xl font-bold mt-5 mb-4">
// //                 قارئین تک پہنچیں
// //               </h3>

// //               <p className="font-urdu text-lg leading-loose opacity-70">
// //                 اپنی تحریروں کو اردو پڑھنے والے قارئین
// //                 کے ساتھ شیئر کریں۔
// //               </p>

// //             </div>

// //           </div>

// //         </div>
// //       </section>


// //       {/* ================= DARK FEATURE SECTION ================= */}
// //       <section className="bg-ink text-paper">

// //         <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

// //           <div className="grid md:grid-cols-2 gap-16 items-center">

// //             <div>

// //               <span className="font-sans text-xs tracking-[0.3em] uppercase text-paper/40">
// //                 آپ کے لیے بنایا گیا
// //               </span>

// //               <h2 className="text-4xl md:text-5xl font-urdu font-bold leading-tight mt-5 mb-7">
// //                 آپ لکھیں۔
// //                 <br />
// //                 ہم جگہ دیتے ہیں۔
// //               </h2>

// //               <p className="font-urdu text-xl leading-loose text-paper/60">
// //                 ایک ایسا سادہ اور پرسکون ماحول جہاں آپ
// //                 اپنی توجہ صرف لکھنے پر مرکوز رکھ سکیں۔
// //               </p>

// //             </div>


// //             <div className="grid grid-cols-2 gap-px bg-paper/10">

// //               <div className="bg-ink border border-paper/10 p-8">
// //                 <Sparkles size={28} strokeWidth={1.2} className="mb-8" />

// //                 <h3 className="font-urdu text-xl mb-3">
// //                   سادہ تجربہ
// //                 </h3>

// //                 <p className="font-urdu text-sm text-paper/50 leading-loose">
// //                   غیر ضروری پیچیدگی کے بغیر۔
// //                 </p>
// //               </div>

// //               <div className="bg-ink border border-paper/10 p-8">
// //                 <UserRound size={28} strokeWidth={1.2} className="mb-8" />

// //                 <h3 className="font-urdu text-xl mb-3">
// //                   اپنی پروفائل
// //                 </h3>

// //                 <p className="font-urdu text-sm text-paper/50 leading-loose">
// //                   اپنی تمام تحریریں ایک جگہ۔
// //                 </p>
// //               </div>

// //               <div className="bg-ink border border-paper/10 p-8">
// //                 <BookOpen size={28} strokeWidth={1.2} className="mb-8" />

// //                 <h3 className="font-urdu text-xl mb-3">
// //                   اپنی لائبریری
// //                 </h3>

// //                 <p className="font-urdu text-sm text-paper/50 leading-loose">
// //                   اپنے الفاظ کو محفوظ رکھیں۔
// //                 </p>
// //               </div>

// //               <div className="bg-ink border border-paper/10 p-8">
// //                 <Globe2 size={28} strokeWidth={1.2} className="mb-8" />

// //                 <h3 className="font-urdu text-xl mb-3">
// //                   نئے قارئین
// //                 </h3>

// //                 <p className="font-urdu text-sm text-paper/50 leading-loose">
// //                   اپنی آواز مزید لوگوں تک پہنچائیں۔
// //                 </p>
// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //       </section>


// //       {/* ================= FEATURED WRITING ================= */}
// //       <section className="bg-paper border-b border-border">

// //         <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

// //           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">

// //             <div>

// //               <span className="font-sans text-xs tracking-[0.3em] uppercase text-secondary">
// //                 تازہ تحریریں
// //               </span>

// //               <h2 className="text-4xl md:text-5xl font-urdu font-bold mt-5">
// //                 کچھ پڑھیں
// //               </h2>

// //             </div>

// //             <Link
// //               href="/feed"
// //               className="font-urdu flex items-center gap-2 group"
// //             >
// //               تمام تحریریں

// //               <ArrowLeft
// //                 size={18}
// //                 className="group-hover:-translate-x-1 transition-transform"
// //               />
// //             </Link>

// //           </div>


// //           <div className="border-t border-border">

// //             {[1, 2, 3].map((item) => (

// //               <Link
// //                 key={item}
// //                 href="/feed"
// //                 className="group block border-b border-border py-8 hover:px-4 transition-all duration-300"
// //               >

// //                 <div className="flex items-center justify-between gap-6">

// //                   <div>

// //                     <p className="font-sans text-xs text-secondary mb-3">
// //                       تحریر · ۱۴ اگست ۲۰۲۶
// //                     </p>

// //                     <h3 className="font-urdu text-2xl md:text-3xl font-bold">
// //                       الفاظ کی دنیا میں ایک نیا سفر
// //                     </h3>

// //                   </div>

// //                   <ArrowLeft
// //                     size={24}
// //                     className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:-translate-x-2 transition-all"
// //                   />

// //                 </div>

// //               </Link>

// //             ))}

// //           </div>

// //         </div>

// //       </section>


// //       {/* ================= FINAL CTA ================= */}
// //       <section className="bg-ink text-paper">

// //         <div className="max-w-4xl mx-auto px-6 py-28 md:py-36 text-center">

// //           <Feather
// //             size={38}
// //             strokeWidth={1}
// //             className="mx-auto mb-8 opacity-50"
// //           />

// //           <h2 className="text-4xl md:text-6xl font-urdu font-bold leading-tight mb-8">
// //             آپ کے پاس کہنے کو
// //             <br />
// //             کچھ ہے؟
// //           </h2>

// //           <p className="font-urdu text-xl text-paper/60 leading-loose mb-10">
// //             اپنے الفاظ کو آج ہی ایک نئی جگہ دیں۔
// //           </p>

// //           <Link
// //             href="/signup"
// //             className="inline-flex items-center gap-3 bg-paper text-ink px-9 py-4 font-urdu text-lg hover:bg-paper/90 transition"
// //           >
// //             اپنی پہلی تحریر لکھیں

// //             <ArrowLeft size={20} />
// //           </Link>

// //         </div>

// //       </section>

// //     </main>
// //   );
// // }

// import Link from "next/link";
// import { 
//   PenTool, 
//   Globe, 
//   UserCheck, 
//   Sparkles, 
//   Feather, 
//   BookOpen, 
//   ArrowLeft 
// } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <main className="overflow-hidden font-sans dir-rtl">

//       {/* 1. Hero Section — LIGHT (White Background) */}
//       <section className="bg-white text-black border-b border-black/10">
//         <div className="max-w-6xl mx-auto px-6 py-28 md:py-36 text-center">

//           <p className="font-urdu text-lg text-zinc-600 mb-6 animate-fade-in-up">
//             اردو لکھنے والوں کے لیے ایک جگہ
//           </p>

//           <h1 className="text-5xl md:text-7xl font-urdu font-bold leading-tight mb-8 animate-fade-in-up">
//             اپنی کہانی،
//             <br />
//             اپنی زبان میں
//           </h1>

//           <p className="max-w-2xl mx-auto text-xl md:text-2xl font-urdu text-zinc-600 leading-relaxed mb-10 animate-fade-in-up-delay">
//             ہم قلم پر اردو میں لکھیں، اپنے خیالات شائع کریں
//             اور دنیا بھر کے قارئین تک پہنچیں۔
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up-delay-2">
//             <Link
//               href="/signup"
//               className="w-full sm:w-auto bg-black text-white px-8 py-4 font-urdu text-lg hover:bg-zinc-800 transition flex items-center justify-center gap-2 group"
//             >
//               <span>لکھنا شروع کریں</span>
//               <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
//             </Link>

//             <Link
//               href="/feed"
//               className="w-full sm:w-auto border border-black text-black px-8 py-4 font-urdu text-lg hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
//             >
//               <BookOpen className="w-5 h-5" />
//               <span>تحریریں پڑھیں</span>
//             </Link>
//           </div>

//         </div>
//       </section>


//       {/* 2. Introduction — DARK (Black Background) */}
//       <section className="bg-black text-white border-b border-zinc-800">
//         <div className="max-w-5xl mx-auto px-6 py-28">

//           <div className="grid md:grid-cols-2 gap-16 items-center">

//             <div className="animate-fade-in-left">
//               <p className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-4 font-medium">
//                 ہمارا مقصد
//               </p>

//               <h2 className="text-4xl md:text-5xl font-urdu font-bold leading-tight mb-6 text-white">
//                 الفاظ کو ایک جگہ ملائیں
//               </h2>

//               <p className="font-urdu text-xl text-zinc-300 leading-relaxed">
//                 ہم قلم ایک ایسی جگہ ہے جہاں اردو لکھنے والے اپنے خیالات،
//                 تجربات، کہانیاں اور علم دوسروں کے ساتھ شیئر کر سکتے ہیں۔
//               </p>
//             </div>

//             <div className="border border-zinc-800 bg-zinc-950 p-10 text-center animate-fade-in-right">
//               <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-full mb-4 text-white">
//                 <Feather className="w-8 h-8 stroke-1" />
//               </div>

//               <div className="text-4xl font-urdu font-bold mb-4 text-white">
//                 قلم
//               </div>

//               <p className="font-urdu text-lg text-zinc-400 leading-relaxed">
//                 ایک خیال سے ایک تحریر تک،
//                 اور ایک تحریر سے ایک قاری تک۔
//               </p>
//             </div>

//           </div>

//         </div>
//       </section>


//       {/* 3. How It Works — LIGHT (White Background) */}
//       <section className="bg-white text-black border-b border-black/10">
//         <div className="max-w-6xl mx-auto px-6 py-28">

//           <div className="text-center mb-16">
//             <p className="font-sans text-xs uppercase tracking-widest text-zinc-500 mb-4 font-medium">
//               کیسے کام کرتا ہے؟
//             </p>

//             <h2 className="text-4xl md:text-5xl font-urdu font-bold text-black">
//               لکھیں، شائع کریں، پڑھیں
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">

//             <div className="border border-black/10 bg-zinc-50 p-8 text-center animate-fade-in-up hover:border-black/30 transition">
//               <span className="font-sans text-xs tracking-widest text-zinc-500 border border-black/10 px-3 py-1 rounded-full inline-block mb-6">
//                 01
//               </span>

//               <div className="flex justify-center mb-4">
//                 <PenTool className="w-8 h-8 text-black stroke-1" />
//               </div>

//               <h3 className="font-urdu text-2xl font-bold mb-4">
//                 لکھیں
//               </h3>

//               <p className="font-urdu text-lg text-zinc-600 leading-relaxed">
//                 اپنے خیالات کو خوبصورت اردو تحریر میں تبدیل کریں۔
//               </p>
//             </div>

//             <div className="border border-black/10 bg-zinc-50 p-8 text-center animate-fade-in-up-delay hover:border-black/30 transition">
//               <span className="font-sans text-xs tracking-widest text-zinc-500 border border-black/10 px-3 py-1 rounded-full inline-block mb-6">
//                 02
//               </span>

//               <div className="flex justify-center mb-4">
//                 <Globe className="w-8 h-8 text-black stroke-1" />
//               </div>

//               <h3 className="font-urdu text-2xl font-bold mb-4">
//                 شائع کریں
//               </h3>

//               <p className="font-urdu text-lg text-zinc-600 leading-relaxed">
//                 اپنی تحریر کو دنیا کے سامنے شائع کریں اور محفوظ رکھیں۔
//               </p>
//             </div>

//             <div className="border border-black/10 bg-zinc-50 p-8 text-center animate-fade-in-up-delay-2 hover:border-black/30 transition">
//               <span className="font-sans text-xs tracking-widest text-zinc-500 border border-black/10 px-3 py-1 rounded-full inline-block mb-6">
//                 03
//               </span>

//               <div className="flex justify-center mb-4">
//                 <UserCheck className="w-8 h-8 text-black stroke-1" />
//               </div>

//               <h3 className="font-urdu text-2xl font-bold mb-4">
//                 قارئین تک پہنچیں
//               </h3>

//               <p className="font-urdu text-lg text-zinc-600 leading-relaxed">
//                 اپنی تحریروں کو دوسرے اردو قارئین کے ساتھ شیئر کریں۔
//               </p>
//             </div>

//           </div>

//         </div>
//       </section>


//       {/* 4. Why Us — DARK (Black Background) */}
//       <section className="bg-black text-white border-b border-zinc-800">
//         <div className="max-w-5xl mx-auto px-6 py-28">

//           <div className="text-center mb-16">
//             <p className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-4 font-medium">
//               کیوں ہم قلم؟
//             </p>

//             <h2 className="text-4xl md:text-5xl font-urdu font-bold text-white">
//               آپ کے الفاظ، آپ کی جگہ
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">

//             <div className="animate-fade-in-up border-r border-zinc-800 pr-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <Sparkles className="w-5 h-5 text-zinc-400" />
//                 <h3 className="font-urdu text-2xl font-bold text-white">
//                   اردو کے لیے بنایا گیا
//                 </h3>
//               </div>
//               <p className="font-urdu text-lg text-zinc-400 leading-relaxed">
//                 مکمل طور پر اردو تحریروں اور اردو قارئین کو سامنے رکھتے ہوئے
//                 ڈیزائن کیا گیا تجربہ۔
//               </p>
//             </div>

//             <div className="animate-fade-in-up-delay border-r border-zinc-800 pr-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <PenTool className="w-5 h-5 text-zinc-400" />
//                 <h3 className="font-urdu text-2xl font-bold text-white">
//                   آسان تحریر
//                 </h3>
//               </div>
//               <p className="font-urdu text-lg text-zinc-400 leading-relaxed">
//                 بغیر کسی پیچیدگی کے اپنی تحریر لکھیں، محفوظ کریں اور شائع کریں۔
//               </p>
//             </div>

//             <div className="animate-fade-in-up-delay border-r border-zinc-800 pr-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <UserCheck className="w-5 h-5 text-zinc-400" />
//                 <h3 className="font-urdu text-2xl font-bold text-white">
//                   اپنی پروفائل
//                 </h3>
//               </div>
//               <p className="font-urdu text-lg text-zinc-400 leading-relaxed">
//                 اپنی تمام تحریروں کو ایک جگہ رکھیں اور اپنے قارئین کے ساتھ
//                 اپنا ادبی سفر جاری رکھیں۔
//               </p>
//             </div>

//             <div className="animate-fade-in-up-delay-2 border-r border-zinc-800 pr-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <Globe className="w-5 h-5 text-zinc-400" />
//                 <h3 className="font-urdu text-2xl font-bold text-white">
//                   آزاد اظہار
//                 </h3>
//               </div>
//               <p className="font-urdu text-lg text-zinc-400 leading-relaxed">
//                 اپنے خیالات، تجربات اور کہانیوں کو اپنی آواز میں دنیا تک پہنچائیں۔
//               </p>
//             </div>

//           </div>

//         </div>
//       </section>


//       {/* 5. Call to Action (CTA) — LIGHT (White Background) */}
//       <section className="bg-white text-black">
//         <div className="max-w-4xl mx-auto px-6 py-28 text-center">

//           <h2 className="text-4xl md:text-6xl font-urdu font-bold mb-8 animate-fade-in-up">
//             آپ کے پاس کہنے کو کچھ ہے؟
//           </h2>

//           <p className="font-urdu text-xl text-zinc-600 leading-relaxed mb-10 animate-fade-in-up-delay">
//             اپنے الفاظ کو آج ہی ایک نئی جگہ دیں۔
//           </p>

//           <Link
//             href="/signup"
//             className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 font-urdu text-lg hover:bg-zinc-800 transition animate-fade-in-up-delay-2"
//           >
//             <span>اپنی پہلی تحریر لکھیں</span>
//             <ArrowLeft className="w-5 h-5" />
//           </Link>

//         </div>
//       </section>

//     </main>
//   );
// }

// src/app/(marketing)/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Feather } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/feed");

  return (
    <main className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-white text-black relative overflow-hidden">
      {/* decorative floating feather */}
      <Feather className="absolute top-24 left-16 w-16 h-16 text-amber-500/20 stroke-1 animate-float hidden md:block" />
      <Feather className="absolute bottom-20 right-20 w-10 h-10 text-amber-500/20 stroke-1 animate-float hidden md:block" style={{ animationDelay: "1.2s" }} />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-urdu text-lg text-zinc-600 mb-6 animate-fade-in-up">
          اردو لکھنے والوں کے لیے ایک جگہ
        </p>

        <h1 className="text-5xl md:text-7xl font-urdu font-bold leading-tight mb-8 animate-fade-in-up-delay">
          اپنی کہانی،
          <br />
          اپنی زبان میں
        </h1>

        <div className="w-24 h-1 bg-amber-500 mx-auto mb-8 animate-fade-in-up-delay" />

        <p className="max-w-xl mx-auto text-xl font-urdu text-zinc-600 leading-relaxed mb-10 animate-fade-in-up-delay-2">
          ہم قلم پر اردو میں لکھیں، اپنے خیالات شائع کریں اور دنیا بھر کے قارئین تک پہنچیں۔
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up-delay-2">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-black text-white px-8 py-4 font-urdu text-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 group"
          >
            <span>لکھنا شروع کریں</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            href="/feed"
            className="w-full sm:w-auto border border-black text-black px-8 py-4 font-urdu text-lg hover:border-amber-600 hover:text-amber-600 transition flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>تحریریں پڑھیں</span>
          </Link>
        </div>
      </div>
    </main>
  );
}