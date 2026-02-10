import { Shield, Check } from "lucide-react";

export function QuestLogo({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const sizes = {
    sm: { icon: 16, text: "text-lg" },
    default: { icon: 22, text: "text-2xl" },
    lg: { icon: 32, text: "text-4xl" },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Shield size={s.icon} className="text-primary" strokeWidth={2.5} />
        <Check size={s.icon * 0.5} className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
      </div>
      <span className={`font-display font-extrabold tracking-tight ${s.text}`}>
        Quest<span className="text-primary">Audit</span>
      </span>
    </div>
  );
}
