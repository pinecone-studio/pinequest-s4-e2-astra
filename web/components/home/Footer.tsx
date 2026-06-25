
import { Home, MessageCircle, Map, User } from "lucide-react";

const footerItems = [
  { label: "Нүүр", icon: Home, active: true },
  { label: "AI Chat", icon: MessageCircle, active: false },
  { label: "Маршрут", icon: Map, active: false },
  { label: "Профайл", icon: User, active: false },
] as const;

export default function HomeFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/95 px-3 pb-3 pt-2 backdrop-blur">
      <nav className="grid grid-cols-4 gap-1">
        {footerItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex h-14 flex-col items-center justify-center rounded-2xl text-xs font-bold transition ${
                item.active
                  ? "bg-[#e6fffa] text-[#0b7f71]"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              type="button"
            >
              <Icon size={17} strokeWidth={2} />
              <span className="mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}