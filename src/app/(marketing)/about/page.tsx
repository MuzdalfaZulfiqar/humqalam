// src/app/(marketing)/about/page.tsx
import Link from "next/link";
import { PenTool, Globe, UserCheck, Sparkles, Feather, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="overflow-hidden font-sans">
      <section className="bg-black text-white border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <p className="font-sans text-xs uppercase tracking-widest text-amber-500 mb-4 font-medium">
                ہمارا مقصد
              </p>
              <h2 className="text-4xl md:text-5xl font-urdu font-bold leading-tight mb-6 text-white">
                الفاظ کو ایک جگہ ملائیں
              </h2>
              <p className="font-urdu text-xl text-zinc-300 leading-relaxed">
                ہم قلم ایک ایسی جگہ ہے جہاں اردو لکھنے والے اپنے خیالات، تجربات، کہانیاں
                اور علم دوسروں کے ساتھ شیئر کر سکتے ہیں۔
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-10 text-center animate-fade-in-up-delay">
              <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-full mb-4 text-amber-500">
                <Feather className="w-8 h-8 stroke-1" />
              </div>
              <div className="text-4xl font-urdu font-bold mb-4 text-white">قلم</div>
              <p className="font-urdu text-lg text-zinc-400 leading-relaxed">
                ایک خیال سے ایک تحریر تک، اور ایک تحریر سے ایک قاری تک۔
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-zinc-500 mb-4 font-medium">
              کیسے کام کرتا ہے؟
            </p>
            <h2 className="text-4xl md:text-5xl font-urdu font-bold text-black">
              لکھیں، شائع کریں، پڑھیں
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: PenTool, num: "01", title: "لکھیں", desc: "اپنے خیالات کو خوبصورت اردو تحریر میں تبدیل کریں۔" },
              { icon: Globe, num: "02", title: "شائع کریں", desc: "اپنی تحریر کو دنیا کے سامنے شائع کریں اور محفوظ رکھیں۔" },
              { icon: UserCheck, num: "03", title: "قارئین تک پہنچیں", desc: "اپنی تحریروں کو دوسرے اردو قارئین کے ساتھ شیئر کریں۔" },
            ].map((s, i) => (
              <div key={i} className="border border-black/10 bg-zinc-50 p-8 text-center hover:border-amber-500/50 transition animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="font-sans text-xs tracking-widest text-zinc-500 border border-black/10 px-3 py-1 rounded-full inline-block mb-6">{s.num}</span>
                <div className="flex justify-center mb-4"><s.icon className="w-8 h-8 text-amber-600 stroke-1" /></div>
                <h3 className="font-urdu text-2xl font-bold mb-4">{s.title}</h3>
                <p className="font-urdu text-lg text-zinc-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-28">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-amber-500 mb-4 font-medium">کیوں ہم قلم؟</p>
            <h2 className="text-4xl md:text-5xl font-urdu font-bold text-white">آپ کے الفاظ، آپ کی جگہ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { icon: Sparkles, title: "اردو کے لیے بنایا گیا", desc: "مکمل طور پر اردو تحریروں اور اردو قارئین کو سامنے رکھتے ہوئے ڈیزائن کیا گیا تجربہ۔" },
              { icon: PenTool, title: "آسان تحریر", desc: "بغیر کسی پیچیدگی کے اپنی تحریر لکھیں، محفوظ کریں اور شائع کریں۔" },
              { icon: UserCheck, title: "اپنی پروفائل", desc: "اپنی تمام تحریروں کو ایک جگہ رکھیں اور اپنے قارئین کے ساتھ اپنا ادبی سفر جاری رکھیں۔" },
              { icon: Globe, title: "آزاد اظہار", desc: "اپنے خیالات، تجربات اور کہانیوں کو اپنی آواز میں دنیا تک پہنچائیں۔" },
            ].map((f, i) => (
              <div key={i} className="border-r border-zinc-800 pr-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-3">
                  <f.icon className="w-5 h-5 text-amber-500" />
                  <h3 className="font-urdu text-2xl font-bold text-white">{f.title}</h3>
                </div>
                <p className="font-urdu text-lg text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 py-28 text-center">
          <h2 className="text-4xl md:text-6xl font-urdu font-bold mb-8">آپ کے پاس کہنے کو کچھ ہے؟</h2>
          <p className="font-urdu text-xl text-zinc-600 leading-relaxed mb-10">اپنے الفاظ کو آج ہی ایک نئی جگہ دیں۔</p>
          <Link href="/signup" className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 font-urdu text-lg hover:bg-amber-600 transition">
            <span>اپنی پہلی تحریر لکھیں</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}