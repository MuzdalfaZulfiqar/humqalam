import { Noto_Nastaliq_Urdu, Inter } from "next/font/google";
import "./globals.css";

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-nastaliq",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "ہم قلم — Humqalam",
  description: "اردو میں لکھیں، اردو میں پڑھیں",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur" dir="rtl" className={`${nastaliq.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink font-urdu">{children}</body>
    </html>
  );
}