import { Bell, ChevronDown, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/app-shell/sidebar";
import { PowerMatchLogo } from "@/components/powermatch-logo";

export default function SettingsLayout({ children }: LayoutProps<"/settings">) {
  return (
    <div className="flex h-screen bg-white text-ink">
      <aside className="flex w-[248px] shrink-0 flex-col border-r border-line">
        <div className="relative flex h-16 shrink-0 items-center border-b border-line px-4">
          <PowerMatchLogo />
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="absolute -right-4 grid size-8 place-items-center rounded-full border border-line bg-white text-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-end gap-6 border-b border-line px-6">
          <button type="button" aria-label="Notifications" className="text-ink">
            <Bell className="size-5" strokeWidth={1.6} />
          </button>
          <button type="button" className="flex items-center gap-2.5 text-[15px]">
            <span className="grid size-8 place-items-center rounded-full bg-[#e4e7ec] text-xs font-semibold">
              LS
            </span>
            Las Sabir
            <ChevronDown className="size-4" />
          </button>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto bg-canvas">{children}</main>
      </div>
    </div>
  );
}
