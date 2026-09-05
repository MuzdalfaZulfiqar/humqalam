// src/app/(marketing)/layout.tsx
import MarketingNav from "@/components/layout/MarketingNav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MarketingNav />
      {children}
    </div>
  );
}